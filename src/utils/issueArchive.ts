// Multi-Issue Archive Storage
// Stores every uploaded magazine PDF & its extracted articles in IndexedDB
// so that switching between months (e.g. October, November) preserves the full archive.

import { Article, ARTICLES } from '../data/magazineContent';

const DB_NAME = 'magzine_portal_db';
const DB_VERSION = 2;
const ISSUES_STORE = 'issue_archive';
const META_STORE = 'issue_archive_meta';
const ACTIVE_KEY = 'active_issue_id';

export interface ArchivedIssue {
  /** Unique key — e.g. "oct-2026", "issue-1698012345678" */
  id: string;
  /** Display month/year — e.g. "November 2026", "October 2026" */
  monthYear: string;
  /** Full title line — "The Legends Ink — November 2026" */
  title: string;
  /** Issue label for masthead — "VOL. 01 • ISSUE 04 • NOVEMBER 2026" */
  issueLabel: string;
  /** Original filename */
  fileName: string;
  /** Cover image data-URL or static path */
  coverImage: string;
  /** Page count */
  pageCount: number;
  /** Upload timestamp ISO */
  uploadedAt: string;
  /** Auto-extracted articles */
  articles: Article[];
}

/** Internal record stored in IDB (includes the heavy PDF ArrayBuffer) */
interface ArchivedIssueRecord extends ArchivedIssue {
  pdfBuffer: ArrayBuffer;
  pdfType: string;
}

export const DEFAULT_OCTOBER_ID = 'oct-2026';

export const DEFAULT_OCTOBER_ISSUE: ArchivedIssue = {
  id: DEFAULT_OCTOBER_ID,
  monthYear: 'October 2026',
  title: 'The Legends Ink — October 2026',
  issueLabel: 'VOL. 01 • ISSUE 03 • OCTOBER 2026',
  fileName: 'tli-october-2026.pdf',
  coverImage: '/october-2026-cover.png',
  pageCount: 68,
  uploadedAt: '2026-10-16T00:00:00.000Z',
  articles: ARTICLES,
};

