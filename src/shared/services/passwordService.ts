import { useAuthStore } from '../store/useAuthStore';
import type { PasswordEntry } from '../types/index';
import { decryptData, encryptData } from './cryptoService';

const STORAGE_KEY = 'password_entries_encrypted';

export function loadEntries(): PasswordEntry[] {
  const authStore = useAuthStore();
  const key = authStore.encryptionKey;

  if (!key) {
    console.warn('Попытка загрузить записи без ключа аутентификации.');
    return [];
  }
  try {
    const encryptedData = localStorage.getItem(STORAGE_KEY);
    if (!encryptedData) return [];

    const decrypted = decryptData<PasswordEntry[]>(encryptedData, key);

    if (decrypted === null) {
      console.error('Не удалось дешифровать данные. Вероятно, неверный мастер-пароль.');
      authStore.logout();
      return [];
    }

    if (!Array.isArray(decrypted)) {
      console.warn('Дешифрованные данные не являются массивом.');
      return [];
    }
    
    return decrypted;

  } catch (error) {
    console.error('Ошибка при загрузке записей:', error);
    return [];
  }
}

export function saveEntries(entries: PasswordEntry[]) {
  const authStore = useAuthStore();
  const key = authStore.encryptionKey;
  
  if (!key) {
    console.error('Попытка сохранить записи без ключа аутентификации.');
    return;
  }
  
  try {
    if (!Array.isArray(entries)) {
      throw new Error('Переданный параметр должен быть массивом PasswordEntry[]');
    }

    const encryptedData = encryptData(entries, key);
    localStorage.setItem(STORAGE_KEY, encryptedData);

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
