import { defineStore } from "pinia";
import type { PasswordEntry } from "../types";
import { computed, ref } from "vue";
import { loadEntries, saveEntries } from "../services/passwordService";
import { getCurrentDate } from "../utils/date";

export const useAccounts = defineStore('useAccounts', () => {
    const entries = ref<PasswordEntry[]>([])

    
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
    
    const getAccountById = computed(() => {
            return (id: string) => entries.value.find(e => e.id === id);
    });
    load()
    return {
        entries,
        load,
        add,
        remove,
        update,
        getAccountById
    }
})