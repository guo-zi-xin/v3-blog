import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

import {
  ApiResponse,
  ExpandAxiosRequestConfig,
  ExpandAxiosResponse,
  ExpandInternalAxiosRequestConfig,
} from './types'

const errorStartMap = new Map([
  [400, '请求方式错误'],
  [401, '请重新登录'],
  [403, '禁止访问'],
  [404, '请求地址不存在'],
  [500, '服务器错误']
])



const errorHandler = (err:any) => {
  if (err.config?.requestOptions.showLoading) {

  }
  if (err.config?.requestOptions.showErrorMessage) {
    const message: string = errorStartMap.get(err.response.status)|| '请求出错，请稍后再试。';
    handleErrorMessage(message)
  }
  return Promise.reject(err)
}

const handleErrorMessage = (errorMessage:string) => {

}

const successCode:number = 1

export class AxiosRequest {
  private defaultConfig: ExpandAxiosRequestConfig = {
    // 请求超时时间
    timeout: 6 * 10 * 1000,
    requestOptions: {
      showLoading: true,
      showErrorMessage: true,
      transform: true
    },
  };

  private axiosInstance: AxiosInstance;

  public constructor(config: ExpandAxiosRequestConfig = {}) {
    const axiosConfig = Object.assign(this.defaultConfig, config);
    this.axiosInstance = axios.create(axiosConfig);
    this.interceptRequest();
    this.interceptResponse();
  }

  /**
   * @title 通用请求方法
   */

  public request<D,R>(config:ExpandAxiosRequestConfig<D>): Promise<AxiosResponse<R>> {
    return this.axiosInstance.request(config)
  }

  /**
   * @title get请求
   */
  public get<D, R>(url: string, config:ExpandAxiosRequestConfig<D> = {}):Promise<R> {
    let requestOptions = config.requestOptions
    if (requestOptions) {
      requestOptions.transform = true
      config.requestOptions = requestOptions;
    }
    return this.axiosInstance.get(url,config)
  }

  /**
   * @title get请求
   */

  public getNoTaansRes<D, R>(url: string, config: ExpandAxiosRequestConfig<D>  = {}): Promise<ApiResponse<R>> {
    let requestOptions = config.requestOptions || {}
    if (requestOptions) {
      requestOptions = {}
    }
    requestOptions.transform = false
    config.requestOptions = requestOptions;
    return this.axiosInstance.get(url, config)
  }

  /**
   * @title post 请求
   */
  public post<D, R> (url: string, config: ExpandAxiosRequestConfig<D> = {}, data?:D): Promise<R> {
    let requestOptions = config.requestOptions
    if (requestOptions) {
      requestOptions.transform = true
      config.requestOptions = requestOptions;
    }
    return this.axiosInstance.post(url, data, config)
  }

  /**
   * @title post 请求
   */
  public postNoTransRes<D, R>(url: string, data?: D, config: ExpandAxiosRequestConfig<D> = {}): Promise<ApiResponse<R>> {
    let requestOptions = config.requestOptions || {}
    if (requestOptions) {
      requestOptions = {}
    }
    requestOptions.transform = false
    config.requestOptions = requestOptions;
    return this.axiosInstance.post(url, data, config)
  }

  private interceptRequest(): void {
    this.axiosInstance.interceptors.request.use(
      async (config: ExpandInternalAxiosRequestConfig) => {
        // loading加载
        if (config.requestOptions?.showLoading) {

        }
        // hook 
        if (config.interceptorHooks?.beforeRequestCallback) {
          config.interceptorHooks.beforeRequestCallback(config)
        }
        return config;
      },
      errorHandler
    )
  }

  private interceptResponse(): void {
    this.axiosInstance.interceptors.response.use(
      async (response:ExpandAxiosResponse): Promise<any> => {
        // loading加载
        if (response.config.requestOptions?.showLoading) {

        }
        // hook
        if (response.config.interceptorHooks?.beforeResponseCallback) {
          response.config.interceptorHooks.beforeResponseCallback(response)
        }
        // transform data
        if (!response.config.requestOptions?.transform) {
          return response
        }
        const { code, message, data } = response.data

        if (code === successCode) {
          return data
        } else {
          if (response.config.requestOptions?.showErrorMessage) {
            handleErrorMessage(message)
          }
        }
        return Promise.reject(response.data)
      },
      errorHandler
    )
  }
}