// ─── IndexedDB helpers ────────────────────────────────────

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('magazine_pdf_store')) {
        db.createObjectStore('magazine_pdf_store');
      }
      if (!db.objectStoreNames.contains(ISSUES_STORE)) {
        db.createObjectStore(ISSUES_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ─── Save a new issue ─────────────────────────────────────

export async function saveIssueToArchive(
  file: File,
  meta: {
    title: string;
    issueLabel: string;
    monthYear: string;
    coverImage: string;
    pageCount: number;
    articles: Article[];
  }
): Promise<{ id: string; blobUrl: string }> {
  const db = await openDB();
  const buffer = await file.arrayBuffer();

  const id = `issue-${Date.now()}`;

  const record: ArchivedIssueRecord = {
    id,
    monthYear: meta.monthYear,
    title: meta.title,
    issueLabel: meta.issueLabel,
    fileName: file.name,
    coverImage: meta.coverImage,
    pageCount: meta.pageCount,
    uploadedAt: new Date().toISOString(),
    articles: meta.articles,
    pdfBuffer: buffer,
    pdfType: file.type || 'application/pdf',
  };

  // Save the issue record
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(ISSUES_STORE, 'readwrite');
    const store = tx.objectStore(ISSUES_STORE);
    const req = store.put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  // Mark this newly uploaded issue as active immediately
  await setActiveIssueId(id);

  const blob = new Blob([buffer], { type: record.pdfType });
  return { id, blobUrl: URL.createObjectURL(blob) };
}

// ─── Set/Get active issue id ──────────────────────────────

export async function setActiveIssueId(id: string): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(META_STORE, 'readwrite');
    const store = tx.objectStore(META_STORE);
    const req = store.put(id, ACTIVE_KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getActiveIssueId(): Promise<string | null> {
  try {
    const db = await openDB();
    return await new Promise<string | null>((resolve, reject) => {
      const tx = db.transaction(META_STORE, 'readonly');
      const store = tx.objectStore(META_STORE);
      const req = store.get(ACTIVE_KEY);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

// ─── Load all issue metadata (includes foundational October 2026) ──────────────

export async function listArchivedIssues(): Promise<ArchivedIssue[]> {
  try {
    const db = await openDB();
    const records = await new Promise<ArchivedIssueRecord[]>((resolve, reject) => {
      const tx = db.transaction(ISSUES_STORE, 'readonly');
      const store = tx.objectStore(ISSUES_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });

    const parsed: ArchivedIssue[] = records.map(({ pdfBuffer: _buf, pdfType: _type, ...rest }) => rest);

    // Ensure baseline October 2026 is always present in archive if not already recorded
    const hasOctober = parsed.some(
      (i) => i.id === DEFAULT_OCTOBER_ID || i.monthYear.toLowerCase().includes('october')
    );
    if (!hasOctober) {
      parsed.push(DEFAULT_OCTOBER_ISSUE);
    }

    // Sort newest uploaded first
    return parsed.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  } catch {
    return [DEFAULT_OCTOBER_ISSUE];
  }
}

// ─── Load a specific issue with its PDF ───────────────────

export async function loadIssueFromArchive(
  id: string
): Promise<{ issue: ArchivedIssue; blobUrl: string } | null> {
  try {
    // If it's the baseline October issue, check if custom record exists first; otherwise return default
    if (id === DEFAULT_OCTOBER_ID) {
      try {
        const db = await openDB();
        const customRecord = await new Promise<ArchivedIssueRecord | undefined>((resolve, reject) => {
          const tx = db.transaction(ISSUES_STORE, 'readonly');
          const store = tx.objectStore(ISSUES_STORE);
          const req = store.get(DEFAULT_OCTOBER_ID);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });

        if (customRecord && customRecord.pdfBuffer) {
          const blob = new Blob([customRecord.pdfBuffer], { type: customRecord.pdfType || 'application/pdf' });
          const { pdfBuffer: _buf, pdfType: _type, ...meta } = customRecord;
          return { issue: meta, blobUrl: URL.createObjectURL(blob) };
        }
      } catch {
        // proceed to default
      }

      return {
        issue: DEFAULT_OCTOBER_ISSUE,
        blobUrl: '/tli-october-2026.pdf',
      };
    }

    const db = await openDB();
    const record = await new Promise<ArchivedIssueRecord | undefined>((resolve, reject) => {
      const tx = db.transaction(ISSUES_STORE, 'readonly');
      const store = tx.objectStore(ISSUES_STORE);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (!record || !record.pdfBuffer) {
      // Fallback to baseline October if record not found
      return {
        issue: DEFAULT_OCTOBER_ISSUE,
        blobUrl: '/tli-october-2026.pdf',
      };
    }

    const blob = new Blob([record.pdfBuffer], { type: record.pdfType || 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const { pdfBuffer: _buf, pdfType: _type, ...meta } = record;
    return { issue: meta, blobUrl };
  } catch {
    return {
      issue: DEFAULT_OCTOBER_ISSUE,
      blobUrl: '/tli-october-2026.pdf',
    };
  }
}

// ─── Load whichever issue is currently active ─────────────

export async function loadActiveIssue(): Promise<{
  issue: ArchivedIssue;
  blobUrl: string;
} | null> {
  const activeId = await getActiveIssueId();

  if (activeId) {
    const loaded = await loadIssueFromArchive(activeId);
    if (loaded) return loaded;
  }

  // If no active issue set yet, check if there are any uploaded issues
  try {
    const db = await openDB();
    const records = await new Promise<ArchivedIssueRecord[]>((resolve, reject) => {
      const tx = db.transaction(ISSUES_STORE, 'readonly');
      const store = tx.objectStore(ISSUES_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });

    if (records.length > 0) {
      const sorted = records.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      const newest = sorted[0];
      await setActiveIssueId(newest.id);
      const blob = new Blob([newest.pdfBuffer], { type: newest.pdfType || 'application/pdf' });
      const { pdfBuffer: _buf, pdfType: _type, ...meta } = newest;
      return { issue: meta, blobUrl: URL.createObjectURL(blob) };
    }
  } catch {
    // fallback below
  }

  // Baseline default: October 2026
  return {
    issue: DEFAULT_OCTOBER_ISSUE,
    blobUrl: '/tli-october-2026.pdf',
  };
}

// ─── Delete an issue from the archive ─────────────────────

export async function deleteIssueFromArchive(id: string): Promise<void> {
  if (id === DEFAULT_OCTOBER_ID) {
    // Baseline October cannot be permanently wiped, but can be reset
    return;
  }
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(ISSUES_STORE, 'readwrite');
    const store = tx.objectStore(ISSUES_STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  // If the deleted issue was active, revert to October
  const activeId = await getActiveIssueId();
  if (activeId === id) {
    await setActiveIssueId(DEFAULT_OCTOBER_ID);
  }
}

// ─── Clear the entire custom archive ──────────────────────

export async function clearIssueArchive(): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([ISSUES_STORE, META_STORE], 'readwrite');
    tx.objectStore(ISSUES_STORE).clear();
    tx.objectStore(META_STORE).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  await setActiveIssueId(DEFAULT_OCTOBER_ID);
}
