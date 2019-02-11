import axios from '@/utils/axios'

// 获取商品分类列表
export function getCategories() {
  return axios({
    url: `/api/categories`,
    method: 'get',
  })
}

// 获取商品列表
export function getGoods(params) {
  return axios({
    url: `/api/items`,
    method: 'get',
    params: params
  })
}

// 获取商品详情
export function getGoodsDetails(id) {
  return axios({
    url: `/api/items/${id}`,
    method: 'get',
  })
}