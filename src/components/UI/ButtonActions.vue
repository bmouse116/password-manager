<template>
    <el-button
        :type="type"
        :disabled="disabled"
        :size="size"
        @click="$emit('click')"
    >
        <slot></slot>
    </el-button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    disabled?: boolean;
    size?: 'default' | 'small' | 'large'
}>(), {
    type: 'primary',
    size: 'large'
})
defineEmits(['click'])
</script>

<style scoped lang="scss">

</style>