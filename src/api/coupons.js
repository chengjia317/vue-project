import axios from '@/util/axios'

/**
 * 获取我的全部优惠券
 * @param status {String} : 全部: '' | 未使用: UNUSED | 已使用: USED | 已过期: EXPIRED
 */
export function getCoupons (status = '') {
  if (status === '') {
    return axios({
      url: `/api/coupons`,
      method: 'get',
    })
  } else {
    return axios({
      url: `/api/coupons`,
      method: 'get',
      params: {
        status
      }
    })
  }
}
