<script setup lang="ts">
import {  reactive } from "vue";

type MenuOption = {
  name: string;
  index?: number;
  children?: MenuOption[];
}
const menuOptions = reactive<MenuOption[]>([
  { name: '首页' },
  { name: '分类', children: [
    {name: '生活'},
  ] }
])
</script>

<template>
  <div class="main-header">
    {{menuOptions}}
    <div class="main-header-menu">
      <SvgIcon name="home" color="success" size="large"></SvgIcon>
      <SvgIcon name="" color="success" size="small"></SvgIcon>
    <SvgIcon name="address" color="error" :size="30"></SvgIcon>
    </div>
    <div class="main-header-operate"></div>

  </div>
</template>

<style scoped lang="scss">
.main-header {
  margin: 1.25rem auto;
  max-width: 1200px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>