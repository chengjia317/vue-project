// 优惠券数据
import Vue from 'vue'
import {getCoupons} from '@/api/coupons'

export  default {
  state:{
    dataList:[
      {id:0,price:30},
      {id:1,price:60}
    ]
  },
  getters:{
    'discountList':state=>{
      state.dataList.forEach(item=>{
        item.isSelected=false
      })
      return state.dataList
    }
  },
  mutations:{
    DISCOUNT_SELECTED(state,index){
      state.dataList.forEach(item=>{
        item.isSelected=false
      })
      Vue.set(state.dataList[index],`isSeleted`,true)
    },
    DISCOUNT_CANCEL(state,index){
      Vue.set(state.dataList[index],`isSeleted`,false)
    }
  },
  actions:{
    async getDiscountData({state}){
      const data=await getCoupons('UNUSED')
      data.forEach(item=>{
        item.isSelected=false
      })
      state.dataList=data
    }
  }
}
