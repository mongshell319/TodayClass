// Date 문자열을 Date 객체로 복원하는 JSON reviver
export function dateReviver(_key: string, value: unknown): unknown {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
    return new Date(value);
  }
  return value;
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('localStorage 저장 실패:', e);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item, dateReviver) as T;
  } catch (e) {
    console.error('localStorage 불러오기 실패:', e);
  }
  return defaultValue;
}
