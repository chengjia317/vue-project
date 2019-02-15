import filters from './filters'
import validate from './validate'
import { Toast } from 'vant'

export let utils = {
  /**
   * @description: 格式化查询数据
   */
  'formatSearchData': (search) => {
    for (const key in search) {
      if (search[key] === '' || search[key] === null) {
        delete search[key]
      }
      if (search[key] instanceof Date) {
        search[key] = search[key].valueOf()
      }
    }
    return search
  },

  'loading': (msg = '加载中...') => {
    Toast.loading({
      type: 'loading',
      message: msg,
      duration: 0
    })
  },

  /**
   * 判断环境是否为小程序
   * @return true: 小程序环境 false: 微信环境
   */
  'isWeChatApplet': () => {
    const ua = window.navigator.userAgent.toLowerCase()
    return new Promise((resolve) => {
      if (ua.indexOf('micromessenger') == -1) { // 不在微信或者小程序中
        resolve(false)
      } else {
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) { // 小程序
            resolve(true)
          } else { // 在微信中
            resolve(false)
          }
        })
      }
    })
  },
}

function install (Vue) {
  Vue.prototype.$op = {
    ...utils,
    filters, // 格式化
    validate, // 校验
  }
}

export default install