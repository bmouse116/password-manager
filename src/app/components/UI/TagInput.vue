<template>
  <div class="semicolon-input-tag-wrapper">
    <el-tag
      v-for="tag in tags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <el-input
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      :placeholder="placeholder"
      @input="handleInput"
      style="width: 300px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElTag } from 'element-plus'

defineProps<{
  placeholder?: string
}>()
const tags = defineModel<string[]>({ required: true })

const inputValue = ref('')
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}

const handleInput = (val: string) => {
  if (val.includes('; ')) {
    const newTags = val.split('; ')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    newTags.forEach(newTag => {
      if (!tags.value.includes(newTag)) {
        tags.value.push(newTag);
      }
    });
    inputValue.value = '';
  }
}
</script>

<style scoped>
.semicolon-input-tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.mx-1 {
  margin-left: 4px;
  margin-right: 4px;
}
.w-20 {
  width: 150px;
}
</style>