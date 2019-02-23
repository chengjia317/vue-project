import dayjs from 'dayjs'

function toDecimal2 (x) {
  var f = parseFloat(x)
  if (isNaN(f) || f === 0) {
    return 0
  }
  var fn = Math.round(x * 100) / 10000
  var s = fn.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

export default {
  // 格式化金钱
  'toDecimal2': toDecimal2,
  /**
   * 格式化现金券
   * 3000 -> 30
   * 3003 -> 30.03
   */
  'toDecimal0': (x) => {
    let price = toDecimal2(x)
    if(price % 1 === 0) {
      price = parseInt(price)
    }
    return price
    // return (x / 100).toFixed()
  },
  /**
   * 截取价格小数点前
   * 10.20 => 10
   */
  'pointBefore': (x) => {
    let price = toDecimal2(x).toString()
    if (price) {
      return price.split('.')[0]
    }
  },
  /**
   * 截取价格小数点后
   * 10.20 => 20
   */
  'pointAfter': (x) => {
    let price = toDecimal2(x).toString()
    if (price) {
      return price.split('.')[1] || '00'
    }
  },

  'formatPhone': (phone) => {
    return phone.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
  },

  'formatDate': (date) => {
    if (typeof date === 'undefined') {
      return '暂无'
    } else {
      return dayjs(date).format('YYYY-MM-DD')
    }
  },

  'formatDatePoint': (date) => {
    if (typeof date === 'undefined') {
      return '暂无'
    } else {
      return dayjs(date).format('YYYY.MM.DD')
    }
  },
  
  /**
   * 订阅商品
   * @param {Boolean}:  true: 已发货 | false: 未发货
   * @param {String}:  WAIT: 待付款 | PAID: 待发货 | DELIVERED: 待收货 | FINISH: 已完成 | CLOSED: 已关闭
   */
  'formatOrderStatus': (status) => {
    if (typeof status === 'boolean') {
      return status ? '已发货' : '待发货'
    } else {
      let result = ''
      switch (status) {
        case 'WAIT':
          result = '待付款'
          break;
        case 'PAID':
          result = '待发货'
          break;
        case 'DELIVERED':
          result = '待收货'
          break;
        case 'FINISH':
          result = '已完成'
          break;
        case 'CLOSED':
          result = '已关闭'
          break;
        default:
          result = ''
          break;
      }
      return result
    }
  },

  /**
   * 快递公司
   * @param {String}:  SHUNFENG: 顺丰 | SHENTONG: 申通 | YUANTONG: 圆通 | YUNDA: 韵达 | ZHONGTONG: 中通 | ZHAIJISONG: 宅急送 | SUER: 速尔物流 | TIANTIAN: 天天快递
   */
  'formatExpressCompany': (status) => {
    let result = ''
    switch (status) {
      case 'SHUNFENG':
        result = '顺丰'
        break;
      case 'SHENTONG':
        result = '申通'
        break;
      case 'YUANTONG':
        result = '圆通'
        break;
      case 'YUNDA':
        result = '韵达'
        break;
      case 'ZHONGTONG':
        result = '中通'
        break;
      case 'ZHAIJISONG':
        result = '宅急送'
        break;
      case 'SUER':
        result = '速尔物流'
        break;
      case 'TIANTIAN':
        result = '天天快递'
        break;
      default:
        result = '暂无'
        break;
    }
    return result
  },
}