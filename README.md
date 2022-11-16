<!--
 * @Author: matiastang
 * @Date: 2021-12-13 10:12:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-11-16 20:07:19
 * @FilePath: /matias-pinia-persisted-state/README.md
 * @Description: datumwealth-vue-components
-->
# matias-pinia-persisted-state

## 说明

`pinia`状态的本地持久化。

## 安装与使用

1. 安装`matias-pinia-persisted-state`

* `pnpm`导入
> $ pnpm add -D matias-pinia-persisted-state
* `yarn`导入
> $ yarn add -D matias-pinia-persisted-state
* `npm`导入
> $ npm install -D matias-pinia-persisted-state

2. 引用

* 在`main.ts`中如下便捷导入`matias-pinia-persisted-state`：
```ts
// pinia状态管理
import { createPinia } from 'pinia'
import { createPersistedState, persistedConfig } from 'matias-pinia-persisted-state'

const app = createApp(App)

// pinia
const pinia = createPinia()

// 便捷使用
pinia.use(createPersistedState)
// 查看默认配置
console.log(persistedConfig)

app.use(pinia)
```
* 在`main.ts`中如下带配置导入`matias-pinia-persisted-state`：
```ts
// pinia状态管理
import { createPinia } from 'pinia'
import { createPersistedState, persistedConfig } from 'matias-pinia-persisted-state'

const app = createApp(App)

// pinia
const pinia = createPinia()

// 带配置使用
pinia.use(
    createPersistedState({
        key: 'pinia-key',
    })
)
// 查看配置
console.log(persistedConfig)

app.use(pinia)
```
* `persistedConfig`为`matias-pinia-persisted-state`的配置。
* `persistedConfig.key`是本地持久化`key`，默认值是`pinia-key`。
* `persistedConfig.customKey`是`custom properties`本地持久化`key`，默认值是`pinia-custom-key`。

3. 使用

完成引入后，则`pinia`的所有状态及更新都将保存到`storage`中。
**注意**`custom properties`和`state properties`在初始化的时候无法获取到，需要更新后才会同步到`storage`

* 声明`authUser Store`
```ts
import { defineStore } from 'pinia'

interface State {
    name: string
}

export const useAuthUserStore = defineStore('authUser', {
    state: (): State => ({
        name: 'matias',
    }),
    ...
})
```
* 声明`custom properties`
```ts
import 'pinia'
import { Ref } from 'vue'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        // by using a setter we can allow both strings and refs
        set userId(value: string | Ref<string>)
        get userId(): string

        // you can define simpler values too
        simpleNumber: number
    }
}
```
* 声明`state properties`
```ts
import 'pinia'
import { Ref } from 'vue'

declare module 'pinia' {
    export interface PiniaCustomStateProperties<S> {
        set hello(value: string | Ref<string>)
        get hello(): string
    }
}
```
* 使用并查看状态
```ts
import { useAuthUserStore } from '@/pinia/useAuthUserStore'

const authStore = useAuthUserStore()

// 输出
console.log(
    authStore.simpleNumber,
    authStore.userId,
    authStore.$state.hello,
    authStore.$state.name,
)
```
* 查看`storage`中保存的`pinia-key`数据**如果配置了key则是对应的数据**
```json
{
    authUser: { name: "matias"}
}
```
`custom properties`和`state properties`中的数据并没有保存下来。对`pinia`中的数据做一次更改则可查看到数据
```json
{
    authUser: { name: "matias", hello: "hello pinia"}
    pinia-custom-key: {userId: "data", simpleNumber: 100}
}
```
* 可以自己写一个插件，或者把其他会更新状态的插件放到使用`matias-pinia-persisted-state`该插件之后，将更快保存`custom properties`和`state properties`中的数据。
```ts
const userID = ref('000001')
const hello = ref('hello pinia')
// 自定义基础插件，更新状态
export function myPiniaPlugin(context: PiniaPluginContext) {
    context.store.userId = userID
    context.store.simpleNumber = 100
    context.store.$state.hello = hello
}
```
```ts
// pinia状态管理
import { createPinia } from 'pinia'
import { myPiniaPlugin } from '@/pinia/plugin'
import { createPersistedState, persistedConfig } from 'matias-pinia-persisted-state'

const app = createApp(App)

// pinia
const pinia = createPinia()

// 便捷使用
pinia.use(createPersistedState)
// 查看默认配置
console.log(persistedConfig)
// 有状态更新的插件
pinia.use(myPiniaPlugin)

app.use(pinia)
```
将最最开始就执行一次更新
```json
{
    authUser: { name: "matias", hello: "hello pinia"}
    pinia-custom-key: {userId: "data", simpleNumber: 100}
}
```
## 版本

### 0.2.0

* 添加`custom properties`的缓存
* 移除`state`中必须包含`stateName`属性的限制，使用`store id`来保存对应的`store`
* 更新丰富配置项

### 0.1.8

* fix
  
1. `store.$subscribe`添加`detached:true`。

### 0.1.7

1. `state`没有`stateName`属性添加提示。

### 0.1.6

* 开启代码压缩

### 0.1.5

* 目录结构调整

### 0.1.4

* 更新类型文件导出

### 0.1.3

* 更新`package.json`的导出目录

### 0.1.2

* 更新目录结构及名称

### 0.1.1

* 添加类型声明文件

### 0.1.0

* 实现基本的本地持久化功能