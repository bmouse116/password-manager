import { defineStore } from "pinia";
import { ref } from "vue";

export const usePagination = defineStore('pagination', () => {
    const currentPage = ref(1)
    const pageSize = ref(6)

    const resetPage = () => {
        currentPage.value = 1
    }

    const getPaginationItems = <T>(items: T[]) => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = currentPage.value * pageSize.value

        return items.slice(start, end)
    }

    const getTotal = <T>(items: T[]) => items.length

    return {
        currentPage,
        pageSize,
        resetPage,
        getPaginationItems,
        getTotal
    }
})