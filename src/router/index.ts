import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../layout/index.vue') ,
    redirect: '/startExp',
    children: [
      {
        path: '/startExp',
        component: () => import('@/views/startExp/startExp.vue'),
        name: "startExp",
        meta: {
          title: "开始实验",
          roles: [""]
        },
        children:[
          // 实验第二步
          {
            path:'/secondExp',
            component: () => import('@/views/startExp/secondExp.vue')
          },
          {
            path:'/thirdExp',
            component: () => import('@/views/startExp/thirdExp.vue')
          }

        ]
      },
      {
        path: '/expAim',
        component: () => import('@/views/expAim/expAim.vue'),
        name: "expAim",
        meta: {
          title: "实验目的",
          roles: [""]
        }
      },
      {
        path: '/expResources',
        component: () => import('@/views/expResources/expResources.vue'),
        name: "expProgress",
        meta: {
          title: "实验资源",
          roles: [""]
        }
      },
      {
        path: '/demonstrate',
        component: () => import('@/views/demonstrate/demonstrate.vue'),
        name: "demonstrate",
        meta: {
          title: "例程演示",
          roles: [""]
        }
      },
      {
        path: '/operate',
        component: () => import('@/views/operate/operate.vue'),
        name: "operate",
        meta: {
          title: "实验操作",
          roles: [""]
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
