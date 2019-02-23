<template>
  <div>
    <com-tab-title title="订阅详情"></com-tab-title>
    <div class="wrapper">
      <div class="status-wrapper flex-sb">
        <span class="status">{{orderDetails.isShip | formatOrderStatus}}</span>
        <div class="status-icon">
          <!-- 待发货 -->
          <img v-if="!orderDetails.isShip" src="../../../assets/image/icon_my_deliver_big.png" alt="">
          <!-- 已发货 -->
          <img v-if="orderDetails.isShip" src="../../../assets/image/icon_my_receive_big.png" alt="">
        </div>
      </div>

      <subscribeGoods :data="orderDetails" class="goods">
        <div slot="header-right">创建时间 {{orderDetails.createAt | formatDate}}</div>
        <div slot="discount" class="discount">
          <div class="flex-sb">
            <span>商品总价</span>
            <span>¥{{15000 | toDecimal2}}</span>
          </div>
        </div>
      </subscribeGoods>

      <div class="details-wrapper">
        <!-- <div class="periods-wrapper flex-sb" @click="periodsShow = true">
          <span>查看每期详情</span>
          <div class="periods">
            <span>剩余5期</span>
            <i class="op-icon-arrow"></i>
          </div>
        </div> -->

        <div v-if="orderDetails.address" class="address-wrapper flex-sb">
          <i class="op-icon-address"></i>
          <div class="address-content">
            <div class="flex-sb">
              <span>收货人：{{orderDetails.address.recipient}}</span>
              <span>{{orderDetails.address.phone}}</span>
            </div>
            <div class="address">收货地址：{{addressName}}</div>
          </div>
        </div>

        <div class="date-wrapper flex-sb">
          <span>快递公司</span>
          <span>{{orderDetails.expressCompany | formatExpressCompany}}</span>
        </div>
        <div class="date-wrapper flex-sb">
          <span>快递单号</span>
          <span>{{orderDetails.waybill || '暂无'}}</span>
        </div>
        <div class="date-wrapper flex-sb">
          <span>发货时间</span>
          <span>{{orderDetails.startAt | formatDate}}</span>
        </div>
      </div>

      <button class="op-btn" @click="handelService">联系客服</button>
    </div>
    <!-- 查看每期详情 -->
    <periods-details :show.sync="periodsShow"></periods-details>
  </div>
</template>

<script>
import subscribeGoods from '@/components/subscribeGoods'
import periodsDetails from '@/components/periodsDetails'
import {getSubscribeDetails} from '@/api/order'
export default {
  components: {
    subscribeGoods,
    periodsDetails
  },

  data () {
    return {
      id: Number(this.$route.params.id),
      periodsShow: false,
      orderDetails: {}
    }
  },

  computed: {
    addressName: function () {
      const address = this.orderDetails.address
      return `${address.provinceName}${address.cityName}${address.areaName}${address.address}`
    },

    profile: function () {
      return this.$store.state.account.profile
    }
  },

  created () {
    this.getSubscribeDetails()
  },

  methods: {
    async getSubscribeDetails () {
      this.$op.loading()
      this.orderDetails = await getSubscribeDetails(this.id)
      console.log('subscribe details', this.orderDetails)
      this.$toast.clear()
    },

    handelService () {
      this.$op.isWeChatApplet().then(res => {
        if (!res) {
          // 微信环境
          _MEIQIA('showPanel')
          _MEIQIA('metadata', {
            orderId: this.id,
            userId: this.profile.id,
            vip: this.profile.vip,
            name: this.profile.nickname,
            tel: this.profile.phone,
          })
        } else {
          wx.miniProgram.navigateTo({url: '/pages/service/service'})
        }
      }).catch(err => {
        console.error(err)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 50px;
  background: rgb(246, 248, 249);
}
.status-wrapper {
  padding: 0 60px 0 40px;
  width: 100%;
  height: 88px;
  color: #fff;
  background: #0E948A;
  .status {
    font-size: 20px;
  }
  .status-icon {
    width: 49px;
  }
}
@mixin base {
  padding: 14px 20px;
}
.details-wrapper {
  margin: 10px 0;
  background: #fff;
  .periods-wrapper {
    font-size: 15px;
    @include base;
    .periods {
      font-size: 12px;
      color: #0E948A;
      .op-icon-arrow {
        margin-left: 10px;
      }
    }
  }

  .address-wrapper {
    border-bottom: 1px solid #E6EAEE;
    @include base;
    .address {
      margin-top: 6px;
    }
  }

  .date-wrapper {
    @include base;
  }
}
.address-content {
  flex: 1;
  margin-left: 21px;
}

.goods {
  margin: 10px 0;
  .discount {
    margin-bottom: 12px;
    line-height: 24px;
    color: #9B9B9B;
  }
  & /deep/ .price-wapper {
    .price-unit {
      color: #0E948A;
    }
    .price {
      color: #0E948A;
    }
  }
}

// 联系客服
.op-btn {
  padding: 0 20px;
  width: 100%;
  font-size: 15px;
  color: #000;
  text-align: left;
}
</style>
