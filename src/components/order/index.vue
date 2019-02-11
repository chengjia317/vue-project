<template>
  <goods :data="data" :hasRouter="true">
    <div slot="header-right">
      <span class="status">{{data.status | formatOrderStatus}}</span>
    </div>
    <div v-if="data.status === 'WAIT'" slot="btn" class="flex-end">
      <button class="op-btn-text btn-cancel" @click="handleCancel">取消订单</button>
      <button class="op-btn-text btn-confirm" @click="handlePay">付款</button>
    </div>
  </goods>
</template>

<script>
import goods from '../goods'
import {createPayOrder} from '@/api/order'
import {wechatPay} from '@/api/wechat'
import wx from 'weixin-js-sdk'
export default {
  components: {
    goods
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    orderInfo: function () {
      return {
        'items': [{
          'itemId': this.data.items[0].item.id,
          'propertyValueId': this.data.items[0].item.property.id,
          'count': this.data.items[0].count
        }], // 属性
        'addressId': this.data.address.id, // 收货地址
      }
    }
  },
  
  data () {
    return {
    }
  },

  methods: {
    handleCancel () {

    },

    handlePay () {
      // 发起微信支付
      this.$op.isWeChatApplet().then(async res => {
        if (!res) {
          // 微信环境
          const data = await createPayOrder(this.data.id)

          wechatPay({
            ...data,
            debug: true,
            success: () => {
              this.$toast('支付成功')
            }
          })
        } else {
          // 小程序环境
          wx.miniProgram.postMessage({
            data: { 'type': 'pay' } 
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.op-btn-text {
  padding: 0 9px;
}
.status {
  font-size: 14px;
  color: #0E948A;
}
.btn-confirm {
  padding: 0 16px;
  margin-left: 10px;
  color: #0E948A;
  border: 1px solid #0E948A;
}
</style>
