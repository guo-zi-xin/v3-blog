import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useBaseInfo } from '@/store/base'


export const useTheme = () => {
  const baseStore = useBaseInfo()

  const OsTheme = useOsTheme()
  const { theme } = storeToRefs(baseStore)
  // 是否为暗色
  const isDark = computed(() => {
    if (theme.value === 'auto')
      return OsTheme.value === 'dark'
    else
      return theme.value === 'dark'
  })

  // 主题色
  const hasTheme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (isDark.value) {
      return {
        common: {}
      }
    }
    return {}
  })

  watch(() => isDark.value, (val) => {
    if (val) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, { immediate: true })

  return { hasTheme, themeOverrides }
}


