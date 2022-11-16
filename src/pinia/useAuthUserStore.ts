/*
 * @Author: matiastang
 * @Date: 2022-02-09 15:30:53
 * @LastEditors: matiastang
 * @LastEditTime: 2022-11-16 19:53:06
 * @FilePath: /matias-pinia-persisted-state/src/pinia/useAuthUserStore.ts
 * @Description: 用户权限store
 */
import { defineStore } from 'pinia'

interface State {
    stateName: string
    name: string
    age: string
    user: {
        name: string
        age: number
        phone: string
        list: Info[]
    }
}

interface Info {
    code: string
    name: string
}

export const useAuthUserStore = defineStore('authUser', {
    state: (): State => ({
        stateName: 'user',
        name: 'name',
        age: 'age',
        user: {
            name: 'tdy',
            age: 29,
            phone: '18380449615',
            list: [],
        },
    }),
    actions: {
        setName(name: string) {
            this.name = name
        },
    },
})
