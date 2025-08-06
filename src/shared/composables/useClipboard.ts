import { useNotify } from './useNotification';

export function useClipboard() {
  const notify = useNotify();

  const copyText = async (text: string) => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      notify.success('Текст скопирован');
    } catch {
      notify.error('Ошибка копирования');
    }
  };

  return { copyText };
}
