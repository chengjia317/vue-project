<template>
  <div>
    <div class="mask"></div>
    <div class="wrapper">
      <div class="header">
        <h2 class="title">优惠券</h2>
        <i class="icon-close" @click="close"></i>
      </div>
      <div ref="content" class="content">
        <div>
          <discount-coupon v-for="(item,index) in dataList" :coupons="item" :key="item.id">
            <button @click="handleUse(index)">使用</button>
          </discount-coupon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DiscountCoupon from '@/components/Discount_coupon'

  export default {
    name: "detail_coupon",
    computed:{
      dataList(){
        return this.$store.state.discount.dataList
      }
    },
    created () {
      // 订阅无优惠券选择
      if (this.$route.path !== '/subscribe') {
        this.$store.dispatch('getDiscountData')
      }
    },
    components:{
      DiscountCoupon
    },
    created(){

    },
    methods:{
      close(){
        this.$emit('closeMask')
      },
      handleUse(index){
        this.$store.commit('DISCOUNT_SELECTED', index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.mask
  position: fixed
  width: 100%
  height: 100%
  background: rgba(0,0,0,.5)
  top:0
  left:0
  z-index: 10
.wrapper
  position: fixed
  width: 100%
  background: #ffffff
  z-index :20
  bottom:0
  left:0
  padding:30px 0 33px
  .header
    font-size: 18px
    color: #222222
    text-align: center
    position: relative
    .icon-close
      position: absolute
      right:20px
      top:0
  .content
    margin:19px 15px
    button
      width:50px
      height:24px
      background: #fff
      border: 1px solid #0E948A
      border-radius: 2px
      font-size: 12px
      color: #0E948A
      margin-right:-10px
</style>
