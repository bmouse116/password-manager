<template>
  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>{{ account.name }}</span>
        <el-button
        :type="account.isFavorite ? 'warning' : 'default'" 
        :icon="account.isFavorite ? StarFilled : Star" 
        circle 
        @click="toggleFavorite"/>
      </div>
    </template>
    <div class="text item"><strong>Логин:</strong> {{ account.login }}</div>
    <div class="text item password-row">
      <strong>Пароль:</strong>
      <span class="password-text">
        {{ isPasswordVisible ? account.password : '••••••••••' }}
      </span>
      <ButtonActions type="text" size="small" @click="togglePasswordVisibility">
        {{ isPasswordVisible ? 'Скрыть' : 'Показать' }}
      </ButtonActions>
    </div>
    <div class="text item" v-if="account.url">
      <strong>URL:</strong>
      <a :href="account.url" target="_blank">{{ account.url }}</a>
    </div>
    <div class="text item" v-if="account.comment">
      <strong>Комментарий:</strong> {{ account.comment }}
    </div>
    <div class="text item">
      <strong>Метки:</strong>
      <el-tag v-for="tag in account.tags" :key="tag.text" size="small" style="margin-right: 4px">
        {{ tag.text }}
      </el-tag>
    </div>
    <small>Создано: {{ formatDate(account.createdAt) }}</small><br />
    <small v-if="account.updatedAt !== ''">Обновлено: {{ formatDate(account.updatedAt) }}</small>
    <template #footer>
      <div class="footer-actions">
        <ButtonActions size="small" @click="clipboardPassword(account.password)">Скопировать пароль</ButtonActions>
        <ButtonActions size="small" @click="editAccount(account.id)">Редактировать</ButtonActions>
        <ButtonActions size="small" @click="modal.confirmOpen()">Удалить</ButtonActions>
      </div>
    </template>
  </el-card>
  <ConfirmDelete :isConfirmOpen="modal.isConfirmOpen" @close="modal.confirmClose()" @delete="removeAccount(account.id)"/>
</template>

<script setup lang="ts">
import { Star, StarFilled } from '@element-plus/icons-vue';
import { formatDate } from '../../utils/formatDate';
import ButtonActions from './ButtonActions.vue';
import { useClipboard } from '../../composables/useClipboard';
import { ref } from 'vue';
import { useAccounts } from '../../store/useAccountStore';
import { useNotify } from '../../composables/useNotification';
import { useModalStore } from '../../store/useModalStore';
import ConfirmDelete from '../Modal/ConfirmDelete.vue';
const store = useAccounts()
const notify = useNotify()
const modal = useModalStore()
const { copyText } = useClipboard()
const props = defineProps<{
  account: {
    id: string
    name: string
    login: string
    password: string
    tags?: { text: string }[]
    comment?: string
    url?: string
    createdAt: string
    updatedAt: string
    isFavorite?: boolean
  }
}>();

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const clipboardPassword = (password: string) => {
  copyText(password);
}

const removeAccount = (id: string) => {
  try{
    store.remove(id)
    notify.success("Запись успешно удалена")
  }
  catch(error) {
    notify.error("Ошибка при удалении записи")
  }
}

const editAccount = (id: string) => {

  modal.open(id)
}

const toggleFavorite = () => {
  const updated = {
    ...props.account,
    isFavorite: !props.account.isFavorite
  }
  store.update(updated)
  notify.success(updated.isFavorite ? "Запись добавлена в избранные" : "Запись убрана из избранных")
}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text.item {
  margin-bottom: 6px;
}

.password-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.password-text {
  font-family: monospace;
  user-select: text;
}

.footer-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 10px;

  .el-button {
    margin-left: 0px;
  }
}
</style>
