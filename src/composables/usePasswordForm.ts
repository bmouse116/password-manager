// usePasswordForm.ts
import { nextTick, reactive, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { FormInstance, FormRules } from 'element-plus';
import { useAccounts } from '../store/useAccountStore';
import { useModalStore } from '../store/useModalStore';
import { useNotify } from './useNotification';
import { getCurrentDate } from '../utils/date';

export function usePasswordForm() {
  const modalStore = useModalStore();
  const accountsStore = useAccounts();
  const notify = useNotify();

  const formRef = ref<FormInstance | null>(null);
  
  const getInitialState = () => ({
    name: '',
    login: '',
    password: '',
    tags: [] as string[],
    comment: '',
    url: '',
    isFavorite: false,
  });

  const form = reactive(getInitialState());

  const rules = reactive<FormRules>({
    name: [{ required: true, message: 'Пожалуйста, введите название', trigger: 'blur' }],
    login: [{ required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' }],
    password: [
      { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
      { min: 6, message: 'Пароль должен содержать не менее 6 символов', trigger: 'blur' },
    ],
  });

  const resetForm = () => {
    Object.assign(form, getInitialState());
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };

  const fillFormForEdit = (id: string) => {
    const accountToEdit = accountsStore.getAccountById(id);
    if (accountToEdit) {
      form.name = accountToEdit.name;
      form.login = accountToEdit.login;
      form.password = accountToEdit.password;
      form.tags = accountToEdit.tags?.map(t => t.text) ?? [];
      form.comment = accountToEdit.comment || '';
      form.url = accountToEdit.url || '';
      form.isFavorite = accountToEdit.isFavorite || false;
    }
  };

  watch(() => modalStore.isOpen, (isOpen) => {
    if (isOpen) {
      if (modalStore.editingId) {
        fillFormForEdit(modalStore.editingId);
      } else {
        resetForm();
      }
    }
  });

  const submit = async () => {
    if (!formRef.value) return;

    try {
      await formRef.value.validate();
    } catch {
      notify.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    try {
      if (modalStore.isEditMode && modalStore.editingId) {
        accountsStore.update({
          id: modalStore.editingId,
          name: form.name,
          login: form.login,
          password: form.password,
          tags: form.tags.map(t => ({ text: t })),
          comment: form.comment,
          url: form.url,
          isFavorite: form.isFavorite,
          createdAt: '',
          updatedAt: '',
        });
        notify.success('Запись успешно обновлена');
      } else {
        const now = getCurrentDate();
        accountsStore.add({
          id: uuidv4(),
          name: form.name,
          login: form.login,
          password: form.password,
          tags: form.tags.map(t => ({ text: t })),
          comment: form.comment,
          url: form.url,
          createdAt: now,
          updatedAt: now,
          isFavorite: form.isFavorite,
        });
        notify.success('Запись успешно добавлена');
      }
      modalStore.close();
    } catch (e) {
      notify.error('Произошла ошибка при сохранении');
    }
  };

  return {
    formRef,
    form,
    rules,
    isEditMode: modalStore.isEditMode,
    submit,
  };
}
