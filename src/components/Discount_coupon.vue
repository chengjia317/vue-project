<template>
  <div :class="['coupon',{'used':this.page===1||this.page===2}]">
    <i class="icon-used" v-if="page===1"></i>
    <div class="left">
      <i class="price">￥</i>{{coupons.price}}
    </div>
    <div class="right">
      <p :class="{'des':this.page!==0}">优惠券可用于任何一款商品会员已享受折扣不再累积</p>
      <div class="right-bottom">
        <p class="date">{{coupons.startTime}}  -  {{coupons.endTime}}</p>
        <!--按钮插槽-->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  // 0--未使用 1--已使用 2--已过期
  export default {
    name: "discount_coupon",
    props:{
      page:{//优惠券类型
        type:Number,
        default:0
      },
      coupons:{
        type:Object,
        required:true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.coupon
  height:94px
  background: url('~images/discount_unused.png')
  -webkit-background-size: cover
  background-size: cover
  display: flex
  box-shadow: 0 2px 10px -7px #000
  position: relative
  margin:10px auto
  .icon-used
    position: absolute
    top:0
    right:0
  .left
    width:100px
    margin-left:3px
    padding-top:30px
    text-align: center
    color:#ffffff
    font-size:36px
    i
      font-size:18px
      margin-right:5px
  .right
    padding: 15px 23px 14px 14px
    color: #222222
    line-height:18px
    flex:1
    font-size:12px
    .des
      color:#9B9B9B
    .right-bottom
      display:flex
      align-items:center
      justify-content:space-between
      .date
        font-size: 10px
        margin-top:9px
        color: #9B9B9B
.used
  background-image: url('~images/discount_used.png')


</style>
