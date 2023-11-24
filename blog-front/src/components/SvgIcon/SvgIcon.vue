<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon',
})
type IconSize = 'default' | 'small' | 'large' | number;
// (string & {}) 交叉类型，表示 string 类型，但是可以有任意属性
type IconColor = |'primary'| 'default'| 'success'| 'warning'| 'error'| (string & {});

// 在 TypeScript 中，Record 是一个通用的类型工具，用于创建一个由指定属性类型组成的对象类型。
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

const props = withDefaults(
  defineProps<{
    /** icon 的前缀 */
    prefix?: string;
    /** icon 名称 */
    name?: string;
    /** icon 颜色 */
    color?: IconColor;
    /** icon 大小 */
    size?: IconSize;
  }>(),
  {
    prefix: '#icon-',
    size: 'default',
    color: 'default',
  }
)
// Record 是Typescript一个内置的类型工具 可以不用定义声明
const sizeMap: Record<IconSize, number> = {
  default: 16,
  small: 12,
  large: 24,
}

const colorMap: Record<IconColor, string>= {
  primary: '#409Eff',
  success: '#67C23A',
  error: '#bb1b1b',
  warning: '#F56c6C',
  default: '#333333',
}

const colorRef = computed(() => {
  return colorMap[props.color] || props.color
})

const sizeRef = computed(() => {
  if (typeof props.size === 'string') {
    return sizeMap[props.size] || sizeMap.default
  }
  return props.size
})
</script>

<style>
  .svg-icon-wrapper {
    display: inline-block;
    fill: currentColor;
  }
</style>

<template>
 <svg
  :style="{width: `${sizeRef}px`, height: `${sizeRef}px`, color: colorRef}"
  class="svg-icon-wrapper"
 >
  <use :xlink:href="`${props.prefix}${props.name}`" :fill="colorRef"></use>
 </svg>
</template>