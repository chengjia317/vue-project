import axios from '@/utils/axios'
/**
 * 用户登录
 * @param {Object} 登录信息
 * 短信登录
 * {"phone": "13313123456", "captcha": "123456"}
 */
export function login (data) {
  return axios({
    url: `/api/users/login`,
    method: 'post',
    data: data
  })
}

/**
 * 获取登录用户资料
 */
export function getProfile () {
  return axios({
    url: `/api/users/profile`,
    method: 'get',
  })
}
