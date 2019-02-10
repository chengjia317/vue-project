<template>
  <div>
    <back :backtitle="toptitle"> </back>
    <div class="wrapper">
      <van-swipe :autoplay="5000" indicator-color="white" class="swiper">
        <van-swipe-item v-for="(swiperImg,index) in goodsDetail.SwiperImgs" :key="index" >
          <img :src="swiperImg" alt="">
        </van-swipe-item>
      </van-swipe>
      <div class="detail-part">
        <h1>{{goodsDetail.name}}</h1>
        <p class="remain">库存：{{goodsDetail.num}}</p>
        <div class="detail-list">
          <span class="price">￥<i>{{goodsDetail.price}}</i></span>
          <span class="vip"><i>会员价¥{{goodsDetail.vipprice}}</i></span>
        </div>
        <div class="detail-list">
          <span class="coupon">领券</span>
          <div class="coupon-bg" v-for="(item,index) in discountList" :key="index">
            <span class="coupon-num">¥{{item.value}}优惠券</span>
          </div>
          <div class="coupon-count" @click="discountShow" v-if="discountList.length">
            <span>{{discountList.length}}张可用</span>
            <i class="icon-arrow"></i>
          </div>
          <div class="coupon-count" v-else>暂无可用优惠券</div>
        </div>
        <div class="detail-list">
          <span>颜色</span>
          <label v-for="(item,index) in property" :class="{'active-color':index===property.id}" :key="index">
            <span  @click="changeColor(index)">{{item.color}}</span>
          </label>
          <span class="good-color">橙色</span>
        </div>
        <div class="detail-list">
          <span>数量</span>
          <good-count> </good-count>
        </div>
      </div>
      <div class="btn-wrapper">
        <router-link tag="button" v-if="!isvip" class="vip-btn" to="/subscribe"><i class="icon-vip"></i>成为会员享受优惠</router-link>
        <router-link tag="button" v-else class="vip-btn" to="/me"><i class="icon-vip"></i>查看我的会员</router-link>

        <button class="buy-btn" @click="orderShow"><i class="icon-cart"></i>立即购买</button>
      </div>
    </div>
    <detail-coupon v-show="showCoupon" @closeMask="closeMask"> </detail-coupon>
    <detail-order v-show="showOrder" @closeMask="closeMask"> </detail-order>
  </div>
</template>

<script>
  import Back from '@/components/Back'
  import GoodCount from '@/components/Good_count'
  import DetailCoupon from '@/components/Detail_coupon'
  import DetailOrder from '@/components/Detail_order'

  export default {
    name: "detail-supply",
    components:{
      Back,
      GoodCount,
      DetailCoupon,
      DetailOrder
    },
    data(){
      return{
        isvip:false,
        id:Number(this.$route.params.id),
        showCoupon:false,
        showOrder:false,
        toptitle:'商品详情',
        goodsDetail: {
          SwiperImgs:[
            require('./../../assets/images/subpic4.png'),
            require('./../../assets/images/subpic3.png')
          ],
          name:'Shavedog茬狗手动剃须刀豪华套装 茬狗经典款1刀架+6刀头',
          num:760,
          price:54,
          vipprice:43.20
        },
        discountList:[
          {id:0,value:10},
          {id:1,value:20}
        ],
        property:[
          {id:0,color:'红色'},
          {id:1,color:'橙色'}
        ]
      }
    },
    methods:{
      discountShow(){
        this.showCoupon=true
      },
      orderShow(){
        this.showOrder=true
      },
      closeMask(){
        this.showOrder=false
        this.showCoupon=false
      },
      changeColor(index){

      }
    },
    computed:{

    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.swiper
  height:375px
.detail-part
  padding:20px
  background-color: #fff
  h1
    font-size: 18px
    color: #222222
    line-height:25px
  .remain
    font-size: 12px
    color: #9B9B9B
    margin-top:5px
  .detail-list
    border-bottom: 1px solid rgba(0,0,0,0.05)
    height:50px
    display: flex
    align-items:center
    position: relative
    span
      font-size: 12px
      color: #222222
    .price
      font-size: 14px
      color: #0E948A
    .vip
      width:74px
      height:20px
      font-size: 10px
      color: #FFFFFF
      margin-left:6px
      text-align: center
      line-height: 20px
      opacity: 0.5
      background: #0E948A
      border-radius: 2px
    .coupon
      margin-right:26px
    .coupon-bg
      width:74px
      height:21px
      background: url('~images/bg_discount_small.png')
      -webkit-background-size: cover
      background-size: cover
      text-align: center
      line-height:21px
      margin-right:11px
      .coupon-num
        font-size: 12px
        color: #FFFFFF
    .coupon-count
      position: absolute
      right:0
      display: flex
      align-items:center
      span
        font-size: 12px
        color: #9B9B9B
      .icon-arrow
        margin-left:13px
    label
      width:40px
      height:20px
      margin-left:17px
      background: #fff
      line-height:20px
      text-align: center
      border: 1px solid #0e948a
      span
        color:#0e948a
    .active-color
      background: #0e948a
    .good-color
      position: absolute
      right:0
    .good-count
      margin-left:17px
.btn-wrapper
  display: flex
  align-items: center
  button
    width:50%
    height:58px
    font-size: 14px
    color: #FFFFFF
    i
      margin-right:10px
  .vip-btn
    background: #444444
    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.05)
    flex:1
  .buy-btn
    background: #0E948A
</style>
