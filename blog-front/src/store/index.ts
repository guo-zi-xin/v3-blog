import { defineStore } from "pinia";
import {_decrypt, _encrypt } from '@/utils/encipher'

export const user = defineStore('user', {
  // persist: {
  //   strategies:[
  //     {
  //       key: "userState", //给一个要保存的名称
  //       storage: localStorage, //sessionStorage / localStorage 存储方式
  //     }
  //   ],
  //   enabled: true, // 开启持久化
  // },
  state: () => {
    return {
      blogAvater: '', // 当前登录用户头像
      token: '',
      userInfo: {}, // 当前登录人信息
      infoFlag: false, // 是否显示个人信息
      tokenFlag: false // 是否显示登录弹窗
    }
  },
  getters: {
    // 获取当前登录用户头像
    getBlogAvater(): string {
      return this.blogAvater
    },
    // 获取当前登录人信息
    getUserInfo(): string {
      return this.infoFlag ? JSON.parse(_decrypt(this.userInfo)): ''
    },
    // 获取token
    getToken(): string {
      return this.tokenFlag ? _decrypt(this.token) : "";
    }
  },

  // actions 
  actions: {
    // 设置头像
    setBlogAvatar(avatar: string) {
      this.blogAvater = avatar
    },
    // 设置用户信息
    setUserInfo(info: string) {
      this.infoFlag = true
      this.userInfo = _encrypt(info)
    },
    // 设置token
    setToken(token: string) {
      this.tokenFlag = true
      this.token = _encrypt(token)
    },
    // 清除用户信息
    clearUserInfo() {
      this.userInfo = {}
      this.token = ''
      this.tokenFlag = false
      this.infoFlag = false
    }
  },
})