<template>
  <div>
    <div v-show="show">
      <div class="mask"></div>
      <div class="wrapper">
        <div class="header">
          <h2>{{title}}</h2>
          <i @click="handleClose" class="op-icon-close"></i>
        </div>
        <div class="content">
          
            <div class="address-wrapper">
              <!-- 存在地址 -->
              <template v-if="addresses">
                <router-link :to="{path: '/my/address', query: {mode: 'select'}}" class="flex-sb">
                  <div class="address-info">
                    <div class="user">
                      <span class="name">{{addresses.recipient}}</span>
                      <span>{{addresses.phone}}</span>
                    </div>
                    <div class="address">{{addresses.provinceName}}{{addresses.cityName}}{{addresses.areaName}} {{addresses.address}}</div>
                  </div>
                  <i class="op-icon-arrow"></i>
                </router-link>
              </template>
              <!-- 未存在地址 -->
              <router-link to="/my/address/edit" v-if="!addresses" class="no-data" tag="div">暂无地址，点击添加地址</router-link>
              
              <i class="icon-address-border"></i>
            </div>

          <!-- 现金券-[单个商品|订阅]时渲染 -->
          <div v-if="discount" class="discount-wrapper flex-sb">
            <span>现金券</span>
            <div class="discount">
              <template v-for="(item, index) in discountConfirmList">
                <span v-if="item.isSelected" :key="index"  class="icon-discount">{{item.value | toDecimal0}}元现金券</span>
              </template>
            </div>

            <div v-if="discount.length" class="discount-count" @click="$emit('discountOpen')">
              <span>{{discount.length}}张可用</span>
              <i class="op-icon-arrow"></i>
            </div>

            <div v-else class="discount-count">暂无可用现金券</div>
          </div>

          <!-- 数量-单个商品时渲染 -->
          <div  v-if="path !== '/subscribe'" class="goods-wrapper">
            <div class="flex-sb">
              <div class="cover"><img :src="details.coverImage" alt=""></div>
              <div class="info">
                <div class="name">{{details.name}} {{details.subTitle}}</div>
                <!-- 若为会员|无会员价则展示会员价 -->
                <div v-if="!profile.vip || !details.isVipPrice" class="price">¥<span style="font-size:18px">{{details.price | pointBefore}}</span>.{{details.price | pointAfter}}</div>
                <div v-else class="price">¥<span style="font-size:18px">{{details.vipPrice | pointBefore}}</span>.{{details.vipPrice | pointAfter}}</div>
              </div>
            </div>
            <div class="count-wrapper flex-sb">
              <span>购买数量</span>
              <stepper v-model="details.count" @change="countChange"></stepper>
            </div>
          </div>

          <div class="tips-wrapper">
            <span class="tips">邮费说明：</span>
            <span v-if="path === '/subscribe'">由于这几个地区地理位置较远，目前我们实在无法承担邮费，订阅会员价格会有所调整：新疆、西藏为250元/年，内蒙、青海、甘肃、宁夏、海南为210元/年。</span>
            <span v-else>由于这几个地区地理位置较远，额外收取邮费：新疆、西藏20元，内蒙、青海、甘肃、宁夏、海南10元。其他地区包邮。</span>
          </div>

          <div class="btn-wrapper">
            <button class="op-btn op-btn-price">¥<span style="font-size:24px">{{moneyNeedPay | pointBefore}}</span>.{{moneyNeedPay | pointAfter}}</button>
            <button class="op-btn op-btn-buy" @click="handlePay">立即支付</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stepper from '@/components/stepper'
import {createOrder, createSubscribe, createPayOrder, createPaySubscribes} from '@/api/order'
import {wechatPay} from '@/api/wechat'

