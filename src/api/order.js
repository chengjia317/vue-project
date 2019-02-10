import axios from '@/util/axios'

// 创建订单
export function createOrder(data) {
  return axios({
    url: `/api/orders`,
    method: 'post',
    data: data
  })
}

// 发起微信支付-订单
export function createPayOrder(id) {
  return axios({
    url: `/api/wechat/pay/orders/${id}`,
    method: 'post',
  })
}

// 发起微信支付-订阅
export function createPaySubscribes(id) {
  return axios({
    url: `/api/wechat/pay/subscribes/${id}`,
    method: 'post',
  })
}

/**
 * 获取订单列表
 * @param {String} status:  WAIT: 待付款 | PAID: 代发货 | DELIVERED: 待收货 | FINISH: 已完成
 * @param {Number} page
 * @param {Number} size
 */
export function getOrders(params) {
  return axios({
    url: `/api/orders`,
    method: 'get',
    params: params
  })
}

// 获取订单详情
export function getOrderDetails(id) {
  return axios({
    url: `/api/orders/${id}`,
    method: 'get',
  })
}

// 发起订阅
export function createSubscribe(data) {
  return axios({
    url: `/api/subscribes`,
    method: 'post',
    data: data
  })
}

// 获取订阅
export function getSubscribe() {
  // return [{
  //       "id": 1,
  //       "displayId": "201901221659557637",
  //       "address": {
  //           "id": 2,
  //           "recipient": "张三风",
  //           "phone": "13333333332",
  //           "provinceId": 110000,
  //           "provinceName": "北京市",
  //           "cityId": 110100,
  //           "cityName": "市辖区",
  //           "areaId": 110101,
  //           "areaName": "东城区",
  //           "address": "地址变更xxx街xxx号"
  //       },
  //       "type": "PRESENT",
  //       "startAt": 1548147597000,
  //       "endAt": 1579683597000
  //   },
  //   {
  //       "id": 2,
  //       "displayId": "2019012216580590083",
  //       "address": {
  //           "id": 2,
    //         "recipient": "张三风",
    //         "phone": "13333333332",
    //         "provinceId": 110000,
    //         "provinceName": "北京市",
    //         "cityId": 110100,
    //         "cityName": "市辖区",
    //         "areaId": 110101,
    //         "areaName": "东城区",
    //         "address": "地址变更xxx街xxx号"
    //     },
    //     "type": "NORMAL",
    //     "startAt": 1548147488000,
    //     "endAt": 1579683488000
    // }]

  return axios({
    url: `/api/subscribes`,
    method: 'get',
  })
}

// 获取订阅订单列表
export function getSubscribeOrders(id) {
  // return [
  //   {
  //       "id": 5,
  //       "period": 1,
  //       "startAt": 1548146092000,
  //       "waybill": "",
  //       "isShip": false,
  //       "createAt": 1548146743000,
  //       "displayId": "2019012216345151634"
  //   },
  //   {
  //       "id": 6,
  //       "period": 2,
  //       "startAt": 1555922092000,
  //       "waybill": "",
  //       "isShip": false,
  //       "createAt": 1548146743000,
  //       "displayId": "2019012216345151634"
  //   }]
  return axios({
    url: `/api/subscribes/${id}/orders`,
    method: 'get',
  })
}

// 获取订阅详情
export function getSubscribeDetails(id) {
  return axios({
    url: `/api/subscribes/orders/${id}`,
    method: 'get',
  })
}
