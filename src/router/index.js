import { createRouter, createWebHistory } from 'vue-router'

// Rutas públicas (web institucional)
import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

// Rutas privadas (banca en línea)
import DashboardView from '@/views/DashboardView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { layout: 'public' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'public' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { layout: 'private' },
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
