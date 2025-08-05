import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { PasswordEntry } from '../types';

const getInitialState = () => ({
  id: null as string | null,
  name: '',
  login: '',
  password: '',
  tags: [] as string[],
  comment: '',
  url: '',
  isFavorite: false,
});

export const useFormStore = defineStore('form', () => {
  const form = reactive(getInitialState());
  const fillFormForEdit = (accountToEdit: PasswordEntry) => {
    form.id = accountToEdit.id;
    form.name = accountToEdit.name;
    form.login = accountToEdit.login;
    form.password = accountToEdit.password;
    form.tags = accountToEdit.tags?.map(t => t.text) ?? [];
    form.comment = accountToEdit.comment || '';
    form.url = accountToEdit.url || '';
    form.isFavorite = accountToEdit.isFavorite || false;
  };

  const resetForm = () => {
    Object.assign(form, getInitialState());
  };

  return {
    form,
    fillFormForEdit,
    resetForm,
  };
});