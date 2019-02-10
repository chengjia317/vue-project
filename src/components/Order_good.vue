<template>
  <div class="order-good" >
    <div class="header" v-for="(good,index) in orderList" :key="index">
      <span>订单号 {{good.desId}}</span>
      <slot name="header-status"></slot>
    </div>
    <div class="content" @click="showDetail" v-for="(item,index) in orderList.items" :key="index">
      <img :src="item.item.img" alt="">
      <div class="content-des">
        <h3 class="good-name">{{item.item.name}}</h3>
        <div class="sub-des">
          <span class="sub-wrapper"><i>订阅商品</i></span>
          <span>三个月一期</span>
        </div>
      </div>
      <i class="icon-arrow"></i>
    </div>
    <!--商品总价折扣-->
    <slot name="discount"></slot>
    <div class="bottom">
      <span>合计:</span>
      <span class="price">￥<span class="price-des">49.90</span></span>
    </div>
    <!--待付款插槽-->
    <slot name="bottom-btn"></slot>
  </div>
</template>

<script>
  export default {
    name: "order_good",
    props:{
      page:{
        type:Number,
        default:0
      },
      orderList:{
        type:Object,
        required:true
      }
    },
    methods:{
      showDetail(){
        this.$router.push({name:'Order_detail',params:{id:1}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.order-good
  padding:15px
  border-radius: 4px
  overflow: hidden
  background: #fff
  margin-bottom:10px
  .header
    display: flex
    align-items: center
    justify-content:space-between
    span
      font-size: 12px
      color: #222222
  .content
    margin-top:20px
    display: flex
    position: relative
    img
      width:75px
      height:75px
    .content-des
      flex:1
      padding-right:25px
      .good-name
        margin-left: 10px
        flex:1
        font-size: 14px
        line-height: 20px
        color: #222222
      .sub-des
        margin-left:10px
        margin-top:18px
        span
          font-size: 12px
          color: #444444
        .sub-wrapper
          width:52px
          height:20px
          opacity: 0.5
          background: #0E948A
          border-radius: 2px
          display: inline-block
          line-height: 20px
          text-align: center
          margin-right: 8px
          i
            font-size: 10px
            color: #FFFFFF
    .icon-arrow
      position: absolute
      top:30px
      right:0
  .bottom
    display: flex
    justify-content:flex-end
    align-items:center
    margin-top:20px
    font-size: 12px
    color: #222222
    .price
      span
        font-size:18px

</style>
