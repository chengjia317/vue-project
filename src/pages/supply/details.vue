<template>
  <div>
    <com-tab-title title="商品详情"></com-tab-title>

    <div class="wrapper">
      <div v-if="goodsDetails">
        <van-swipe class="banner" :autoplay="5000" indicator-color="white">
          <van-swipe-item v-for="(banner, index) in goodsDetails.bannerImages" :key="index">
            <img :src="banner" alt="">
          </van-swipe-item>
        </van-swipe>
        <div class="details">
          <h1 class="goods-name">{{goodsDetails.name}} {{goodsDetails.subTitle}}</h1>
          
          <div class="details-item">
            <span class="price"><i>¥</i>{{goodsDetails.price | pointBefore}}.<i>{{goodsDetails.price | pointAfter}}</i></span>
            <span class="op-tag"><i class="font-10">会员价¥{{goodsDetails.vipPrice | toDecimal2}}</i></span>
          </div>

          <div class="details-item">
            <span class="name">现金券</span>
            <div class="value" style="margin: 0 -0.1rem -0.1rem 0">
              <template v-for="(item, index) in discountConfirmList">
                <span v-if="item.isSelected" :key="index"  class="icon-discount">¥{{item.value | toDecimal0}}现金券</span>
              </template>
            </div>

            <div v-if="discountList.length" class="discount-count" @click="discountShow = true">
              {{discountList.length}}张可用
              <i class="op-icon-arrow"></i>
            </div>
            <div v-else class="discount-count">暂无可用现金券</div>
          </div>

          <!-- 属性 -->
          <div class="details-item" v-if="goodsDetails.property">
            <span class="name">{{goodsDetails.property.name}}</span>
            <div class="value">
              <label v-for="(item, index) in goodsDetails.property.values" :key="index">
                <span :class="['op-btn-check', {'active' : item.check}]" @click="changeProperty(index)">{{item.name}}</span>
              </label>
            </div>
          </div>

          <div class="details-item">
            <span class="name">数量</span>
            <stepper v-model="goodsDetails.count" @change="countChange"></stepper>
          </div>

          <div class="goods-details">
            <div class="goods-header">
              <h3 class="title">商品详情</h3>
              <div class="sub-title font-10">PRODUCT DETAILS</div>
            </div>
            <div v-html="goodsDetails.introduce"></div>
          </div>
        </div>

      </div>
    </div>
    <div class="btn-wrapper">
      <!-- 用户非会员 -->
      <router-link v-if="!profile.vip" tag="button" class="op-btn op-btn-vip" :to="{name: 'subscribe', params: {operation: 'renew'}}">
        <i class="op-icon-vip"></i>成为会员享受优惠
      </router-link>

      <!-- 会员用户 -->
      <router-link v-else to="/my" tag="button" class="op-btn op-btn-vip">查看我的会员</router-link>

      <button class="op-btn op-btn-buy" @click="handleBuy">
        <i class="op-icon-buy"></i>立即购买
      </button>
    </div>

    <!-- 可用现金券列表 -->
    <discount-details :show.sync="discountShow"></discount-details>

    <!-- 填写订单 -->
    <order-details :show.sync="orderShow" @discountOpen="discountShow = true"></order-details>
  </div>  
</template>

<script>
import stepper from '@/components/stepper'
import discountDetails from '@/components/discountDetails'
import orderDetails from '@/components/orderDetails'
import BScroll from 'better-scroll'
import {getGoodsDetails} from '@/api/goods'
export default {
  components: {
    stepper,
    discountDetails,
    orderDetails
  },

  data () {
    return {
      id: Number(this.$route.params.id),
      orderShow: false,
      discountShow: false,
      goodsDetails: {},
    }
  },

  computed: {
    discountList () {
      return this.$store.state.discount.dataList
    },

    discountConfirmList () {
      return this.$store.state.discount.confirmList
    },
    
    profile () {
      return this.$store.state.account.profile
    }

  },

  // 清空选中的现金券信息
  beforeRouteLeave (to, from, next) {
    this.$store.commit("DISCOUNT_CLEAR")
    next()
  },

  created () {
    if (this.id === 0) {
      this.orderShow = true
    }
    this.initForm()
  },

  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.wrapper', {
        click: true,
        mouseWheel: true
      })
    })
  },

  methods: {
    async initForm () {
      this.$op.loading()
      const data = await getGoodsDetails(this.id)
      this.$toast.clear()
      this.goodsDetails = data
      this.goodsDetails.count = 1

      this.goodsDetails.property.values.forEach(item => {
        item.check = false
      })
      this.$set(this.goodsDetails.property.values[0], 'check', true)
      console.log('goods details', data)
    },

    changeProperty (index) {
      const data = Object.assign({}, this.goodsDetails)
      data.property.values.forEach(item => {
        item.check = false
      })
      this.$set(data.property.values[index], 'check', true)
      this.goodsDetails = data
    },

    handleBuy () {
      const details = Object.assign({}, this.goodsDetails)
      this.$store.commit('ADD_GOODS', details)
      this.orderShow = true
    },

    countChange () {
      const details = Object.assign({}, this.goodsDetails)
      this.$store.commit('ADD_GOODS', details)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
}
.color-radio {
  display: inline-block;
  margin-right: 12px;
  width: 24px;
  height: 24px;
}
.color-radio.active {
  border: 2px solid #fff;
}



.value {
  flex: 1;
}
.banner {
  width: 100%;
  height: 375px;
  .van-swipe-item {
    height: 375px;
    background: #333;
  }
}
.details {
  padding: 20px 20px 50px;
  background: #fff;
  .goods-name {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
  }
  .price {
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #0E948A;
    i {
      margin-right: 4px;
      font-size: 14px;
    }
  }
  .op-tag {
    margin-left: 10px;
  }
}

.details-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed rgba($color: #000, $alpha: .05);
  .name {
    width: 46px;
    font-size: 12px;
  }

}
// 现金券
.icon-discount {
  display: inline-block;
  margin: 0 0.1rem 0.1rem 0;
  height: 21px;
  line-height: 21px;
  padding: 0 8px;
  font-size: 12px;
  color: #fff;
  background: url('../../assets/image/bg_discount_small.png');
  background-size: cover;
}
.op-icon-arrow {
  margin-left: 13px;
}
.discount-count {
  font-size: 12px;
  color: #9B9B9B;
}
// 商品详情
.goods-details {
  padding: 30px 0;
  .goods-header {
    margin-bottom: 23px;
    text-align: center;
    font-family: FZQKBYSJW--GB1-0;
  }
  .title {
    font-size: 20px;
  }
  .sub-title {
    color: #C5C5C5;
  }
}
.btn-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  .op-btn {
    flex: 1;
    color: #fff;
    border-radius: 0;
  }
  .op-btn-vip {
    background: #444;
    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.05);
  }
  .op-icon-vip, .op-icon-buy {
    margin-right: 10px;
  }
  .op-btn-buy {
    font-size: 17px;
    background: #0E948A;
  }
}
</style>
