<template>
  <div class="wrapper">
    <com-tab-title title="推荐有礼"></com-tab-title>
    <div class="bg">

      <div class="content">
        <div class="rule-wrapper">
          <h1 class="title">邀请规则</h1>
          <ul class="rule-list">
            <li>• 你可以将你的专属邀请链接，分享给任何好友;</li>
            <li>• 好友通过你的链接，成功注册并付费成为茬狗shavedog会员之后，你们各自获得¥10的现金券;</li>
            <li>• 现金券无任何使用门槛，可在任何订单内，不限数量使用;</li>
            <li>• 邀请奖励可累计，邀请成功越多，奖励越多;</li>
            <li>• 最终解释权归......没啥好解释的。</li>
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
      share: false,
      shareImg: require('../../assets/image/index2.png')
    }
  },

  computed: {
    profile: function () {
      return this.$store.state.account.profile
    }
  },

  mounted () {
    this.wechatShare()
  },

  methods: {
    handleShare () {
      console.log('wx share')
      this.share = true
    },
    wechatShare () {
      wechatShare({
        title: `${this.profile.nickname}邀请你成为茬狗剃须刀订阅会员`,
        desc: `一年150元，12个刀头，免费到家。别再被大公司骗了。`,
        link: `${config.redirectUri}?inviterId=${this.profile.id}`,
        imgUrl: `${config.redirectUri}/${this.shareImg}`,
        success: () => {
          this.share = false
          this.$toast('分享成功')
        },
        cancel: () => {
          this.share = false
          this.$toast('取消分享')
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
    padding: 14px 18px 20px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .title {
    font-size: 22px;
  }
  .rule-list {
    margin: 8px 0 20px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    li {
      margin-bottom: 10px;
    }
  }
}
</style>
