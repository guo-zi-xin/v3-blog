import { reactive, toRefs } from 'vue'
import { defineStore } from "pinia";
import { _decrypt, _encrypt } from '@/utils/encipher'

const useUserInfo = defineStore('user', () => {
  const state = reactive({
    blogAvater: '', // 当前登录用户头像
    token: '',
    userInfo: {}, // 当前登录人信息
    infoFlag: false, // 是否显示个人信息
    tokenFlag: false, // 是否显示登录弹窗
  })
  // 获取当前登录用户头像
  const getBlogAvater = (): string => {
    return state.blogAvater
  }
  // 获取当前登录人信息
  const getUserInfo = (): string => {
    return state.infoFlag ? JSON.parse(_decrypt(state.userInfo)) : ''
  }

  // 获取token
  const getToken = (): string => {
    return state.tokenFlag ? _decrypt(state.token) : "";
  }
  // 设置头像
  const setBlogAvatar = (avatar: string) => {
    state.blogAvater = avatar
  }
  // 设置用户信息
  const setUserInfo = (info: string) => {
    state.infoFlag = true
    state.userInfo = _encrypt(info)
  }
  // 设置token
  const setToken = (token: string): void => {
    state.tokenFlag = true
    state.token = _encrypt(token)
  }
  // 清除用户信息
  const clearUserInfo = (): void => {
    state.userInfo = {}
    state.token = ''
    state.tokenFlag = false
    state.infoFlag = false
  }
  return {
    ...toRefs(state),
    getBlogAvater,
    getUserInfo,
    getToken,
    setBlogAvatar,
    setUserInfo,
    setToken,
    clearUserInfo
  }
})

export default useUserInfo