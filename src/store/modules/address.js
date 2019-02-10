// 地址数据
import Vue from 'vue'
import * as addressApi from '@/api/address.js'
import { Toast } from 'vant'
import { Dialog } from 'vant'

export  default {
  state:{
    dataList:JSON.parse(localStorage.getItem('address')) ||[
      { id:0,
        name:'瑾忆',
        tel:15245092178,
        add:'北京西城区内环到二环里 北京市西城区长安大街51号天字一号北门'}],
    selectedId:Number(localStorage.getItem('addressSelectedId'))||0
  },
  getters:{
    'addressList':state=>{
      return state.dataList
    }
  },
  mutations:{
    SET_ADDRESS(state,data){
      state.dataList=data
      if(!state.selectedId){
        state.selectedId=data[0].id
      }
      localStorage.setItem('address',JSON.stringify(state.dataList))
      localStorage.setItem('addressSelectedId', state.selectedId)
    },
    DELETE_ADDRESS(state,id,index){
      state.dataList.splice(index,1)
      if(state.dataList.length&&id===state.selectedId){
        state.selectedId=state.dataList[0].id
      }else{
        state.selectedId=0
      }
      localStorage.setItem('address', JSON.stringify(state.dataList))
      localStorage.setItem('addressSelectedId', state.selectedId)
    },
    SELECT_ADDRESS(state,id){
      state.selectedId=id
      localStorage.setItem('addressSelectedId',state.selectedId)
    }
  },
  actions:{
    async getAddresses({commit}){
      Toast.loading('加载中')
      const data=await addressApi.getAddress()
      if(data.length){
        commit('SET_ADDRESS',data)
      }
      Toast.clear()
    },
    async deleteAddress({commit}){
      Dialog.confirm({
        message:'确定删除该地址吗？'
      }).then(async()=>{
        const data=await addressApi.deleteAddress(id)
        Toast('删除成功')
        commit('DELETE_ADDRESS',id,index)
      }).catch(()=>{})
    }
  }
}