export default {
  components: {
    stepper,
  },

  props: {
    /**
     * 弹窗显隐
     */
    show: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      path: this.$route.path,
      orderInfo: {}, // 订单详情
    }
  },

  computed: {
    // 弹窗标题
    title: function () {
      return this.path === '/subscribe' ? '选择地址' : '填写订单'
    },

    // 获取当前地址
    addresses () {
      if (this.show) {
        const addressList = this.$store.state.address.dataList
        const token = this.$store.state.account.token
        if (!addressList.length && token) {
          this.$store.dispatch('getAddresses')
        }
        var result = addressList.find(item => {
          return item.id === this.$store.state.address.selectedId
        })
        return result || ''
      } else {
        return ''
      }
    },

    details () {
      return this.$store.state.goods.details
    },

    // 获取全部可用现金券
    discount () {
      return this.$store.state.discount.dataList
    },

    // 获取选中的可用现金券
    discountConfirmList () {
      return this.$store.state.discount.confirmList
    },

    profile () {
      return this.$store.state.account.profile
    },

    moneyNeedPay () {
      let price
      // 订阅商品
      if (this.path === '/subscribe') {
        price = 15000
      } else {
        // 单件商品 |（会员且为会员价时显示会员价）
        let itemPrice = this.profile.vip && this.details.isVipPrice ? this.details.vipPrice : this.details.price
        price = itemPrice * this.details.count
      }
      this.discountConfirmList.forEach(item => {
        if (item.isSelected) {
          price = price - item.value
        }
      })
      if (price < 0) {
        price = 0
      }
      return price
    }
  },

  created () {
    if (this.$store.state.account.token) {
      this.$store.dispatch('getDiscountData')
    }
  },

  methods: {
    /**
     * 发起订阅
     * @return 订单详情
     */
    async createSubscribe () {
      let subscribeForm = {
        'type': "NORMAL",
        'addressId': this.addresses.id,
        'couponFlowIds': this.$store.getters.confirmListIds
      }
      this.$op.loading()
      const orderDetails = await createSubscribe(subscribeForm)
      this.orderInfo = {
        'addressId': this.addresses.id, // 收货地址
      }
      return orderDetails
    },

    /**
     * 发起单件商品订单
     * @return 订单详情
     */
    async createOrder () {
      const propertyValue = this.details.property.values.find(item => {
        return item.check
      })
      this.orderInfo = {
        'id': this.details.id,
        'items': [{
          'itemId': this.details.id,
            'propertyValueId': propertyValue.id,
            'count': this.details.count
        }], // 属性
        'addressId': this.addresses.id, // 收货地址
        'couponFlowIds': this.$store.getters.confirmListIds, // 现金券
      }
      
      this.$op.loading()
      console.log('orderInfo', this.orderInfo)
      const orderDetails = await createOrder(this.orderInfo)
      console.log('orderDetails', orderDetails)
      return orderDetails
    },

    /**
     * 创建订单
     */
    async handlePay () {
      let orderDetails = {}

      if (!this.addresses) {
        this.$toast('请先添加地址')
        return
      }

      // 创建订单
      if (this.path === '/subscribe') { // 订阅
        orderDetails = await this.createSubscribe()
      } else { // 单件商品
        orderDetails = await this.createOrder()
      }
      console.log('orderDetails', orderDetails)
      this.$emit('update:show', false)
      this.$toast.clear()

      // 发起微信支付
      this.$op.isWeChatApplet().then(async res => {
        let data = {}

        if (this.path === '/subscribe') { // 订阅
          data = await createPaySubscribes(orderDetails.id)
        } else {
          data = await createPayOrder(orderDetails.id)
        }
        let redirect = '' // 支付成功后重定向地址
        if (this.path === '/subscribe') { // 订阅
          redirect = '/my/subscribe'
        } else { // 单件商品
          redirect = '/my/order/4'
        }


        // 支付金额 = 0元
        if (data === '') {
          this.$toast('下单成功')
          this.$router.push(redirect)
          return
        }
        // 支付金额 > 0元
        if (!res) {
          // 微信环境
          wechatPay({
            ...data,
            debug: false,
            success: () => {
              this.$toast('支付成功')
              this.$router.push(redirect)
            }
          })
        } else {
          // 小程序环境
          let payParams = encodeURIComponent(JSON.stringify(data))
          wx.miniProgram.navigateTo({url: `/pages/payment/payment?params=${payParams}&redirect=${redirect}`})
        }
      })
    },

    handleClose () {
      this.$emit('update:show', false)
    },

    countChange () {
      const details = Object.assign({}, this.details)
      this.$store.commit('ADD_GOODS', details)
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-wrapper {
  font-size: 12px;
}
.tips {
  color: #0E948A;
  font-weight: bold;
}
.address-info {
  flex: 1;
  .address {
    margin-bottom: 0;
  }
}
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 16px 68px;
  background: #FFF;
  z-index: 11;
}
.header {
  position: relative;
  padding: 0 30px;
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  text-align: center;
  .op-icon-close {
    position: absolute;
    top: 6px;
    right: 0;
  }
}
.content {
  padding: 20px 0;
}
.op-btn-text {
  margin-right: -10px;
  width: 50px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #0E948A;
  border: 1px solid #0E948A;
  border-radius: 2px;
}
@mixin base {
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10);
  border-radius: 2px;
}
// 地址
.address-wrapper {
  padding: 15px;
  position: relative;
  @include base;
  .op-icon-arrow {
    margin-left: 24px;
  }
  .user {
    font-size: 18px;
  }
}

.icon-address-border {
  position: absolute;
  left: 0;
  bottom: 0;
  display: inline-block;
  width: 100%;
  height: 3px;
  background: url('../../assets/image/icon_address_border.png');
  background-size: cover;
}

// 现金券
.discount-wrapper {
  margin: 10px 0;
  padding: 15px 10px 15px 15px;
  @include base;
  .discount {
    flex: 1;
    flex-wrap: wrap;
  }
  .discount > span {
    display: inline-block;
    margin-left: 10px;
    color: #0E948A;
  }
  .discount-count {
    font-size: 12px;
    color: #9B9B9B;
  }
  .op-icon-arrow {
    margin-left: 10px;
  }
}

// 商品
.goods-wrapper {
  margin: 10px 0;
  padding: 15px;
  @include base;
  .info {
    flex: 1;
    font-family: PingFangSC-Semibold;
  }
  .cover {
    margin-right: 10px;
    width: 75px;
    height: 75px;;
  }
  .name {
    margin-bottom: 10px;
    
    font-size: 15px;
  }
  .price {
    color: #0E948A;
  }
  .count-wrapper {
    margin-top: 18px;
  }
}
// 按钮
.btn-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  box-shadow: 0 -1px 0 0 rgba(0,0,0,0.05);
  .op-btn {
    height: 58px;
    color: #fff;
    border-radius: 0;
  }
  .op-btn-price {
    width: 125px;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #000;
    background: #fff;
  }
  .op-btn-buy {
    flex: 1;
    font-size: 17px;
    background: #0E948A;
    &:disabled {
      background: rgba($color: #0E948A, $alpha: .6)
    }
  }
}
</style>
