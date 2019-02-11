import Vue from 'vue'
import Vuex from 'vuex'
import discount from './modules/discount'
import account from './modules/account'
import address from './modules/address'
import goods from './modules/goods'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    discount,
    account,
    address,
    goods
  }
})
