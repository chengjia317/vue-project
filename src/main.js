import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import store from './store'


// UI组件
import {Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar).use(TabbarItem)

import { Swipe, SwipeItem } from 'vant'
Vue.use(Swipe).use(SwipeItem)

import { Toast, Dialog } from 'vant'
Vue.use(Toast).use(Dialog)

import { Area } from 'vant'
Vue.use(Area)

import { List } from 'vant'
Vue.use(List)

import { Tab, Tabs } from 'vant'
Vue.use(Tab).use(Tabs)

// 公共方法
import utils from '@/utils'
Vue.use(utils)

import commonComponent from '@/components/'
Vue.use(commonComponent)

// 过滤器
import filters from '@/utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
