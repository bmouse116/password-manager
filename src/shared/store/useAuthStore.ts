import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { hashMasterPassword } from '../services/cryptoService';
export const useAuthStore = defineStore('auth', () => {
    const encryptionKey = ref<string | null>(null);
    const isAuthenticated = computed(() => !!encryptionKey.value);

    function login(masterPassword: string) {
        if (!masterPassword) {
            logout();
            return;
        }
        encryptionKey.value = hashMasterPassword(masterPassword);
    }
    function logout() {
        encryptionKey.value = null;
    }

    return {
        encryptionKey,
        isAuthenticated,
        login,
        logout,
    };
});