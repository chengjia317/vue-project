<template>
  <div class="order-detail">
    <back :backtitle="toptitle"> </back>
    <div class="header">
      <span>待发货</span>
      <i class="icon-order-detail"></i>
    </div>
    <div class="middle-part">
      <div class="each-detail" @click="eachShow">
        <span>查看每期详情</span>
        <span class="look-up">剩余五期 <i class="icon-arrow"></i></span>
      </div>
      <div class="address">
        <div class="img-wrapper"><i class="icon-list4"></i></div>
        <div class="user">
          <div class="user-info">
            <div class="user-name">收货人：王蓬絮</div>
            <div class="user-tel">18888888</div>
          </div>
          <div class="user-add">收货地址：北京西城区内环到二环里北京市西城区长安大街51号天字一号北门</div>
        </div>
      </div>
      <div class="time">
        <span>配送时间</span>
        <span class="last-time">预计12月15日送到</span>
      </div>
    </div>
    <!--商品组件-->
    <order-good :orderList="orderDetails">
      <div slot="header-status" class="header-status">创建时间 2018-12-06</div>
      <div slot="discount" class="discount">
        <div class="goods-price">
          <span>商品总价</span>
          <span>￥49.9</span>
        </div>
        <div class="goods-price">
          <span>优惠券抵扣</span>
          <span>-￥10.9</span>
        </div>
      </div>
    </order-good>
    <div class="contact">
      联系客服
    </div>
    <detail-each v-show="showEach"></detail-each>
  </div>
</template>

<script>
  import Back from '@/components/Back'
  import OrderGood from '../../components/Order_good.vue'
  import DetailEach from '@/components/Detail_each'

  export default {
    name: "order-detail",
    components:{
      Back,
      OrderGood,
      DetailEach
    },
    data(){
      return{
        toptitle:'订单详情',
        showEach:false,
        orderDetails:{
          desId:['SD20181217562355'],
          items:[
            {id:0,img:require('./../../assets/images/order-img.png'),name:'Shavedog茬狗手动剃须刀豪华套装 茬狗经典款1刀架+6刀头'},
            {id:1,img:require('./../../assets/images/order-img.png'),name:'Shavedog茬狗手动剃须刀豪华套装 茬狗经典款1刀架+6刀头'}

          ]
        }
      }
    },
    methods:{
      eachShow(){
       this.showEach=true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.order-detail
  background-color: #E6EAEE
.header
  width: 100%
  height:88px
  background: #0E948A
  display: flex
  align-items:center
  justify-content: space-between
  font-size: 20px
  color: #FFFFFF
  span
    margin-left:40px
  .icon-order-detail
    margin-right:60px
.middle-part
  background-color: #fff
  padding: 0 20px 0 15px
  margin-bottom:10px
  .each-detail
    display: flex
    align-items: center
    justify-content: space-between
    height:50px
    span
      font-size: 15px
      color: #000000
    .look-up
      font-size: 12px
      color: #0E948A
      margin-right:10px
      .icon-arrow
        width:6px
        height:10px
        margin-left:10px
  .address
    height:100px
    display: flex
    .img-wrapper
      width:40px
      line-height:100px
      text-align: center
    .user
      margin-left:20px
      font-size: 14px
      color: #4A4A4A
      margin-top:15px
      .user-info
        display: flex
        align-items:center
        justify-content: space-between
      .user-add
        margin-top: 6px
        line-height:20px
  .time
    height:50px
    display: flex
    align-items:center
    justify-content: space-between
    font-size: 15px
    color: #000000
    .last-time
      font-size: 14px
      color: #222222
.header-status
  font-size: 12px
  color: #222222
.discount
  margin-top:20px
  font-size: 12px
  line-height: 17px
  color: #9B9B9B
.order-good /deep/.bottom span
  color:#0E948A
  .price-des
      color:#0E948A
.contact
  height:50px
  line-height:50px
  margin-top:10px
  padding-left: 15px
  background: #fff
  font-size: 15px
  color: #000000
</style>
