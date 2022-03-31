import { PiniaPluginContext } from 'pinia';
/**
 * options类型
 */
interface PersistedStateOptions {
    key: string;
}
/**
 * 持久化key
 */
declare let PERSISTED_STATE_KEY: string;
/**
 * 带可选参数创建
 * @param options
 * @returns
 */
export declare function createPersistedState(options?: PersistedStateOptions | undefined): typeof piniaPersistedState;
/**
 * pinia state 本地存储
 * @param context pinia context
 */
export declare function piniaPersistedState(context: PiniaPluginContext): void;
export { PERSISTED_STATE_KEY };
