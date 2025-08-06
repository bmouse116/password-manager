<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8" v-for="account in paginationEntries" :key="account.id">
        <div class="grid-content">
          <PasswordCard :account="account" />
        </div>
      </el-col>
    </el-row>
    <div class="pagination-container">
      <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pagination.pageSize"
        :current-page="pagination.currentPage" @current-change="handlePageChange" class="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import PasswordCard from './PasswordCard.vue';
import { useAccounts } from '../../../shared/store/useAccountStore';
import { usePagination } from '../../../shared/store/usePaginationStore';


const store = useAccounts()
const pagination = usePagination()

const paginationEntries = computed(() =>
  pagination.getPaginationItems(store.filteredEntries)
)

const totalItems = computed(() => {
  return store.filteredEntries.length;
});

const handlePageChange = (page: number) => {
  pagination.currentPage = page
}

watch(() => store.filteredEntries, () => {
  pagination.resetPage()
})

</script>

<style scoped lang="scss">
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
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

.pagination-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>