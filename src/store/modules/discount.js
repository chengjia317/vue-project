import Vue from 'vue'
import {getCoupons} from '@/api/coupons'

export default {
  state: {
    dataList: [], // 可使用的现金券对象集合
    confirmList: [],  // 确认选取的现金券对象集合
  },

  getters: {
    'discountList': state => {
      state.dataList.forEach(item => {
        item.isSelected = false
      })
      return state.dataList
    },

    // 选中现金券的id数组集合
    'confirmListIds': state => {
      const couponIds = []
      state.confirmList.find(item => {
        if (item.isSelected) {
          couponIds.push(item.id)
        }
      })
      return couponIds
    }
  },

  mutations: {
    DISCOUNT_SELECTED (state, index) {
      Vue.set(state.dataList[index], `isSelected`, true)
    },
    
    DISCOUNT_CANCEL (state, index) {
      Vue.set(state.dataList[index], `isSelected`, false)
    },

    DISCOUNT_CONFIRM (state) {
      state.confirmList = []
      state.dataList.forEach(item => {
        if (item.isSelected) {
          state.confirmList.push(item)
        }
      })
      console.log('confrim', state.confirmList)
    },

    DISCOUNT_CLEAR (state) {
      state.confirmList = []
    }
  },

  actions: {
    // 获取可用优惠券
    async getDiscountData ({state}) {
      const data = await getCoupons('UNUSED')
      console.log('UNUSED', data)
      data.forEach(item => {
        item.isSelected = false
      })
      state.dataList = data
    }
  }
}