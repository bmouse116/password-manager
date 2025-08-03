<template>
  <el-form-item :label="label" :error="error" :prop="prop">
    <el-input
      v-if="type !== 'textarea'"
      :type="type"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
    />
    <el-input
      v-else
      type="textarea"
      :rows="rows || 4"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
    />
  </el-form-item>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  modelValue: string | number
  type?: 'text' | 'password' | 'textarea'
  placeholder?: string
  error?: string
  prop?: string
  rows?: number
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0px;
}

</style>
