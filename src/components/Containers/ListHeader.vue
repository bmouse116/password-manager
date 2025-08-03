<template>
  <h1>Менеджер паролей</h1>
  <div class="navigation">
    <FormField
      label="Поиск"
      type="text"
      :model-value="searchString"
      placeholder="Введите текст"
      @update:modelValue="searchString = $event"
    />
    <FilterSelect
      v-model="selectedTag"
      :options="tagOptions"
      placeholder="Выбрать метку"
    />
    <FilterSelect
      v-model="selectedSort"
      :options="sortOptions"
      placeholder="Выбрать фильтр"
    />

    <ButtonActions size="default" @click="modal.open()">Добавить</ButtonActions>
  </div>
  <PasswordFormModal :isOpen="modal.isOpen" @close="modal.close()"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormField from '../UI/FormField.vue'
import FilterSelect from '../UI/FilterSelect.vue'
import ButtonActions from '../UI/ButtonActions.vue'
import PasswordFormModal from '../Modal/PasswordFormModal.vue'
import { useModalStore } from '../../store/useModalStore'

const modal = useModalStore()
const searchString = ref('')
const selectedTag = ref<string | null>(null)
const selectedSort = ref<string | null>(null)

const tagOptions = [
  { label: 'Работа', value: 'work' },
  { label: 'Личное', value: 'personal' },
]

const sortOptions = [
  { label: 'Новые', value: 'new' },
  { label: 'Избранные', value: 'favorite' },
]
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}
</style>
