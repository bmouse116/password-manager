import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
    {
        path: '/',
        component: MainPage,
        name: "MainPage"
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        name: "NotFound"
    }
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router