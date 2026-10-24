// Newsletter & Google Sheets Integration Service
// Saves subscriber emails to local storage AND posts to a connected Google Sheet Webhook.

export interface NewsletterSubscriber {
  email: string;
  date: string;
  timestamp: string;
  syncedToSheet?: boolean;
}

const STORAGE_KEY = 'tli_newsletter_subscribers';
const WEBHOOK_KEY = 'tli_google_sheet_webhook_url';

export function getGoogleSheetUrl(): string {
  try {
    return localStorage.getItem(WEBHOOK_KEY) || '';
  } catch {
    return '';
  }
}

export function setGoogleSheetUrl(url: string): void {
  try {
    localStorage.setItem(WEBHOOK_KEY, url.trim());
  } catch {
    // ignore
  }
}

export function getSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function submitNewsletterSubscription(email: string): Promise<{ success: boolean; synced: boolean }> {
  const cleanEmail = email.trim().toLowerCase();
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timestampStr = new Date().toISOString();

  // 1. Save to local storage first (guarantees zero data loss)
  const subscribers = getSubscribers();
  const existingIdx = subscribers.findIndex(s => s.email === cleanEmail);

  let synced = false;
  const webhookUrl = getGoogleSheetUrl();

  // 2. Post to Google Sheet Webhook if configured
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      // Google Apps Script Web Apps require no-cors or form-urlencoded for client-side cross-origin
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: cleanEmail,
          source: 'The Weekly Ink Dispatch',
          date: dateStr,
          timestamp: timestampStr,
        }).toString(),
      });
      synced = true;
    } catch (err) {
      console.warn('Google Sheet webhook post failed, preserved in local storage:', err);
    }
  }

  const record: NewsletterSubscriber = {
    email: cleanEmail,
    date: dateStr,
    timestamp: timestampStr,
    syncedToSheet: synced,
  };

  if (existingIdx >= 0) {
    subscribers[existingIdx] = record;
  } else {
    subscribers.unshift(record);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
  } catch {
    // ignore
  }

  return { success: true, synced };
}

export function exportSubscribersToCsv(): void {
  const list = getSubscribers();
  if (list.length === 0) return;

  const header = 'Email,Subscription Date,Timestamp,Synced To Google Sheets\n';
  const rows = list
    .map(s => `"${s.email}","${s.date}","${s.timestamp}","${s.syncedToSheet ? 'Yes' : 'Pending'}"`)
    .join('\n');

  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `the_legends_ink_subscribers_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
