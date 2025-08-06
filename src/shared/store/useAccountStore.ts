import { defineStore } from "pinia";
import type { PasswordEntry, SortTypes } from "../types";
import { computed, ref } from "vue";
import { loadEntries, saveEntries } from "../services/passwordService";
import { getCurrentDate } from "../utils/date";
import { filterEntries } from "../services/filterService";
export const useAccounts = defineStore('useAccounts', () => {
    const entries = ref<PasswordEntry[]>([])
    const searchQuery = ref('')
    const selectedTag = ref('')
    const selectedFilter = ref('')
    const load = () => {
        entries.value = loadEntries()
    }

    const add = (entry: PasswordEntry) => {
        entries.value.unshift(entry)
        saveEntries(entries.value)
    }

    const update = (updatedEntry: PasswordEntry) => {
        const index = entries.value.findIndex(e => e.id === updatedEntry.id);
        if (index !== -1) {
            const originalEntry = entries.value[index];
            entries.value[index] = {
                ...updatedEntry,
                createdAt: originalEntry.createdAt,
                updatedAt: getCurrentDate()
            };
            saveEntries(entries.value);
        }
    };

    const remove = (id: string) => {
        entries.value = entries.value.filter(entry => entry.id !== id)
        saveEntries(entries.value)
    }

    const getAccountById = (id: string | null): PasswordEntry | undefined => {
        if (!id) return undefined;
        return entries.value.find(e => e.id === id);
    };

    const filteredEntries = computed(() => {
        return filterEntries(entries.value, {
            searchQuery: searchQuery.value,
            tagGroup: selectedTag.value,
            sort: selectedFilter.value as SortTypes
        });
    });

    return {
        entries,
        load,
        add,
        remove,
        update,
        getAccountById,
        filteredEntries,
        searchQuery,
        selectedTag,
        selectedFilter
    }
})