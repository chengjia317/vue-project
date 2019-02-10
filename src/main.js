// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import 'styles/reset.css'

// vant组件
import { Area } from 'vant';
Vue.use(Area);

import { List } from 'vant';
Vue.use(List);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

import { Toast } from 'vant';
Vue.use(Toast);

Vue.config.productionTip = false
fastClick.attach(document.body)

// 公共方法
import util from 'util'
Vue.use(util)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
