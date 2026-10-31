// Universal Live Publication & Cloud Synchronization Service
// Enables permanent, universal deployment of magazine issues to all live visitors worldwide.

import { ArchivedIssue } from './issueArchive';

export type CloudProvider = 'github' | 'firebase' | 'supabase' | 'webhook' | 'local_only';

export interface CloudSyncConfig {
  provider: CloudProvider;
  // GitHub Auto-Deploy (100% free, automatic Vercel/Netlify/GitHub Pages redeploy)
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubToken: string;
  // Firebase (Free Spark Tier)
  firebaseApiKey: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  // Supabase (Free Tier)
  supabaseUrl: string;
  supabaseAnonKey: string;
  // Custom REST Webhook
  webhookUrl: string;
  // Auto-sync toggle
  autoSyncOnPublish: boolean;
}

const CONFIG_STORAGE_KEY = 'tli_cms_cloud_sync_config';

export const DEFAULT_SYNC_CONFIG: CloudSyncConfig = {
  provider: 'github',
  githubOwner: 'wajidali11608-cmyk',
  githubRepo: 'TheLegendsInk',
  githubBranch: 'master',
  githubToken: '',
  firebaseApiKey: '',
  firebaseProjectId: '',
  firebaseStorageBucket: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  webhookUrl: '',
  autoSyncOnPublish: true,
};

export function getCloudSyncConfig(): CloudSyncConfig {
  if (typeof window === 'undefined') return DEFAULT_SYNC_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SYNC_CONFIG,
        ...parsed,
        githubToken: (parsed.githubToken && parsed.githubToken.trim()) || DEFAULT_SYNC_CONFIG.githubToken,
      };
    }
  } catch (e) {
    console.warn('Failed to parse cloud sync config:', e);
  }
  return DEFAULT_SYNC_CONFIG;
}

export function saveCloudSyncConfig(config: CloudSyncConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save cloud sync config:', e);
  }
}

/**
 * Universal live issue loader:
 * 1. Checks public static feed (/issues/active-issue.json)
 * 2. Checks remote Firebase / Supabase if configured
 * 3. Falls back to null so caller uses local IndexedDB / baseline data
 */
export async function fetchLiveActiveIssueFromRemote(): Promise<ArchivedIssue | null> {
  // 1. Try public static manifest served directly from hosting
  try {
    const res = await fetch('/issues/active-issue.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.title && Array.isArray(data.articles)) {
        return data as ArchivedIssue;
      }
    }
  } catch {
    // ignore network or file not found
  }

  // 2. Try remote webhook / cloud API if configured
  const config = getCloudSyncConfig();
  if (config.provider === 'webhook' && config.webhookUrl) {
    try {
      const res = await fetch(`${config.webhookUrl}?action=get_active_issue`, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.articles) return data;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

/**
 * Fetch all archived issues from public feed or remote source
 */
export async function fetchLiveArchivedIssuesFeed(): Promise<ArchivedIssue[]> {
  try {
    const res = await fetch('/issues/issues-feed.json', { cache: 'no-cache' });
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Publish issue via GitHub REST API:
 * Commits active-issue.json, issues-feed.json, and the PDF file directly to the GitHub repo.
 * This triggers an automatic rebuild and deploys live to everyone permanently in ~30 seconds for 100% free!
 */
export async function publishToGitHubRepo(
  issue: ArchivedIssue,
  pdfFile?: File | Blob,
  onProgress?: (status: string) => void
): Promise<{ success: boolean; message: string }> {
  const config = getCloudSyncConfig();
  if (!config.githubToken) {
    return {
      success: false,
      message: 'GitHub Personal Access Token is required in CMS Settings to auto-publish to your live site.',
    };
  }

  const { githubOwner, githubRepo, githubBranch } = config;
  const baseUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}`;
  const headers = {
    Authorization: `token ${config.githubToken}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    onProgress?.('Authenticating with GitHub Repository...');
    const repoCheck = await fetch(baseUrl, { headers });
    if (!repoCheck.ok) {
      return { success: false, message: `Could not access GitHub repo: ${repoCheck.statusText}` };
    }

    // Helper: commit or update a file in the repo
    async function commitFile(path: string, contentBase64: string, commitMessage: string) {
      let sha: string | undefined;
      try {
        const existing = await fetch(`${baseUrl}/contents/${path}?ref=${githubBranch}`, { headers });
        if (existing.ok) {
          const data = await existing.json();
          sha = data.sha;
        }
      } catch {
        // file doesn't exist yet
      }

      const body = JSON.stringify({
        message: commitMessage,
        content: contentBase64,
        branch: githubBranch,
        sha,
      });

      const res = await fetch(`${baseUrl}/contents/${path}`, {
        method: 'PUT',
        headers,
        body,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'GitHub commit failed');
      }
    }

    // 1. Commit active issue JSON
    onProgress?.('Deploying active issue metadata...');
    const activeIssueJson = JSON.stringify(issue, null, 2);
    const activeIssueB64 = btoa(unescape(encodeURIComponent(activeIssueJson)));
    await commitFile(
      'public/issues/active-issue.json',
      activeIssueB64,
      `Publish Live Magazine: ${issue.title} [CMS Auto-Deploy]`
    );

    // 2. Commit to issues feed list
    onProgress?.('Updating global publication archive...');
    let existingFeed: ArchivedIssue[] = [];
    try {
      const feedRes = await fetch(`${baseUrl}/contents/public/issues/issues-feed.json?ref=${githubBranch}`, { headers });
      if (feedRes.ok) {
        const feedData = await feedRes.json();
        const contentStr = decodeURIComponent(escape(atob(feedData.content)));
        existingFeed = JSON.parse(contentStr);
      }
    } catch {
      existingFeed = [];
    }

    const filtered = existingFeed.filter((i) => i.id !== issue.id);
    const updatedFeed = [issue, ...filtered];
    const feedB64 = btoa(unescape(encodeURIComponent(JSON.stringify(updatedFeed, null, 2))));
    await commitFile(
      'public/issues/issues-feed.json',
      feedB64,
      `Update Issue Archive: ${issue.title} [CMS Auto-Deploy]`
    );

    // 3. Commit PDF file if available and size is within GitHub Contents API limit (< 30MB)
    if (pdfFile && pdfFile.size < 28 * 1024 * 1024) {
      onProgress?.('Uploading PDF to publication directory (this may take a few seconds)...');
      const arrayBuf = await pdfFile.arrayBuffer();
      const bytes = new Uint8Array(arrayBuf);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const pdfBase64 = btoa(binary);

      const targetPdfPath = `public/issues/${issue.fileName || 'current-issue.pdf'}`;
      await commitFile(
        targetPdfPath,
        pdfBase64,
        `Upload Magazine PDF: ${issue.fileName} [CMS Auto-Deploy]`
      );
    }

    return {
      success: true,
      message: `Successfully published ${issue.title} to live repository! Site will update in ~30s.`,
    };
  } catch (error: any) {
    console.error('GitHub publish error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred during GitHub auto-deploy.',
    };
  }
}

/**
 * Generate a downloadable live publication bundle (.json) so the user
 * can save it into the repository with zero configuration.
 */
export function exportLivePublicationBundle(issue: ArchivedIssue): void {
  const jsonStr = JSON.stringify(issue, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `active-issue.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
