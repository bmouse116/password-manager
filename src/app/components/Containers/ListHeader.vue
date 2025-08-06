<template>
  <div class="navigation">
    <FormField label="Поиск" type="text" placeholder="Введите название" v-model="store.searchQuery" />
    <FilterSelect v-model="store.selectedTag" :options="tagOptions" placeholder="Выбрать метку" />
    <FilterSelect v-model="store.selectedFilter" :options="sortOptions" placeholder="Выбрать фильтр" />

    <ButtonActions size="default" @click="modal.open()">Добавить</ButtonActions>
    <div class="theme-toggle">
      <el-switch
        v-model="isDark"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
        
      />
    </div>
  </div>
  <PasswordFormModal :isOpen="modal.isOpen" @close="modal.close()" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormField from '../UI/FormField.vue'
import FilterSelect from '../UI/FilterSelect.vue'
import ButtonActions from '../UI/ButtonActions.vue'
import PasswordFormModal from '../Modal/PasswordFormModal.vue'
import { useModalStore } from '../../../shared/store/useModalStore'
import { useAccounts } from '../../../shared/store/useAccountStore'
import { useTheme } from '../../../shared/composables/useTheme'
import { SortTypes } from '../../../shared/types'
import { Sunny, Moon } from '@element-plus/icons-vue'
const store = useAccounts()
const modal = useModalStore()
const {isDark} = useTheme()
const tagOptions = computed(() => {
  const tagSet = new Set<string>()

  store.entries.forEach(entry => {
    entry.tags?.forEach(tag => tagSet.add(tag.text))
  })

  const options = Array.from(tagSet).map(tag => ({
    label: tag,
    value: tag
  }))

  return [
    { label: 'Все метки', value: '' },
    ...options
  ]
})

const sortOptions = [
  { label: 'Без фильтра', value: SortTypes.NONE },
  { label: 'Новые', value: SortTypes.NEW },
  { label: 'Старые', value: SortTypes.OLD },
  { label: 'Избранные', value: SortTypes.FAVORITE },
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
