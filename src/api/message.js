import axios from '@/util/axios'

// 获取消息列表
export function getMessages() {
  return axios({
    url: `/api/messages`,
    method: 'get',
  })
}

// 判断有无新消息
export function getNewMessages() {
  return axios({
    url: `/api/messages/new`,
    method: 'get',
  })
}
