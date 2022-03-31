<!--
 * @Author: matiastang
 * @Date: 2022-03-31 15:28:39
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-31 15:39:39
 * @FilePath: /matias-pinia-persisted-state/src/views/index.vue
 * @Description: 框架测试
-->
<template>
    <div>框架测试</div>
    <input v-model="inputText" @change="inputChange" />
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import { useAuthUserStore } from '@/pinia/useAuthUserStore'
import { useTestStore } from '@/pinia/useTest'

const authStore = useAuthUserStore()
console.log(authStore)
const testStore = useTestStore()
console.log(testStore)

const inputText = ref(authStore.$state.name)
watch(
    () => inputText.value,
    (newValue, oldValue) => {
        console.log(newValue)
        authStore.$state.name = newValue
        authStore.$state.user.name = newValue
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
</script>
<style lang="scss" scoped></style>
