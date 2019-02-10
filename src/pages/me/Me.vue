<template>
  <div>
    <div class="header">
      <div class="user">
        <div class="avater">
          <img src="~images/avater.png" alt="">
        </div>
        <div>
          <div class="name">未登录</div>
          <!--<div class="name">程思嘉</div>-->
          <!--<div class="vip-wrapper"><i>年度会员</i></div>-->
        </div>
        <router-link tag="div" to="/me/notice">
          <i class="icon-notice">
          <span class="msg-number">
            <i>2</i>
          </span>
          </i>
        </router-link>
      </div>
      <div class="card">
        <i class="icon-card"></i>
        <p>有效期至2019-12-12</p>
        <div class="sub">
          <i class="icon-vip-yellow"></i>
          <span>续订会员</span>
          <i class="icon-arrow-yellow"></i>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tabs-item">
        <router-link tag="div" to="/me/order/0">
          <div>
            <img src="~images/icon_my_payment.png" alt="">
          </div>
          <p>待付款</p>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link tag="div" to="/me/order/1">
          <div>
            <img src="~/images/icon_my_deliver.png" alt="">
          </div>
          <p>待发货</p>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link tag="div" to="/me/order/2">
          <div>
            <img src="~images/icon_my_recieve.png" alt="">
          </div>
          <p>待收货</p>
        </router-link>
      </div>
      <div class="tabs-item">
        <router-link tag="div" to="/me/order/3">
          <div>
            <img src="~images/icon_my_order.png" alt="">
          </div>
          <p>全部订单</p>
        </router-link>
      </div>
    </div>
    <div class="list">
      <ul>
        <router-link tag="li" to="/me/invite">
          <i class="icon-list1"></i>
          <span>邀请奖励</span>
          <i class="icon-arrow"></i>
        </router-link>
        <router-link tag="li" to="/me/subs">
          <i class="icon-list2"></i>
          <span>我的订阅</span>
          <i class="icon-arrow"></i>
        </router-link>
        <router-link tag="li" to="/me/discount/0">
          <i class="icon-list3"></i>
          <span>我的优惠券</span>
          <i class="icon-arrow"></i>
        </router-link>
        <router-link tag="li" to="/me/address">
          <i class="icon-list4"></i>
          <span>我的地址</span>
          <i class="icon-arrow"></i>
        </router-link>
        <li>
          <i class="icon-list5"></i>
          <span>联系客服</span>
          <i class="icon-arrow"></i>
        </li>
      </ul>
    </div>
    <router-link tag="div" to="/login" class="bottom-btn">
      <!--<button class="login-btn">退出登录</button>-->
      <button class="unlogin-btn">授权登录</button>
    </router-link>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/Tabbar.vue'
  export default {
    name: "me",
    components:{
      TabBar
    }
  }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.header
  padding:79px 12px 0 9px
  background: #0E948A
  height:115px
  .user
    margin-left:11px
    display: flex
    align-items: center
    position :relative
    .avater
      width:50px
      height:50px
      border-radius: 50%
      margin-right: 10px
    div
      display: flex
      flex-direction:column
      justify-content:space-around

      .name
        font-size: 20px
        color: #FFFFFF
      .vip-wrapper
        margin-top: 8px
        padding: 0 10px
        height:18px
        line-height: 18px
        border-radius: 11.5px
        background: rgba(255,255,255,.5)
        i
          font-size: 10px
          color: #0E948A
      .icon-notice
        position: absolute
        top:0
        right:7px
      .msg-number
        background-color: #fff
        width:13px
        height:13px
        position: absolute
        border-radius:50%
        text-align: center
        line-height: 9px
        right:-5px
        top:-6px
        i
          font-size: 9px
          color: #0E948A
  .card
    background-image: linear-gradient(90deg, #3C3C45 0%, #585766 100%)
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.50)
    border-radius: 4px 4px 0 0
    height:38px
    width:100%
    margin-top:26px
    display: flex
    align-items:center
    position: relative
    background-color: #fff
    .icon-card
      margin-left:15px
      margin-right:16.2px
    p
      font-size: 10px
      color: #E4C07A
    .sub
      width:85px
      height:20px
      background: rgba(226,190,120,.2)
      border-radius: 10px 0 0 10px
      position: absolute
      right:0
      display:flex
      align-items:center
      padding-left:7px
      span
        font-size: 10px
        color: #E4C07A
        margin-left:9px
        margin-right:9px
.tabs
  height:77px
  display: flex
  align-items :center
  margin:0 10px 0 9px
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
  border-radius: 2px
  background-color: #fff
  .tabs-item
    display: flex
    flex: 1
    justify-content:center
    div
      text-align: center
      img
        width:24px
        height:20px
        margin-bottom: 12px
      p
        font-size: 10px
        color: #444444
.list
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
  border-radius: 2px
  margin:10px 10px 40px
  background-color: #fff
  li
    height:50px
    border-bottom:1px solid rgba(0,0,0,.05)
    display: flex
    align-items:center
    padding-left:15px
    position: relative
    span
      margin-left:11px
      font-size: 15px
      color: #000000
      letter-spacing: 0.16px
    .icon-arrow
      position: absolute
      right:15px
.bottom-btn
  text-align: center
  height:50px
  margin-bottom:70px
  button
    height:50px
    width:300px
    background: #FFFFFF
    border: 1px solid #E9EEF0
    border-radius: 4px
    font-size: 17px
    color: #4A4A4A
  .unlogin-btn
    background: #0E948A
    color: #FFFFFF
</style>
