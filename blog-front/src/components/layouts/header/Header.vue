<script lang="ts" setup>
import { ref } from 'vue'
import { useMenu } from "@/composables/useMenu";


const menuMap = new Map(
  [
    ['首页', 1],
    ['分类', 2],
  ]
)
const { menuOptions, currentMenu } = useMenu();
/**
 * 菜单顺序排序
 */
const xMenuOptions = menuOptions.value.map(item => {
  return { ...item, xIndex: menuMap.get(item.key as string) }
}).sort((a, b) => a.xIndex! - b.xIndex!);

// 主题切换开关
const switchActive = ref(false);
</script>

<template>
  <div class="header_box">
    <div>
      <n-menu mode="horizontal" :options="xMenuOptions" :value="currentMenu"></n-menu>
    </div>
    <div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.header_box {
  width: calc(100% - 80px);
  height: 60px;
  margin-top: 30px;
  margin-left: calc(40px - 50%);
  background: linear-gradient(45deg, transparent, #fff 4px);
  background-size: 6px 6px;
  backdrop-filter: saturate(50%) blur(4px);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 10;
}
</style>