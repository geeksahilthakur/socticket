import { DRAFT_STORAGE_KEY, THEME_STORAGE_KEY } from './constants.js';
import { DEFAULT_THEME, normalizeFormData } from './defaults.js';

export function loadDraft() {
  const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return normalizeFormData(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveDraft(data) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
}

export function loadTheme() {
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  return raw === 'dark' || raw === 'light' ? raw : DEFAULT_THEME;
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
