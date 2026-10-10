/** Device-only UI preferences for public resources; never store student work or auth data. */
export function readPreference(key: string): unknown {
  try { return typeof localStorage === 'undefined' ? null : JSON.parse(localStorage.getItem('vht5:' + key) ?? 'null'); }
  catch { return null; }
}

export function writePreference(key: string, value: unknown): void {
  try { if (typeof localStorage !== 'undefined') localStorage.setItem('vht5:' + key, JSON.stringify(value)); }
  catch { /* Reading and filtering still work when device storage is unavailable. */ }
}
