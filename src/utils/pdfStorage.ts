// Utility for persisting and loading custom uploaded magazine PDFs in IndexedDB

const DB_NAME = 'magzine_portal_db';
const STORE_NAME = 'magazine_pdf_store';
const KEY = 'active_magazine_pdf';

export interface StoredPdfMetadata {
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  title: string;
  issue: string;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export async function savePdfToStorage(file: File, meta: { title: string; issue: string }): Promise<string> {
  const db = await openDB();
  const buffer = await file.arrayBuffer();

  const record = {
    buffer,
    type: file.type || 'application/pdf',
    fileName: file.name,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
    title: meta.title || file.name.replace(/\.pdf$/i, ''),
    issue: meta.issue || 'Custom Uploaded Issue',
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record, KEY);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  const blob = new Blob([buffer], { type: record.type });
  return URL.createObjectURL(blob);
}

export async function loadPdfFromStorage(): Promise<{
  blobUrl: string;
  metadata: StoredPdfMetadata;
} | null> {
  try {
    const db = await openDB();
    const record = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (!record || !record.buffer) return null;

    const blob = new Blob([record.buffer], { type: record.type || 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    return {
      blobUrl,
      metadata: {
        fileName: record.fileName,
        fileSize: record.fileSize,
        uploadedAt: record.uploadedAt,
        title: record.title,
        issue: record.issue,
      },
    };
  } catch (err) {
    console.warn('Could not load stored PDF:', err);
    return null;
  }
}

export async function clearStoredPdf(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not clear stored PDF:', err);
  }
}
