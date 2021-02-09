import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import MainLayout from '@/components/MainLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    redirect: '/main/daily',
    name: 'Main',
    component: MainLayout,
    children: [
      {
        path: 'daily',
        name: 'DailyList',
        component: () => import('@/pages/DailyList.vue')
      },
      {
        path: 'daily/:detailId',
        name: 'DailyDetail',
        component: () => import('@/pages/DailyDetail.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
