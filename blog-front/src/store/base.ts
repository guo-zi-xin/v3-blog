import { ref } from 'vue'
import { defineStore } from "pinia";

export type Theme = 'light' | 'dark' | 'auto'


export const useBaseInfo = defineStore('base', () => {
  const theme = ref<Theme>('auto')

  // 设置主题色
  const setTheme = (themes: Theme) => {
    theme.value = themes
    console.log('store',themes)
  }
  return {
    theme,
    setTheme,
  }
})