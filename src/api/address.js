import axios from '@/util/axios'

// 获取地址列表
export function getAddresses () {
  return axios({
    url: `/api/addresses`,
    method: 'get',
  })
}

// 新增地址
export function addAddresses (data) {
  return axios({
    url: `/api/addresses`,
    method: 'post',
    data: Object.assign({
      areaId: Number(data.areaId),
      cityId: Number(data.cityId),
      provinceId: Number(data.provinceId),
    }, data)
  })
}

// 获取地址详情
export function getAddressesDetails (id) {
  return axios({
    url: `/api/addresses/${id}`,
    method: 'get',
  })
}

// 更新地址
export function editAddresses (id, data) {
  return axios({
    url: `/api/addresses/${id}`,
    method: 'put',
    data: data
  })
}

// 删除地址
export function deleteAddresses (id) {
  return axios({
    url: `/api/addresses/${id}`,
    method: 'delete',
  })
}

// 获取省市县
export function getDistricts () {
  return axios({
    url: `/api/common/districts`,
    method: 'get',
  })
}
