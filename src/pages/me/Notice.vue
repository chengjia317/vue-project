<template>
  <div class="notice">
    <back :backtitle="toptitle"> </back>
    <ul>
      <li class="list">
        <p class="n-des">SHAVEDAOG手动剃须刀组合发货成功</p>
        <p class="n-date">2018-12-20</p>
      </li>
      <li class="list">
        <p class="n-des">SHAVEDAOG手动剃须刀组合发货成功</p>
        <p class="n-date">2018-12-20</p>
      </li>
      <li class="list">
        <p class="n-des">SHAVEDAOG手动剃须刀组合发货成功</p>
        <p class="n-date">2018-12-20</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Back from '@/components/Back'

  export default {
    name: "notice",
    components:{
      Back,
    },
    data(){
      return{
        toptitle:'我的通知',
        showwhat:0
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.notice
  ul
    .list
      height:70px
      padding-left:15px
      border-top:1px  solid rgba(0,0,0,0.05)
      .n-des
        line-height 36px
        color:#000
        font-weight:400
      .n-date
        font-size: 12px
        color: #B0B0B0
</style>
