import { ref, computed, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import { useAccounts } from '../store/useAccountStore';
import { useModalStore } from '../store/useModalStore';
import { useFormStore } from '../store/useFormStore';
import { useNotify } from './useNotification';
import { getCurrentDate } from '../utils/date';

export function usePasswordForm() {
  const modalStore = useModalStore();
  const accountsStore = useAccounts();
  const formStore = useFormStore();
  const notify = useNotify();

  const formRef = ref<FormInstance | null>(null);

  const rules: FormRules = {
    name: [{ required: true, message: 'Пожалуйста, введите название', trigger: 'blur' }],
    login: [{ required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' }],
    password: [
      { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
      { min: 6, message: 'Пароль должен содержать не менее 6 символов', trigger: 'blur' },
    ],
  };
  
  watch(() => modalStore.isOpen, (isOpen) => {
    if (isOpen) {
      if (modalStore.isEditMode && modalStore.editingId) {
        const account = accountsStore.getAccountById(modalStore.editingId);
        if (account) {
          formStore.fillFormForEdit(account);
        }
      } else {
        formStore.resetForm();
      }
    }
  }, { immediate: true });

  const submit = async () => {
    if (!formRef.value) return;

    try {
      await formRef.value.validate();
    } catch {
      notify.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    try {
      if (modalStore.isEditMode && formStore.form.id) {
        accountsStore.update({
          id: formStore.form.id,
          name: formStore.form.name,
          login: formStore.form.login,
          password: formStore.form.password,
          tags: formStore.form.tags.map(t => ({ text: t })),
          comment: formStore.form.comment,
          url: formStore.form.url,
          isFavorite: formStore.form.isFavorite,
          createdAt: '',
          updatedAt: '',
        });
        notify.success('Запись успешно обновлена');
      } else {
        const now = getCurrentDate();
        accountsStore.add({
          id: uuidv4(),
          name: formStore.form.name,
          login: formStore.form.login,
          password: formStore.form.password,
          tags: formStore.form.tags.map(t => ({ text: t })),
          comment: formStore.form.comment,
          url: formStore.form.url,
          createdAt: now,
          updatedAt: '',
          isFavorite: formStore.form.isFavorite,
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
    form: formStore.form,
    rules,
    isEditMode: computed(() => modalStore.isEditMode),
    submit,
  };
}