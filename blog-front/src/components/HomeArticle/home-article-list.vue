<script lang=ts setup>
</script>

<template>
  <div>
    <n-card rounded-lg  title="带封面的卡片" hoverable>
      <template #cover>
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
      </template>
      卡片内容
    </n-card>
  </div>
</template>

<style lang="scss" scoped>
.n-card {
  max-width: 300px;
  img {
    transform: scale(1.0);
    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
}
</style>