import axios from "axios";
import { useNotification } from 'naive-ui'
import  useUserInfo  from '@/store/user';
import router from '@/router/index'

const notification = useNotification()

// 创建一个Axios实例
const service = axios.create({
  timeout: 10000, // 请求超时时间(毫秒)
  withCredentials: true, // 请求是否允许带cookie这些
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json;charset=UTF-8',
    'x-requested-with': 'XMLHttpRequest' // 请求的类型
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // do something
    const userStore = useUserInfo();
    if (userStore.getToken) {
      Object.assign(config.headers, {
        Authorization: userStore.getToken
      })
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // do something
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios: any = response.data
    const { code, message } = dataAxios
    switch (code + '') {
      case '100':
        // 205 表示给用户一些提示信息
        notification.warning({
          content: '温馨提示',
          meta: message,
          duration: 1000,
          keepAliveOnHover: true
        })
        break;
    }
    return dataAxios
  },
  (error: any) => {
    // 超出2xx范围的状态吗都会触发该函数
    // do something
    const { status, data } = error.response
    switch (status + '') {
      case '401':
        // 401 表示登录过期，需要重新登录
        notification.error({
          content: '错误提示',
          meta: data.message || '登录过期，请重新登录',
          duration: 1000,
          keepAliveOnHover: true
        })
        router.push("/home");
        break;
      case '403':
        // 403 表示没有权限访问
        notification.error({
          content: '错误提示',
          meta: data.message || '没有权限访问',
          duration: 1000,
          keepAliveOnHover: true
        })
        break;
      case '404':
        // 404 表示访问的资源不存在
        notification.error({
          content: '错误提示',
          meta: data.message || '访问的资源不存在',
          duration: 1000,
          keepAliveOnHover: true
        })
        break;
      case '408':
        // 408 表示请求超时
        notification.error({
          content: '错误提示',
          meta: data.message || '请求超时',
          duration: 1000,
          keepAliveOnHover: true
        })
        break;
      case '500':
        // 500 表示服务器错误
        notification.error({
          content: '错误提示',
          meta: data.message || '服务器错误',
          duration: 1000,
          keepAliveOnHover: true
        })
        break;
        default:
        return;
    }
    return Promise.reject(error)
  }
)

export default service;