<template>
    <el-button
        :type="type"
        :disabled="disabled"
        :size="size"
        :icon="icon"
        :circle="circle"
        @click="$emit('click')"
    >
        <slot v-if="$slots.default"></slot>
    </el-button>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

withDefaults(defineProps<{
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
    disabled?: boolean;
    size?: 'default' | 'small' | 'large',
    icon?: Component,
    circle?: boolean
}>(), {
    type: 'primary',
    size: 'large'
})
defineEmits(['click'])
</script>

<style scoped lang="scss">

</style>