import axios from '@/utils/axios'
import config from '@/config.js'
import Vue from 'vue'

// 获取微信配置
export function getWechatConfig () {
  return axios({
    url: `/api/common/config`,
    method: 'get',
  })
}

// 获取微信jsapi配置
export function getWechatApiConfig (url) {
  return axios({
    url: `/api/wechat/config?url=${encodeURIComponent(url)}`,
    method: 'GET'
  })
}

// 获取微信登录url
export function getWechatLogin () {
  let redirectUri = config.redirectUri
  // let redirectUri = 'http://shavedog-m.1programmer.com'
  axios({
    url: `/api/wechat/login/url`,
    method: 'get',
    params: {
      url: redirectUri
    }
  }).then(res => {
    window.location = decodeURIComponent(res)
  })
}

// 微信登录
export function wechatLogin (code, inviterId) {
  return axios({
    url: `/api/wechat/login`,
    method: 'POST',
    data: {
      code,
      inviterId
    }
  })
}

// 配置分享内容参数
export function wechatShare (data) {
  const {title, desc, link, imgUrl, success, cancel} = data
  const config = Vue.prototype.$wx_config
  if (!config) {
    return
  }

  wx.config(config)
  wx.error(function () {
    console.error('微信配置失败')
  })
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success,
      cancel
    })
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      dataUrl: '',
      success,
      cancel
    })
  })
}

// 微信支付
export function wechatPay (data) {
  const {appId, timeStamp, nonceStr, packageValue, signType, paySign, success } = data
  const config = Vue.prototype.$wx_config
  if (!config) {
    return
  }

  wx.config(config)
  wx.error(function () {
    console.error('微信配置失败')
  })
  wx.ready(function () {
    wx.chooseWXPay({
      appId,
      timestamp: timeStamp,
      nonceStr,
      package: packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign, // 支付签名
      success
    })
  })
}
