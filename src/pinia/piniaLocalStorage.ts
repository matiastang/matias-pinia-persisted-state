/*
 * @Author: matiastang
 * @Date: 2022-02-09 17:12:05
 * @LastEditors: matiastang
 * @LastEditTime: 2022-02-10 10:11:35
 * @FilePath: /datumwealth-front-scaffold/src/pinia/piniaLocalStorage.ts
 * @Description: pinia本地存储
 */
/**
 * pinia key
 */
const PINIA_LOCAL_STORAGE_KEY = 'pinia'
/**
 * 存储LocalStorage数据
 * @param key 存储key
 * @param value 存储值
 */
function localStorageWrite(key: string, value: object) {
    try {
        const saveValue = JSON.stringify(value)
        localStorage.setItem(key, saveValue)
    } catch (error) {
        console.warn(`${key}保存失败：${error}`)
    }
}

/**
 * 读取LocalStorage数据
 * @param key 存储key
 * @returns 返回类型
 */
function localStorageRead<T>(key: string): T | null {
    const value = localStorage.getItem(key)
    if (typeof value === 'string') {
        try {
            return <T>JSON.parse(value)
        } catch (error) {
            console.warn(`${key}读取失败：${error}`)
        }
    }
    return null
}

/**
 * 清除LocalStorage数据
 * @param key 存储key
 * @returns 返回类型
 */
function localStorageRemove(key: string) {
    localStorage.removeItem(key)
}

/**
 * 清除所有LocalStorage数据
 * @param key 存储key
 * @returns 返回类型
 */
function localStorageRemoveAll() {
    localStorage.clear()
}

export {
    PINIA_LOCAL_STORAGE_KEY,
    localStorageWrite,
    localStorageRead,
    localStorageRemove,
    localStorageRemoveAll,
}
