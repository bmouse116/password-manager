<template>
    <el-container>
        <el-header>
            <ListHeader />
        </el-header>
        <el-main>
            <PasswordList />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import PasswordList from '../components/Containers/PasswordList.vue';
import ListHeader from '../components/Containers/ListHeader.vue'

</script>

<style scoped lang="scss"></style>