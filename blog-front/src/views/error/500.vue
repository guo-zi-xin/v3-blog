<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const timeRef = ref<number>(10)

// 在404页面十秒后，自动跳转到首页
const { pause } = useIntervalFn(() => {
  if (timeRef.value > 1) {
    timeRef.value--
  } else {
    pause()
    router.push('/')
  }
}, 1000)

// 返回首页

const handleCancel = (): void => {
  router.push('/')
}
</script>

<template>
  <div class="flex h-full flex-col items-center mt-20">
    <n-result status="500" title="500 服务器错误" description="服务器出错可能说明该雇更多程序员了">
      <template #footer>
        <n-button @click="handleCancel">散财消灾</n-button>
      </template>
    </n-result>
  </div>
</template>

<style lang="scss" scoped></style>