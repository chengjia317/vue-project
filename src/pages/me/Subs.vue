<template>
  <div>
    <back :backtitle="toptitle"></back>
    <div class="card">
      <div class="subscribe">
        <div class="header">
          <div class="logo">
            <img src="~/images/s_big.png" alt="">
          </div>
          <h2 class="name">SHAVEDOG纯爷们1号清爽套餐</h2>
        </div>
        <div class="info">
          <div class="date">会员日期：2018-12-12至2019-12-12</div>
          <div>收货地址：北京西城区内环到二环里北京市西城区长安大街51号天字一号北门</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Back from '@/components/Back'

  export default {
    name: "subs",
    components:{
      Back
    },
    data(){
      return{
        toptitle:'我的订阅'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.card
  padding:20px 15px
  .subscribe
    margin-bottom: 10px
    background-image: linear-gradient(90deg, #585766 0%, #3C3C45 100%)
    border-radius: 10px
    box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10)
    overflow: hidden
    .header
      padding: 19px 25px 29px
      display: flex
      align-items:center
      .logo
        width: 58px
        height: 58px
    .name
      flex: 1
      margin-left: 18px
      font-size: 24px
      color: #E9C984
      text-shadow: 0 1px 1px rgba(0,0,0,0.20)
    .info
      padding: 13px 23px
      font-size: 12px
      color: #ffffff
      opacity: 0.5
      background: rgba(0,0,0,.2)
      line-height:16px
      .date
       margin-bottom: 6px
</style>
