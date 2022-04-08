/*
 * @Author: matiastang
 * @Date: 2021-12-28 19:31:46
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-08 17:44:14
 * @FilePath: /matias-pinia-persisted-state/src/router/index.ts
 * @Description: 路由
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// web
import Index from '@/views/index.vue'
// NotFound
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/:pathMatch(.*)*',
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
})

export default router
