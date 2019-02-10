<template>
  <div class="invite">
    <back :backtitle="toptitle"></back>
    <div class="content">
      <div class="rule-wrapper">
        <h1 class="title bold">邀请规则</h1>
        <ul class="rule-list">
          <li>• 通过分享您的专属链接，邀请好友来到shavedog进行购物。</li>
          <li>• 当好友成功订阅我们的会员时，您将获得我们提供的优惠券一张。</li>
          <li>• 优惠券可以累积，邀请越多奖励越高</li>
          <li>• 最终解释归shavedog所有。</li>
        </ul>
      </div>
      <button class="invite-btn">邀请朋友</button>
    </div>
  </div>
</template>

<script>
  import Back from '@/components/Back'
  export default {
    name: "invite",
    components:{
      Back
    },
    data(){
      return{
        toptitle:'推荐有礼'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.invite
  width: 100%
  height: 100%
  background: url('~images/invite.png')
  -webkit-background-size: cover
  background-size: cover
  .content
    position: fixed
    bottom: 20px
    width: 335px
    padding: 24px 0 20px
    margin-left:20px
    background: #fff
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10)
    border-radius: 4px
    .rule-wrapper
      padding: 0 24px
      margin:0 20px
      .title
        font-size: 24px
        margin-bottom:18px
      .rule-list
        margin: 8px 0 30px
        li
          margin-bottom: 18px
    .invite-btn
      height:50px
      background: #0E948A
      border: 1px solid #05726A
      border-radius: 4px
      width:300px
      font-size: 17px
      color: #FFFFFF
      margin:  0 18px 0 18px
</style>
