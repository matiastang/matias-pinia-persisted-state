<!--
 * @Author: matiastang
 * @Date: 2021-12-13 10:12:56
 * @LastEditors: matiastang
 * @LastEditTime: 2022-03-31 16:25:17
 * @FilePath: /matias-pinia-persisted-state/src/views/NotFound.vue
 * @Description: 404页面
-->
<template>
    <div class="not-found">
        <div class="text">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const text = ref('404')
</script>

<style lang="scss" scoped>
.not-found {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: fontSize(14px);
        color: black;
        line-height: 20px;
        text-align: center;
    }
}
</style>
