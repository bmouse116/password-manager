<template>
  <div class="login-container">
    <h2>Вход в хранилище</h2>
    <p>Введите ваш мастер-пароль для доступа к данным.</p>
    <FormField
      v-model="masterPassword"
      type="password"
      placeholder="Мастер-пароль"
      :error="error"
      @keyup.enter="handleLogin"
      
    />
    <ButtonActions
      type="primary"
      @click="handleLogin"
      style="margin-top: 20px;"
    >
      Войти
    </ButtonActions>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { useAccounts } from '../../../shared/store/useAccountStore';

import FormField from '../UI/FormField.vue';
import ButtonActions from '../UI/ButtonActions.vue';

const masterPassword = ref('');
const error = ref('');
const authStore = useAuthStore();
const accountsStore = useAccounts();
const handleLogin = () => {
  if (!masterPassword.value) {
    error.value = 'Пароль не может быть пустым.';
    return;
  }
  
  error.value = '';

  setTimeout(() => {
    authStore.login(masterPassword.value);
    accountsStore.load();
    if (!authStore.isAuthenticated) {
        error.value = 'Неверный мастер-пароль. Попробуйте еще раз.';
    }
    
  }, 50);
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>