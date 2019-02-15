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
import {createPayOrder, closeOrder} from '@/api/order'
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
  },

    index: {
      type: Number,
      required: true
    }
  },
  
  data () {
    return {
    }
  },

  methods: {
    handleCancel () {
      this.$dialog.confirm({
        message: '确认取消订单?'
      }).then(async () => {
        this.$op.loading()
        await closeOrder(this.data.id)
        this.$emit('success', this.index, 'CLOSED')
        this.$toast('取消订单成功')
      }).catch(() => {
        // on cancel
      })

    },

    handlePay () {
      // 发起微信支付
      this.$op.isWeChatApplet().then(async res => {
        if (!res) {
          // 微信环境
          const data = await createPayOrder(this.data.id)

          wechatPay({
            ...data,
            debug: false,
            success: () => {
              this.$toast('支付成功')
              this.$emit('success', this.index, 'PAID')
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
