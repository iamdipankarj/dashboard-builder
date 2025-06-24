const STORAGE_KEY = "dashboard-widgets";

export function saveToStorage(widgets: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
}

export function loadFromStorage(): any[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
