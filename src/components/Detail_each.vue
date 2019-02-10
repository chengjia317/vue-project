<template>
  <div>
    <div class="mask"></div>
    <div class="wrapper">
      <div class="header">
        <h2 class="title">每期详情</h2>
        <i class="icon-close"></i>
      </div>
      <div class="content">
        <ul class="btn-wrapper">
          <li class="btn-each">第一期</li>
          <li class="btn-each">第二期</li>
          <li class="btn-each">第三期</li>
          <li class="btn-each">第四期</li>
          <li class="btn-each">第五期</li>
          <li class="btn-each">第六期</li>
          <li class="btn-each">第七期</li>
          <li class="btn-each">第八期</li>
        </ul>
        <ul class="des-list">
          <li class="des">
            <span>发货次数</span>
            <span>第3期/共8期</span>
          </li>
          <li class="des">
            <span>收货日期</span>
            <span>2018-12-18</span>
          </li>
          <li class="des">
            <span>物流信息</span>
            <span>已发货</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "detail_each"
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
    margin:25px 0 0 16px
    .btn-wrapper
      display: flex
      flex-wrap:wrap
      .btn-each
        margin:0 5px  10px 0
        width:22%
        height:36px
        border: 1px solid #0E948A
        border-radius: 2px
        font-size: 14px
        color: #0E948A
        display: flex
        align-items:center
        justify-content:center
    .des-list
      margin:20px 20px 0 0
      .des
        display: flex
        align-items: center
        justify-content:space-between
        height:50px
        border-top: 1px solid #EFF3F6
        color: #222222
</style>
