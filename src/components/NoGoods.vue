<template>
  <div class="no-goods">
    <div class="img-wrapper">
      <img src="../assets/images/no-goods.png" alt="">
    </div>
    <p class="title">暂无商品</p>
    <router-link tag="button" to="/subscribe"><i class="icon-member"></i>了解会员权益</router-link>
  </div>
</template>

<script>
  export default {
    name: "no-goods"
  }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.no-goods
  display: flex
  flex-direction:column
  justify-content:center
  align-items:center
  .img-wrapper
    margin: 110px auto 22px;
    width: 140px;
  .title
    color:rgba(34, 34, 34, .5);
  button
    width:160px
    height:44px
    margin-top: 49px
    background: rgba(0, 132, 137, .2)
    border-radius: 4px
    color:#008489
    .icon-member
      margin-right:6px
      vertical-align :middle
</style>
