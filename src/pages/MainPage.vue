<template>
    <div v-if="authStore.isAuthenticated">
        <el-container>
            <el-header>
                <ListHeader />
            </el-header>
            <el-main>
                <PasswordList />
            </el-main>
        </el-container>
    </div>
    <div v-else>
        <LoginScreen />
    </div>
</template>

<script setup lang="ts">
import PasswordList from '../components/Containers/PasswordList.vue';
import ListHeader from '../components/Containers/ListHeader.vue'
import { useAuthStore } from '../store/useAuthStore';
import LoginScreen from '../components/Containers/LoginScreen.vue';
const authStore = useAuthStore()
</script>

<style scoped lang="scss"></style>