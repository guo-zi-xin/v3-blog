import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'

interface RouteRecordMeta {
  hidden?: boolean;
  icon?: Component
  title?: string;
}

/**
 * Omit
 * Omit<T key>
 * @description Omit 是一个工具类型，用于忽略某些属性，返回一个新的对象类型
 */

// @ts-expect-error
export interface RouteRecord extends Omit<RouteRecordRaw, 'meta'> {
  name?: string;
  meta?: RouteRecordMeta;
  children?: RouteRecord[]
}
