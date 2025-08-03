import type { PasswordEntry } from '../types/index';

const STORAGE_KEY = 'password_entries';

export function loadEntries(): PasswordEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      console.warn('Некорректный формат записей в localStorage');
      return [];
    }

    return parsed as PasswordEntry[];
  } catch (error) {
    console.error('Ошибка при загрузке записей:', error);
    return [];
  }
}
export function saveEntries(entries: PasswordEntry[]) {
  try {
    if (!Array.isArray(entries)) {
      throw new Error('Переданный параметр должен быть массивом PasswordEntry[]');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Ошибка при сохранении записей:', error);
  }
}
export function deleteEntry(id: string) {
  try {
    const entries = loadEntries();

    const index = entries.findIndex(entry => entry.id === id);
    if (index === -1) {
      console.warn(`Запись с id "${id}" не найдена`);
      return;
    }

    entries.splice(index, 1);
    saveEntries(entries);
  } catch (error) {
    console.error(`Ошибка при удалении записи с id "${id}":`, error);
  }
}
