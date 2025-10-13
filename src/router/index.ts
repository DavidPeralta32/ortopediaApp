import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/productos', name: 'Productos', component: () => import('../views/Productos/Productos.vue') },
  { path: '/nosotros', name: 'Nosotros', component: () => import('../views/Nosotros/Nosotros.vue') },
  { path: '/contacto', name: 'Contacto', component: () => import('../views/Contacto/Contacto.vue') }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // ← Hash mode
  routes
})

export default router
