import Vue from 'vue'
import {getCoupons} from '@/api/coupons'

export default {
  state: {
    dataList: [],
  },

  getters: {
    'discountList': state => {
      state.dataList.forEach(item => {
        item.isSelected = false
      })
      return state.dataList
    }
  },

  mutations: {
    DISCOUNT_SELECTED (state, index) {
      // 优惠券不可叠加
      state.dataList.forEach(item => {
        item.isSelected = false
      })

      Vue.set(state.dataList[index], `isSelected`, true)
    },
    
    DISCOUNT_CANCEL (state, index) {
      Vue.set(state.dataList[index], `isSelected`, false)
    }
  },

  actions: {
    async getDiscountData ({state}) {
      const data = await getCoupons('UNUSED')
      // const data = [
      //   {
      //       "id": 1,
      //       "name": "优惠券1",
      //       "introduce": "",
      //       "value": 100,
      //       "type": "CASH",
      //       "fulfill": 1000,
      //       "startTime": 1547631335000,
      //       "endTime": 1547651335000,
      //       "createAt": 1547634668000,
      //       "status": "UNUSED"
      //   },
      //   {
      //     "id": 2,
      //     "name": "优惠券1",
      //     "introduce": "",
      //     "value": 300,
      //     "type": "CASH",
      //     "fulfill": 1000,
      //     "startTime": 1547631335000,
      //     "endTime": 1547651335000,
      //     "createAt": 1547634668000,
      //     "status": "UNUSED"
      // }]
      // console.log('UNUSED', data)
      data.forEach(item => {
        item.isSelected = false
      })
      state.dataList = data
    }
  }
}