<template>
  <el-dialog
    :title="modal.isEditMode ? 'Редактирование записи' : 'Новая запись'"
    width="500px"
    :model-value="isOpen"
    @update:model-value="$emit('close')"
  >
    <PasswordForm/>
  </el-dialog>
</template>

<script setup lang="ts">
import { useModalStore } from '../../store/useModalStore'
import PasswordForm from './PasswordForm.vue'
const modal = useModalStore()

defineProps({
  isOpen: Boolean,
})

defineEmits(['close'])
</script>