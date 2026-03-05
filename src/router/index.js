import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/practice/:levelId',
    name: 'Practice',
    component: () => import('@/views/PracticePage.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router