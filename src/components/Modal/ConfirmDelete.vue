<template>
    <el-dialog
      title="Подтверждение удаления записи" 
      width="500px" 
      :model-value="isConfirmOpen"
      @update:model-value="$emit('close')">
        <template #footer>
            <div class="dialog-footer">
                <ButtonActions @click="$emit('close')" type="info" size="small">Отмена</ButtonActions>
                <ButtonActions @click="$emit('delete')" size="small">Удалить</ButtonActions>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import ButtonActions from '../UI/ButtonActions.vue';

defineProps({
  isConfirmOpen: Boolean,
})
const emit = defineEmits(['close', 'delete'])
</script>

<style scoped lang="scss"></style>