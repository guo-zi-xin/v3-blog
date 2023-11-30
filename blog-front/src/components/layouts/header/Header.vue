<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useMenu } from "@/composable/useMenu";
import { WeatherSunnyLow24Regular, WeatherMoon16Regular } from '@vicons/fluent'
import { useThemeStore } from '@/store/modules/theme'
import { MENU_MAP } from '../config'
import AvatarLogo from '@/assets/image/logo.jpg'
import type { Ref } from 'vue'

type HeaderState = {
  drawerShow: boolean;
  startScrollTop: number;
  headerClass: string;
  activeIndex: number;
}

const headerState: HeaderState = reactive({
  drawerShow: false,
  startScrollTop: 0,
  headerClass: "",
  activeIndex: 0,
})

const { switchMainTheme } = useThemeStore()
const { menuOptions, currentMenu } = useMenu();

//菜单顺序排序
const xMenuOptions = menuOptions.value.map(item => { return { ...item, xIndex: MENU_MAP.get(item.key as string) } }).sort((a, b) => a.xIndex! - b.xIndex!);

// 主题切换开关
const switchActive: Ref<boolean> = ref<boolean>(false);

const handleThemeChange = (value: boolean) => {
  switchActive.value = value
  switchMainTheme()
}

// 顶部滚动
const scroll = (): void => {
  let scrollTop: number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const { startScrollTop } = headerState
  if (scrollTop <= 60) {
    headerState.headerClass = 'fixed-header';
    headerState.startScrollTop = scrollTop;
    return
  }
  if (startScrollTop > scrollTop) {
    headerState.headerClass = "fixed-header";
  } else if (startScrollTop <= scrollTop) {
    headerState.headerClass = "hide-header";
  }
  headerState.startScrollTop = scrollTop;
}

onMounted(() => {
  // 页面监听滚动事件
  window.addEventListener('scroll', scroll)
})

</script>

<template>
  <div class="header-box" :class="headerState.headerClass">
    <div class="header-box-menu">
      <n-menu mode="horizontal" :options="xMenuOptions" :value="currentMenu"/>
    </div>

    <div mr-10 flex flex-row justify-start class="header-box_-perate">
      <!-- 主题开关 -->
      <n-switch v-model:value="switchActive" @update:value="handleThemeChange" size="large">
        <template #checked-icon>
          <n-icon :component="WeatherMoon16Regular" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="WeatherSunnyLow24Regular" />
        </template>
      </n-switch>
      <!-- 头像 -->
      <n-avatar ml-6 cursor-pointer round size="small" :src="AvatarLogo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--n-color);
  opacity: 0.7;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 1;
  &-menu {
    display: flex;
  }
  &-operate {
    padding: 0
  }
}

.hide-header {
  animation-name: hideHeader;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.fixed-header {
  animation-name: header;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes header {
  0% {
    transform: translateY(-52px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes hideHeader {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-52px);
  }
}
</style>