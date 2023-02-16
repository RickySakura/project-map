// 该文件除非必要，不要修改
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 自动引入分布式路由，路由格式必须为 *.routes.js
const modules = import.meta.glob('./\*.routes.js', { eager: true, import: 'default' })
let routerList = Object.values(modules)

const routes = [
  ...routerList,
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/login' || sessionStorage.getItem('token')) {
    next()
  } else {
    next('/login')
  }
})


export default router