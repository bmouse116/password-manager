<template>
  <el-select
    style="width: 150px;"
    v-model="internalValue"
    :placeholder="placeholder"
    @change="handleChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number | null
  options: { label: string; value: string | number }[]
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const handleChange = (val: string | number) => {
  emit('update:modelValue', val)
}
</script>

<style scoepd lang="scss">

</style>
