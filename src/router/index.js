import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/daily',
    name: 'DailyList',
    component: () => import('@/pages/DailyList.vue')
  },
  {
    path: '/daily/:detailId',
    name: 'DailyDetail',
    component: () => import('@/pages/DailyDetail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
