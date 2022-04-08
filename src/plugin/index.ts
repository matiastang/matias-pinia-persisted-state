/*
 * @Author: matiastang
 * @Date: 2022-02-09 17:17:20
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-08 18:50:08
 * @FilePath: /matias-pinia-persisted-state/src/plugin/index.ts
 * @Description: pinia状态本地存储插件
 */
import { PiniaPluginContext, StateTree, PiniaCustomStateProperties } from 'pinia'
import { PINIA_LOCAL_STORAGE_KEY as key, localStorageWrite, localStorageRead } from './localStorage'

const NPMLINK = 'https://www.npmjs.com/package/matias-pinia-persisted-state'
/**
 * options类型
 */
interface PersistedStateOptions {
    key: string
}

/**
 * 持久化key
 */
let PERSISTED_STATE_KEY = key

/**
 * 本地存储数据差异化检测，更新
 * @returns Void
 */
const localStateDiff = (state: StateTree & PiniaCustomStateProperties<StateTree>) => {
    const stateName = state.stateName
    if (typeof stateName === 'undefined') {
        console.error('state必须有stateName熟悉，详情查看：', NPMLINK)
        return
    }
    // console.log(`localStateDiff=${stateName}`)
    const localState = localStorageRead<StateTree>(PERSISTED_STATE_KEY)
    if (localState === null) {
        // 初始化保存
        localStorageWrite(PERSISTED_STATE_KEY, {
            [stateName]: state,
        })
        return
    }
    const localNameState = localState[stateName]
    if (localNameState === undefined) {
        localState[stateName] = state
        // 差异保存
        localStorageWrite(PERSISTED_STATE_KEY, localState)
        return
    }
    // 差异查找更新
    for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            const element = state[key]
            if (Object.prototype.hasOwnProperty.call(localNameState, key)) {
                const localElement = localNameState[key]
                if (element !== localElement) {
                    state[key] = localElement
                }
            }
        }
    }
    localState[stateName] = state
    // 差异保存
    localStorageWrite(PERSISTED_STATE_KEY, localState)
}

/**
 * 带可选参数创建
 * @param options
 * @returns
 */
export function createPersistedState(options: PersistedStateOptions | undefined = undefined) {
    if (options) {
        PERSISTED_STATE_KEY = options.key
    }
    return piniaPersistedState
}

/**
 * pinia state 本地存储
 * @param context pinia context
 */
export function piniaPersistedState(context: PiniaPluginContext) {
    const state = context.store.$state
    // 初始化检测更新
    localStateDiff(state)
    // console.log(
    //     Object.keys(context.store).filter(
    //         (key) => !key.startsWith('$') && !key.startsWith('_') && !key.startsWith('set')
    //     )
    // )
    // console.log(Object.keys(state))
    context.store.$subscribe(() => {
        // console.log(`userID=${context.store.userId}`)
        // console.log(
        //     Object.keys(context.store).filter(
        //         (key) => !key.startsWith('$') && !key.startsWith('_') && !key.startsWith('set')
        //     )
        // )
        // console.log(Object.keys(state))
        const stateName = state.stateName
        if (typeof stateName === 'undefined') {
            console.error('state必须有stateName熟悉，详情查看：', NPMLINK)
            return
        }
        // console.log(`subscribe=${stateName}`)
        const localState = localStorageRead<StateTree>(PERSISTED_STATE_KEY)
        if (localState === null) {
            // 初始化保存
            localStorageWrite(PERSISTED_STATE_KEY, {
                [stateName]: state,
            })
            return
        }
        localState[stateName] = state
        // 直接更新存储状态
        // FIXME: - 非状态更新也会调用，可能会有性能问题
        // TODO: - 挂载到context.store的熟悉并未实现持久化
        localStorageWrite(PERSISTED_STATE_KEY, localState)
    })
}

export { PERSISTED_STATE_KEY }
