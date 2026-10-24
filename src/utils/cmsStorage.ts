import { Article, ARTICLES } from '../data/magazineContent';

const CMS_ARTICLES_KEY = 'tli_cms_published_articles';
const CMS_ACTIVE_ISSUE_KEY = 'tli_cms_active_issue_meta';

export interface PublishedIssueMeta {
  title: string;
  issueLabel: string;
  pageCount: number;
  coverImage?: string;
  pdfUrl?: string;
  updatedAt: string;
}

export function getInitialArticles(): Article[] {
  if (typeof window === 'undefined') return ARTICLES;
  try {
    const raw = localStorage.getItem(CMS_ARTICLES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load published articles from storage:', e);
  }
  return ARTICLES;
}

export function saveArticlesToCMS(articles: Article[]): void {
  try {
    localStorage.setItem(CMS_ARTICLES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.warn('Failed to save articles to storage:', e);
  }
}

export function getActiveIssueMeta(): PublishedIssueMeta | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CMS_ACTIVE_ISSUE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load issue meta from storage:', e);
  }
  return null;
}

export function saveActiveIssueMeta(meta: PublishedIssueMeta): void {
  try {
    localStorage.setItem(CMS_ACTIVE_ISSUE_KEY, JSON.stringify(meta));
  } catch (e) {
    console.warn('Failed to save issue meta to storage:', e);
  }
}

export function resetCMSToDefaults(): void {
  try {
    localStorage.removeItem(CMS_ARTICLES_KEY);
    localStorage.removeItem(CMS_ACTIVE_ISSUE_KEY);
  } catch (e) {
    console.warn('Failed to reset CMS storage:', e);
  }
}
