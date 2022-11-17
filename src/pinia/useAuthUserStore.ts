/*
 * @Author: matiastang
 * @Date: 2022-02-09 15:30:53
 * @LastEditors: matiastang
 * @LastEditTime: 2022-11-17 09:59:03
 * @FilePath: /matias-pinia-persisted-state/src/pinia/useAuthUserStore.ts
 * @Description: 用户权限store
 */
import { defineStore } from 'pinia'

interface State {
    name: string
    age: string
}

export const useAuthUserStore = defineStore('user', {
    state: (): State => ({
        name: 'name',
        age: 'age',
    }),
    actions: {
        setName(name: string) {
            this.name = name
        },
    },
})
