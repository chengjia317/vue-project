<template>
  <div class="wrapper">
    <com-tab-title title="推荐有礼"></com-tab-title>
    <div class="bg">

      <div class="content">
        <div class="rule-wrapper">
          <h1 class="title">邀请规则</h1>
          <ul class="rule-list">
            <li>• 通过分享您的专属链接，邀请好友来到shavedog进行购物。</li>
            <li>• 当好友成功订阅我们的会员时，您将获得我们提供的优惠券一张。</li>
            <li>• 优惠券可以累积，邀请越多奖励越高</li>
            <li>• 最终解释归shavedog所有。</li>
          </ul>
        </div>
        <button class="op-btn-primary" @click="handleShare">邀请朋友</button>
      </div>
      <div v-if="share" class="mask" @click="share = false"><i class="op-icon-share"></i></div>
    </div>
  </div>
</template>

<script>
import {wechatShare} from '@/api/wechat'
import config from '@/config'

export default {
  data () {
    return {
      share: false
    }
  },

  computed: {
    profile: function () {
      return this.$store.state.account.profile
    }
  },

  methods: {
    handleShare () {
      console.log('wx share')
      this.share = true
      
      wechatShare({
        title: 'shavedog',
        desc: `${this.profile.nickname}邀请你加入茬狗会员`,
        link: `${config.redirectUri}?inviterId=${this.profile.id}`,
        imgUrl: '',
        success: () => {
          this.share = false
          this.$toast('分享成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.mask {
  z-index: 100;
}
.bg {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  background: url('../../assets/image/bg_invite.png') 0 -35px;
  background-size: cover;
  .content {
    position: fixed;
    bottom: 20px;
    width: 335px;
    padding: 24px 18px 20px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .rule-wrapper {
    padding: 0 24px;
  }
  .title {
    font-size: 24px;
  }
  .rule-list {
    margin: 8px 0 30px;
    font-family: PingFangSC-Regular;
    li {
      margin-bottom: 18px;
    }
  }
}
</style>
