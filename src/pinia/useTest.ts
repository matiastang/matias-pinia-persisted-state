/*
 * @Author: matiastang
 * @Date: 2022-03-18 17:27:11
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-11 14:16:13
 * @FilePath: /matias-pinia-persisted-state/src/pinia/useTest.ts
 * @Description:
 */
import { defineStore } from 'pinia'

interface State {
    stateName: string
    data: string
}

export const useTestStore = defineStore('auth/test', {
    state: (): State => ({
        stateName: 'test',
        data: 'data',
    }),
    actions: {
        setData(data: string) {
            this.data = data
        },
    },
})
