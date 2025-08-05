<template>
  <el-form
    :ref="(el: FormInstance | null) => formRef = el"
    :model="form"
    :rules="rules"
    label-width="100px"
    label-position="left"
    @submit.prevent="submit"
  >
    <el-form-item label="Название" prop="name">
      <FormField v-model="form.name" placeholder="Введите название" />
    </el-form-item>
    <el-form-item label="Логин" prop="login">
      <FormField v-model="form.login" placeholder="Введите логин" />
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <FormField v-model="form.password" type="password" placeholder="Надежный пароль" />
    </el-form-item>
    <el-form-item label="Метки">
      <TagInput v-model="form.tags" placeholder="метка1; метка2;" />
    </el-form-item>
    <el-form-item label="Комментарий">
      <FormField v-model="form.comment" type="textarea" placeholder="Комментарий" />
    </el-form-item>
    <el-form-item label="URL">
      <FormField v-model="form.url" placeholder="https://google.com" />
    </el-form-item>
    
    <ButtonActions @click="submit">
      {{ isEditMode ? 'Сохранить изменения' : 'Добавить запись' }}
    </ButtonActions>
  </el-form>
</template>

<script setup lang="ts">
import FormField from '../UI/FormField.vue';
import TagInput from '../UI/TagInput.vue';
import ButtonActions from '../UI/ButtonActions.vue';
import { usePasswordForm } from '../../composables/usePasswordForm';
import type { FormInstance } from 'element-plus';
const { formRef, form, rules, isEditMode, submit } = usePasswordForm();

</script>