import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * @title 接口通用返回参数
 * @description 接口通用返回参数
 */

export interface ApiResponse<T> {
  code: number,
  message: string,
  data: T
}

/**
 * @title 请求配置属性
 * @description 额外添加的请求配置属性
 */

export interface RequestOptions {
  // 是否显示loading
  showLoading?: boolean,
  // 是否弹窗展示异常信息
  showErrorMessage?: boolean
  // 是否进行数据转换
  transform?: boolean
}

/**
 * @title 拦截器钩子
 * @description 拦截器钩子 氛围请求之前和响应之前两个钩子
 */

export interface InterceptorHooks {
  beforeRequestCallback?: (request: ExpandAxiosRequestConfig) => void,
  beforeResponseCallback?: (response: ExpandAxiosResponse) => void
}

/**
 * @title 拓展自定义配置
 * @description axios实际请求时的一个补充，将前面封装的 RequestOptions 和 InterceptorHooks 添加上去
 */

export interface ExpandAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  interceptorHooks?:InterceptorHooks
  requestOptions?: RequestOptions
}

/**
 * @title 拓展 Axios 请求配置
 * @description axios 请求拦截器中的子类
 */

export interface ExpandInternalAxiosRequestConfig<D = any> extends InternalAxiosRequestConfig<D> {
  interceptorHooks?:InterceptorHooks
  requestOptions?: RequestOptions
}

/**
 * @title 拓展 Axios 响应配置
 * @description axios 响应拦截器中的子类
 */

export interface ExpandAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
  config: ExpandInternalAxiosRequestConfig<D>
}