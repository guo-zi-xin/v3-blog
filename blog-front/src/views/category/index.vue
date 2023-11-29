<script setup lang="ts">
import {useCounterStore} from "@/store/modules/counter"
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <div class="card">
    <n-button type="primary" @click="counterStore.increment">count is {{ counterStore.count }}</n-button>
  </div>
    <router-link to="/home">Go to Home</router-link>
  </div>
</template>

<style scoped lang="scss">
</style>

