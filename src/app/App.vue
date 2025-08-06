<template>
  <RouterView/>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAccounts } from '../shared/store/useAccountStore';

const store = useAccounts()
onMounted(() => {
  store.load()
})
</script>

<style scoped lang="scss"></style>