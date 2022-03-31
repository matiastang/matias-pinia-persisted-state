/*
 * @Author: your name
 * @Date: 2021-10-15 17:10:16
 * @LastEditTime: 2022-03-31 18:58:00
 * @LastEditors: matiastang
 * @Description: In User Settings Edit
 * @FilePath: /matias-pinia-persisted-state/src/main.ts
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
// pinia状态管理
import { createPinia } from 'pinia'
import '@/pinia/customProperties'
import '@/pinia/stateProperties'
import { myPiniaPlugin } from '@/pinia/plugin'
// import { createPersistedState } from '@/pinia/piniaPersistedState'
import { createPersistedState } from 'matias-pinia-persisted-state'

const app = createApp(App)

// pinia
const pinia = createPinia()
pinia.use(
    createPersistedState({
        key: 'pinia-key',
    })
)
pinia.use(myPiniaPlugin)

app.use(pinia)

// 路由
app.use(router)
// 挂载
app.mount('#app')
if (import.meta.env.PROD) {
    console.log = () => {
        // MARK: - 线上环境屏蔽log
    }
} else {
    console.info(`当前Vue版本为${app.version}`)
}
