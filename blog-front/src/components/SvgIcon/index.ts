import type { App } from 'vue'
import SvgIcon from './SvgIcon.vue'

/**
 * 让SvhIcon具有类型提示
 * 在全局注册
 */

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}

const SvgIconPlugin = (app: App)=> {
  app.component(SvgIcon.name, SvgIcon)
}

export { SvgIcon, SvgIconPlugin };

