<!--
 * @Author: matiastang
 * @Date: 2022-03-31 15:28:39
 * @LastEditors: matiastang
 * @LastEditTime: 2022-11-16 18:12:38
 * @FilePath: /matias-pinia-persisted-state/src/views/index.vue
 * @Description: 框架测试
-->
<template>
    <div @click="clickAction">{{ `testInputText=${testInputText}` }}</div>
    <input v-model="testInputText" @change="inputChange" />
    <div @click="clickAction">{{ `inputText=${inputText}` }}</div>
    <input v-model="inputText" @change="inputChange" />
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import { useAuthUserStore } from '@/pinia/useAuthUserStore'
import { useTestStore } from '@/pinia/useTest'

const authStore = useAuthUserStore()
// console.log(authStore)
const testStore = useTestStore()
// console.log(testStore)
console.log(
    authStore.simpleNumber,
    authStore.userId,
    authStore.$state.hello,
    testStore.simpleNumber,
    testStore.userId,
    testStore.$state.hello
)

const testInputText = ref(testStore.$state.data)
watch(
    () => testInputText.value,
    (newValue, oldValue) => {
        console.log(newValue)
        testStore.$state.data = newValue
        testStore.userId = newValue
    }
)

const inputText = ref(authStore.$state.name)
watch(
    () => inputText.value,
    (newValue, oldValue) => {
        console.log(newValue)
        authStore.$state.name = newValue
        authStore.$state.user.name = newValue
        authStore.userId = newValue
    }
)
watch(
    () => authStore.$state.name,
    (newValue, oldValue) => {
        console.log(`name newValue=${newValue}`)
        console.log(`name oldValue=${oldValue}`)
    }
)
const inputChange = (payload: Event) => {
    console.log(payload)
}

const dataList = authStore.$state.user

const clickAction = () => {
    dataList.list.push({
        code: `code${dataList.list.length}`,
        name: 'name',
    })
}
</script>
<style lang="scss" scoped></style>
