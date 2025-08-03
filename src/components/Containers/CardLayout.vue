<template>
  <el-row :gutter="10">
    <el-col :span="8" v-for="account in store.entries" :key="account.id">
      <div class="grid-content">
        <PasswordCard :account="account" />
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useAccounts } from '../../store/useAccountStore';
import PasswordCard from '../UI/PasswordCard.vue';


const store = useAccounts()
store.load()
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
</style>