/*
 * @Author: matiastang
 * @Date: 2021-12-28 19:31:46
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-31 15:31:03
 * @FilePath: /matias-pinia-persisted-state/src/router/index.ts
 * @Description: 路由
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// test
import Index from '@/views/index.vue'
// NotFound
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: Index,
        beforeEnter: (to, from) => {
            console.log(`web路由卫士：即将从${from.path}跳转到${to.path}`)
            return true
        },
    },
    {
        path: '/:pathMatch(.*)*', // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        name: 'NotFound',
        redirect: '/',
        component: NotFound,
    },
]
/**
 * 创建Router
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 平滑滚动
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
        return { x: 0, y: 0 }
    },
})

/**
 * 全局前置守卫
 */
router.beforeEach((to, from, next) => {
    next()
})

/**
 * 全局解析守卫
 */
router.beforeResolve((to) => {
    console.log(`将要跳转到${to.path}`)
})

/**
 * 全局后置钩子
 */
router.beforeEach((to, from) => {
    console.log(`从${from.path}跳转到${to.path}`)
})

export default router
