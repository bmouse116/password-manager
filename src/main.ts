import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
const pinia = createPinia()
createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
