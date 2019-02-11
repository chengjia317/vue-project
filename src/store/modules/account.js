import {login, getProfile} from '@/api/account.js'
import {wechatLogin} from '@/api/wechat'
import { Toast } from 'vant'

export default {
  state: {
    token: localStorage.getItem('token') || '',
    profile: localStorage.getItem('profile') || {}, // 个人信息
    inviterId: Number(localStorage.getItem('inviterId')) || '', // 邀请用户
  },

  mutations: {
    LOGIN (state, data) {
      localStorage.setItem('token', data)
      state.token = data
    },
    
    GET_PROFILE (state, data) {
      localStorage.setItem('profile', JSON.stringify(data))
      state.profile = data
    },

    SET_INVITERID (state, inviterId) {
      localStorage.setItem('inviterId', inviterId)
      state.inviterId = Number(inviterId)
    }
  },

  actions: {
    login ({commit}, data) {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '登录中...'
      })
      return login(data).then(res => {
        commit('LOGIN', res)
        Toast({
          message: '登录成功',
          duration: 2000
        })
      })
    },

    wechatLogin ({commit}, code) {
      return wechatLogin(code).then(res => {
        commit('LOGIN', res)
      })
    },

    getProfile ({commit}) {
      return getProfile().then(res => {
        commit('GET_PROFILE', res)
      })
    },

    setInviterId ({commit}, inviterId) {
      commit('SET_INVITERID', inviterId)
    }
  }
}