<!--
 * @Author: matiastang
 * @Date: 2021-12-13 10:12:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-04-01 10:43:56
 * @FilePath: /matias-pinia-persisted-state/README.md
 * @Description: datumwealth-vue-components
-->
# matias-pinia-persisted-state

## 说明

该项目为`pinia`状态库的本地持久化项目。

## 安装与使用

1. 安装matias-pinia-persisted-state

* `pnpm`导入
> $ pnpm add -D matias-pinia-persisted-state
* `yarn`导入
> $ yarn add -D matias-pinia-persisted-state
* `npm`导入
> $ npm install -D matias-pinia-persisted-state

1. 引用

两种引入方式如下（以`DwWechatLogin`组件举例）：
* 单个组件引入
```ts
// main.ts
import { createPersistedState, PERSISTED_STATE_KEY } from '@/pinia/piniaPersistedState'

// pinia
const pinia = createPinia()
pinia.use(
    createPersistedState({
        key: 'pinia-state',
    })
)
pinia.use(myPiniaPlugin)

app.use(pinia)

```
* `PERSISTED_STATE_KEY`为本地持久化的`key`.默认是`pinia-state`可以在`createPersistedState`方法中传递自定义的`key`。

> `*.vue`文件中使用

## 版本

### 0.1.3

* 更新`package.json`的导出目录

### 0.1.2

* 更新目录结构及名称

### 0.1.1

* 添加类似声明文件

### 0.1.0

* 实现基本的本地持久化功能