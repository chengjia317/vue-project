import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Toast } from 'vant'
import {utils} from './index'

axios.defaults.timeout = 6000

axios.interceptors.request.use(async (config) => {
  let Authorization = store.state.account.token
  if (Authorization) {
    config.headers.Authorization = 'Bearer ' + Authorization
  }
  const isWeapp = await utils.isWeChatApplet()
  if (isWeapp) {
    config.headers.from = 'weapp'
  } else {
    config.headers.from = 'h5'
  }
  
  return config
}, function (error) {
  Toast(error)
  console.error(error)
  return Promise.reject(error)
})


axios.interceptors.response.use(res => {
  let data = res.data
  if (data.code && data.code === 200) {
    return typeof data.data !== 'undefined' ? data.data : ''
  } else if (data.code && data.code !== 200) {
    return Promise.reject(res)
  } else {
    return data
  }
}, err => {
  if(err.request.readyState == 4 && err.request.status == 0){
    Toast('请求超时，请稍后访问')
  }
  if (err && err.response) {
    if (err.response.status === 401) {
      store.dispatch('logout')
      Toast({
        message: '您暂未登录，请重新授权登录',
        duration: 2000
      })
      router.push({
        name: 'my',
        params: {redirect: window.location.href}
      })
    } else if (err.response.status === 403) {
      Toast('您暂时没有权限访问')
    } else if (err.response.status === 502) {
      Toast('服务器暂时处于维护阶段，请稍后访问')
    } else {
      if (err.response.data) {
        Toast(err.response.data.msg)
      } else {
        Toast('暂时无法访问')
      }
    }
  }
  console.error(err)
  return Promise.reject(err)
})

export default axios
