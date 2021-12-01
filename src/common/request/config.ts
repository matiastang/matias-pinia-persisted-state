/*
 * @Author: matiastang
 * @Date: 2021-11-11 18:41:42
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-01 18:51:54
 * @FilePath: /datumwealth-openalpha-front/src/common/request/config.ts
 * @Description: 配置
 */
import { AxiosRequestConfig } from 'axios'
const baseURL = `${import.meta.env.VITE_APP_BASE_API}/api`
const config: AxiosRequestConfig = {
    baseURL,
    timeout: 10000,
}

export default config
export { baseURL }
