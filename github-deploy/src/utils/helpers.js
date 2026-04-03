export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function resolveOtherValue(value, other) {
  return value === 'Other' ? other.trim() : String(value || '').trim();
}

export function sanitizeLine(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function splitMultiline(value) {
  return String(value || '')
    .split('\n')
    .map((entry) => sanitizeLine(entry))
    .filter(Boolean);
}

export function formatDateTime(value) {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(parsed);
}

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `item-${Math.random().toString(36).slice(2, 10)}`;
}

export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getFontPreviewStyle(fontFamily) {
  switch (fontFamily) {
    case 'calibri':
      return { fontFamily: 'Calibri, Candara, Segoe UI, Arial, sans-serif' };
    case 'arial':
      return { fontFamily: 'Arial, Helvetica, sans-serif' };
    case 'times':
      return { fontFamily: '"Times New Roman", Times, serif' };
    case 'corporate':
    default:
      return { fontFamily: 'Aptos, "Segoe UI", Calibri, Arial, sans-serif' };
  }
}
