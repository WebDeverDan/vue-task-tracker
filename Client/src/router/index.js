import {createRouter, createWebHistory} from 'vue-router'
import About_Page from '../views/About_Page.vue'
import Home from '../views/Home_Page.vue'

const routes = [
    {
        path: '/about',
        name: 'About',
        component: About_Page
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router