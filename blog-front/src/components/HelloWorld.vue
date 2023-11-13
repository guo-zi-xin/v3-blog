<script setup lang="ts">
import { NButton } from 'naive-ui'
import {defineComponent} from 'vue'
defineProps<{ msg: string }>()
defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
 <n-button>naive-ui</n-button>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
