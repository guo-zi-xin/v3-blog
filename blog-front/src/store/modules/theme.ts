import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key
  storageKey: 'changeTheme',
  // 暗黑class名字
  valueDark: 'dark',
  // 亮色class名字
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

export const useThemeStore = defineStore('theme', () => {
  const themeChange = ref(isDark.value)

  const switchMainTheme = () => {
    toggleDark()
    themeChange.value =  isDark.value
  }
  return { themeChange, switchMainTheme }
})
