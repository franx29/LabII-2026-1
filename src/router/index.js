import { createRouter, createWebHistory } from 'vue-router'

// Rutas públicas (web institucional)
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RecoverView from '@/views/RecoverView.vue'

// Rutas privadas (banca en línea)
import MovementsView from '@/views/MovementsView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TransfersView from '@/views/TransfersView.vue'
import TransferReceiptView from '@/views/TransferReceiptView.vue'

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
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'public' },
  },
  {
    path: '/recover',
    name: 'recover',
    component: RecoverView,
    meta: { layout: 'public' },
  },
  {
    path: '/inicio',
    name: 'dashboard',
    component: DashboardView,
    meta: { layout: 'private' },
  },
  {
    path: '/movimientos',
    name: 'movements',
    component: MovementsView,
    meta: { layout: 'private' },
  },
  {
    path: '/transferencias',
    name: 'transfers',
    component: TransfersView,
    meta: { layout: 'private' },
  },
  {
    path: '/transferencias/comprobante',
    name: 'transfer-receipt',
    component: TransferReceiptView,
    meta: { layout: 'private' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.layout === 'private' && !token) {
    next('/login')
  } else {
    // Clear last receipt if navigating to any page other than the receipt page
    if (to.path !== '/transferencias/comprobante') {
      sessionStorage.removeItem('bu_last_transfer_receipt')
    }
    next()
  }
})


export default router