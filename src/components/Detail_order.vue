<template>
 <div>
   <div class="mask"></div>
   <div class="wrapper">
     <div class="header">
       <h2 class="title">{{title}}</h2>
       <i class="icon-close" @click="close"></i>
     </div>
     <div class="content">
       <div class="address-part">
         <!--存在情况-->
         <template v-if="address">
           <router-link :to="{path:'/me/address',query:{mode:'select'}}" class="user"><!--ch-->
             <div class="user-info">
               <p class="user-name">{{address.name}}</p>
               <p class="user-tel">{{address.tel}}</p>
             </div>
             <div class="user-add">{{address.add}}</div>
           </router-link>
         </template>
         <router-link to="/me/address/edit" tag="div" class="no-add" v-if="!address">暂无地址，点击添加地址</router-link>
         <i class="icon-address"></i>
       </div>
       <!--优惠券部分-->
       <div class="discount-part" v-if="path!=='/subscribe'">
         <p class="coupon">优惠券</p>
         <div class="value ellipsis" v-for="(item,index) in discount" :key="index">
           <p>{{item.price}}元代金券</p>
         </div>
         <div class="discount-info" @click="couponShow" v-if="discount.length">
           <span>{{discount.length}}张可用</span>
           <i class="icon-arrow"></i>
         </div>
         <div v-else class="discount-info discount-no">暂无可用优惠券</div>
       </div>
       <!--订单详情-->
       <div class="goods-part" v-if="path!=='/subscribe'">
         <div class="goods-header">
           <div class="img-wrapper">
             <img src="~images/order-img.png" alt="">
           </div>
           <div class="goods-des">
             <p class="goods-name">{{good.name}}</p>
             <p class="goods-price"  v-if="profile.vip">￥<span>{{good.vipPrice}}</span></p>
             <p class="goods-price" v-else>￥<span>{{good.price}}</span></p>
           </div>
         </div>
         <div class="goods-bottom">
           <span>购买数量</span>
           <good-count v-model="good.num" @changeCount="count"> </good-count>
         </div>
       </div>
     </div>
     <div class="btn-wrapper">
       <button class="btn-price">￥<span>{{allPrice}}</span></button>
       <button class="btn-pay">立即支付</button>
     </div>
   </div>
   <detail-coupon v-show="showCoupon"> </detail-coupon>
 </div>
</template>

<script>
  import GoodCount from '@/components/Good_count'
  import DetailCoupon from '@/components/Detail_coupon'

  export default {
    name: "detail_order",
    data(){
      return{
        path:this.$route.path,
        showCoupon:false
      }
    },
    components:{
      GoodCount,
      DetailCoupon
    },
    computed:{
      title(){
        return this.path==='/subscribe'?'选择地址':'填写订单'
      },
      address(){
        const addressList=this.$store.state.address.dataList;
        if(!addressList.length){
          this.$store.dispatch('getAddress')
        }
        var result=addressList.find(item=>{
          return item.id===this.$store.state.address.selectedId
        })
        return result||''
      },
      good(){
        return this.$store.state.good.good
      },
      discount(){
        return this.$store.state.discount.dataList
      },
      profile () {
        return this.$store.state.account.profile
      },
      allPrice(){
        if(this.path==='/subscribe'){
          return 150
        }else{
          let itemPrice=this.profile.vip?this.good.vipPrice:this.good.price;
          let price= itemPrice * this.good.num
          let discount=this.discount.find(item=>{
            return item.isSelected//?
          })
          return discount?price-discount.value:price
        }

      }
    },
    methods:{
      close(){
        this.$emit('closeMask')
      },
      couponShow(){
        this.showCoupon=true

      },
      count(){
        const good=Object.assign({},this.good);
        this.$store.commit('ADD_GOODS',good)
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
  padding:30px 0 58px
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
    margin:20px 10px 30px 10px
    /*地址*/
    .address-part
      box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
      border-radius: 2px
      position: relative
      .user
        .user-info
          display: flex
          align-items:center
          font-size: 18px
          color: #222222
          margin:10px 25px 0 15px
          .user-name
            margin-right:15px
        .user-add
          font-size: 12px
          color: #444444
          line-height:15px
          margin:4px 45px 9px 15px
      .no-add
        text-align: center
     //优惠券部分
    .discount-part
      margin-top: 10px
      display:flex
      background: #FFFFFF
      box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
      border-radius: 2px
      height:50px
      align-items: center
      p
        font-size: 14px
        color:#0E948A
        margin-right:12px
      .coupon
        color: #222222
        margin:0 11px 0 15px
      .value
        flex:1
        flex-wrap:nowrap

      .discount-info
        margin-right:20px
        span
          font-size: 12px
          color: #9B9B9B
          margin-right:10px
        .icon-arrow
          width:6px
          height:10px
      .discount-no
        margin-left:auto
    /*订单详情  */
    .goods-part
      box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
      border-radius: 2px
      margin-top:10px
      overflow: hidden
      .goods-header
        margin:15px 20px 19px 15px
        display: flex
        .img-wrapper
          width:75px
          height:75px
        .goods-des
          padding-left:10px
          flex:1
          .goods-name
            font-size: 15px
            color: #222222
            line-height:20px
            margin-bottom:10px
          .goods-price
            font-size:12px
            color: #0E948A
            span
              font-size:18px
      .goods-bottom
        margin:19px 20px 24px 15px
        color: #222222
        display: flex
        justify-content: space-between
        align-items:center
    /*支付按钮*/
  .btn-wrapper
    position: fixed
    bottom:0
    left:0
    width: 100%
    height:58px
    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.05)
    font-size: 18px
    color: #000000
    align-items:center
    justify-content:center
    display: flex
    button
      height:58px
      width:100%
      background: #FFFFFF
    .btn-price
      width:125px
      font-size: 12px
      span
        font-size:18px
    .btn-pay
      flex:1
      font-size: 17px
      color: #FFFFFF
      background: #0E948A
</style>
