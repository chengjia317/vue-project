
//import Vue from 'vue'
import * as addressApi from '@/api/address.js'
import { Toast } from 'vant'
import { Dialog } from 'vant'

export default {
  state: {
    dataList: JSON.parse(localStorage.getItem('address')) || [],
    selectedId: Number(localStorage.getItem('addressSelectedId')) || 0
  },

  getters: {
    'addressList': state => {
      return state.dataList
    }
  },

  mutations: {
    SET_ADDRESS (state, data) {
      state.dataList = data
      if (!state.selectedId) {
        state.selectedId = data[0].id
      }
      localStorage.setItem('address', JSON.stringify(state.dataList))
      localStorage.setItem('addressSelectedId', state.selectedId)
    },

    DETETE_ADDRESS (state, id, index) {
      state.dataList.splice(index, 1)
      if (state.dataList.length && id === state.selectedId) {
          state.selectedId = state.dataList[0].id
      } else {
        state.selectedId = 0
      }
      localStorage.setItem('address', JSON.stringify(state.dataList))
      localStorage.setItem('addressSelectedId', state.selectedId)
    },
    
    SELECTE_ADDRESS (state, id) {
      state.selectedId = id
      localStorage.setItem('addressSelectedId', state.selectedId)
    }
  },

  actions: {
    async getAddresses ({commit}) {
      Toast.loading('加载中...')
      const data = await addressApi.getAddresses()
      if (data.length) {
        commit('SET_ADDRESS', data)
      }
      Toast.clear()
    },

    deleteAddress ({commit}, id, index) {
      Dialog.confirm({
        message: '确定要删除该地址吗？'
      }).then(async () => {
      //  const data = await addressApi.deleteAddresses(id)
        Toast('删除成功')
        commit('DETETE_ADDRESS',id, index)
      }).catch(() => {})
    }

  }
}