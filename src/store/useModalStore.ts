import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const isConfirmOpen = ref(false)
  const editingId = ref<string | null>(null);

  const isEditMode = computed(() => editingId.value !== null);

  const open = (id: string | null = null) => {
    editingId.value = id;
    isOpen.value = true;
  }

  const close = () => {
    isOpen.value = false;
    editingId.value = null;
  }

  const confirmOpen = () => {
    isConfirmOpen.value = true
  }

  const confirmClose = () => {
    isConfirmOpen.value = false
  }

  return {
    isOpen,
    isConfirmOpen,
    editingId,
    isEditMode,
    open,
    close,
    confirmOpen,
    confirmClose
  };
});