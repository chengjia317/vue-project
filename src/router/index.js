import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// 路由数据
import routes from './frame'
import {Toast} from 'vant'

import {getWechatApiConfig} from '@/api/wechat'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
})

// 验证目标路由是否需要权限验证
router.beforeEach(async (to, from, next) => {
  // 微信分享
  try {
    const wxConfigRouterNames = ['index', 'invite', 'supply_details', 'subscribe', 'my_order']
    
    // 邀请朋友
    if (wxConfigRouterNames.indexOf(to.name) > -1) {
      console.log('get wechat config')
      const isIOS = function() {
        var isIphone = navigator.userAgent.includes('iPhone')
        var isIpad = navigator.userAgent.includes('iPad')
        return isIphone || isIpad
      }
      if (!isIOS() || !Vue.prototype.$wx_config) {
        console.log('start get wechat config')
        let url = window.location.href
        if (!isIOS()) { // 安卓取未来的页面
          url = `${window.location.origin}${to.fullPath}`
        }
        const config = await getWechatApiConfig(url)
        config.debug = false
        console.log('config', config)
        config.jsApiList = [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseWXPay',
        ]
        Vue.prototype.$wx_config = config
      }
    }
  } catch (e) {
    console.log(e)
  }

  // 存储邀请用户id
  if (to.query.inviterId) {
    store.dispatch('setInviterId', to.query.inviterId)
  }

  if (to.query.code) {
    await store.dispatch('wechatLogin', to.query.code)
    await store.dispatch('getProfile')
    next()
  }

  if (to.matched.some(r => r.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      // 未登录跳转到登录
      Toast({
        message: '您暂未登录，请授权登录',
        duration: 2000
      })
      next({
        name: 'my',
        params: {redirect: from.fullPath},
        replace: true
      })
    }
  } else {
    // 不需要身份校验直接通过
    next()
  }
})
export default router