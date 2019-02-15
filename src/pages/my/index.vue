<template>
  <div :class="['outer', {'is-weapp': isapp}]">
    <div>
      <div class="header">
        <div class="user flex-sb">
          <div class="flex-sb">
            <div class="avatar">
              <img v-if="!profile.avatar" src="../../assets/image/avatar.png" alt="">
              <img v-if="profile.avatar" :src="profile.avatar" alt="">
            </div>
            <div>
              <div v-if="!token" class="name" @click="$toast('请授权登录')">未登录</div>
              <div v-else-if="profile.nickname" class="name">{{profile.nickname}}</div>
              <div v-else class="name">{{profile.phone}}</div>
              <div v-if="profile.vip" class="level"><i class="font-10">年费会员</i></div>
            </div>
          </div>
          <router-link to="/my/notice" tag="div">
            <i class="op-icon-notice">
              <span class="op-icon-num" v-if="message">
                <i class="font-9">{{message}}</i>
              </span>
            </i>
          </router-link>
        </div>
        <div class="member flex-sb">
          <div>
            <div class="img">
              <img src="../../assets/image/s.png" alt="">
            </div>
            <span v-if="profile.vip" class="font-10">有效期至{{profile.vipExpire | formatDate}}</span>
          </div>
          <router-link :to="{name: 'subscribe', params: {operation: 'renew'}}">
            <div class="renew">
              <img src="../../assets/image/icon_vip_gold.png" alt="">
              <span v-if="!profile.vip" class="font-10">成为会员</span>
              <span v-else class="font-10">续订会员</span>
              <i class="op-icon-arrow-yellow"></i>
            </div>
          </router-link>
        </div>
      </div>
      <div class="wrapper">
        <ul class="order-list">
          <router-link :to="{name: 'my_order', params: {type: 1}}" tag="li">
            <div class="icon">
              <img src="../../assets/image/icon_my_payment.png" alt="">
            </div>
            <span class="font-10">待付款</span>
          </router-link>
          <router-link :to="{name: 'my_order', params: {type: 2}}" tag="li">
            <div class="icon">
              <img src="../../assets/image/icon_my_deliver.png" alt="">
            </div>
            <span class="font-10">待发货</span>
          </router-link>
          <router-link :to="{name: 'my_order', params: {type: 3}}" tag="li">
            <div class="icon">
              <img src="../../assets/image/icon_my_receive.png" alt="">
            </div>
            <span class="font-10">待收货</span>
          </router-link>
          <router-link :to="{name: 'my_order', params: {type: 0}}" tag="li">
            <div class="icon">
              <img src="../../assets/image/icon_my_order.png" alt="">
            </div>
            <span class="font-10">全部订单</span>
          </router-link>
        </ul>
        <ul class="my-list">
          <router-link to="/invite" tag="li">
            <div>
              <div class="icon">
                <img src="../../assets/image/icon_my_list1.png" alt="">
              </div>
              <span class="name">邀请奖励</span>
            </div>
            <div>已邀请 <i :class="{'color-primary': profile.invite}">{{profile.invite || 0}}</i> 人，已奖励 <i :class="{'color-primary': profile.reward}">{{profile.reward || 0}}</i> 元
              <i class="op-icon-arrow"></i>
            </div>
          </router-link>
          <router-link to="/my/subscribe" tag="li">
            <div>
              <div class="icon">
                <img src="../../assets/image/icon_my_list2.png" alt="">
              </div>
              <span class="name">我的订阅</span>
            </div>
            <div>
              <i class="op-icon-arrow"></i>
            </div>
          </router-link>
          <router-link :to="{name: 'my_discount', params: {type: 0}}" tag="li">
            <div>
              <div class="icon">
                <img src="../../assets/image/icon_my_list3.png" alt="">
              </div>
              <span class="name">我的现金券</span>
            </div>
            <div>
              <i class="op-icon-arrow"></i>
            </div>
          </router-link>
          <router-link to="/my/address" tag="li">
            <div>
              <div class="icon">
                <img src="../../assets/image/icon_my_list4.png" alt="">
              </div>
              <span class="name">我的地址</span>
            </div>
            <div>
              <i class="op-icon-arrow"></i>
            </div>
          </router-link>
          <li @click="handelService">
            <div>
              <div class="icon">
                <img src="../../assets/image/icon_my_list5.png" alt="">
              </div>
              <span class="name" >联系客服</span>
            </div>
            <div>
              <i class="op-icon-arrow"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <button v-if="!token" class="op-btn-primary" @click="wechatLogin">授权登录</button>
        <button v-else class="op-btn" @click="loginOut">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getNewMessages} from '@/api/message'
import {getWechatLogin} from '@/api/wechat'

export default {
  data () {
    return {
      isGetProfile : false,
      message: 0,
      isapp: false,
    }
  },

  computed: {
    token: function () {
      return this.$store.state.account.token
    },

    profile: function () {
      return this.$store.state.account.profile
    }
  },

  activated () {
    if (this.token) {
      this.getNewMessages()
      if (!this.isGetProfile) {
        this.getProfile()
        this.isGetProfile = true
      }
    }
    this.scroll && this.scroll.refresh()
  },

  created () {
    if (this.token) {
      this.getProfile()
      this.getNewMessages()
    }
  },

  mounted () {
    this.$op.isWeChatApplet().then(async res => {
      this.isapp = res
    })
    if (!this.scroll) {
      setTimeout(() => {
        this.scroll = new BScroll('.outer', {
          click: true,
          mouseWheel: true
        })
      }, 0)
    } else {
      this.scroll.refresh()
    }
  },

  methods: {
    async getProfile () {
      this.$store.dispatch('getProfile')
    },

    async getNewMessages () {
      const data = await getNewMessages()
      console.log('message', data)
      this.message = data
    },

    wechatLogin () {
      this.$op.isWeChatApplet().then(res => {
        if (!res) {
          // 微信环境
          getWechatLogin()
        } else {
          wx.miniProgram.navigateTo({url: '/pages/auth/auth'})
        }
      }).catch(err => {
        console.error(err)
      })
    },

    handelService () {
      this.$op.isWeChatApplet().then(res => {
        if (!res) {
          // 微信环境
          _MEIQIA('showPanel')
          _MEIQIA('metadata', {
            userid: this.profile.id,
            vip: this.profile.vip,
            name: this.profile.nickname,
            tel: this.profile.phone,
          })
        } else {
          wx.miniProgram.navigateTo({url: '/pages/service/service'})
        }
      }).catch(err => {
        console.error(err)
      })
    },

    loginOut () {
      this.$store.dispatch('logout')
      this.message = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.outer {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
}
.outer.is-weapp {
  bottom: 84px;
}
.header {
  position: relative;
  padding: 29px 20px 0;
  height: 144px;
  background: #0E948A;
  overflow: hidden;
  .user {
    .avatar {
      margin: 0 10px;
      width: 50px;
      height: 50px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #fff;
    }
    .level {
      display: inline-block;
      margin-top: 4px;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
      font-family: PingFangSC-Regular;
      color: #0E948A;
      border-radius: 12px;
      background: rgba(255,255,255,.5)
    }
  }

  .member {
    align-items: center;
    position: absolute;
    width: 355px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 38px;
    line-height: 38px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,.5);
    background-image: linear-gradient(90deg, #585766 100%, #3C3C45 0%);
    border-radius: 4px 4px 0 0;
    color: #E4C07A;
    font-size: 12px;
    .img {
      margin: 0 10px 0 15px;
      display: inline-block;
      width: 22px;
      img {
        vertical-align: middle;
      }
    }
    .renew {
      width: 85px;
      height: 20px;
      line-height: 20px;
      background: rgba(226,190,120,.2);
      border-radius: 10px 0 0 10px;
      text-align: center;
      img {
        width: 12px;
      }
    }
  }
}
@mixin bg {
  background: #FFF;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10);
  border-radius: 2px;
}
.wrapper {
  padding: 0 10px;
}
.order-list {
  margin: 7px 0 10px;
  padding: 16px 0;
  display: flex;
  font-family: PingFangSC-Regular;
  text-align: center;
  @include bg;
  li {
    flex: 1;
  }
  .icon {
    margin: 0 auto;
    width: 24px;
  }
}
.my-list {
  padding: 0 15px;
  font-size: 12px;
  color: #9B9B9B;
  @include bg;
  .name {
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #000;
  }
  li {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }
  li + li {
    border-top: 1px solid rgba(0,0,0,.05)
  }
  .icon {
    display: inline-block;
    margin-right: 11px;
    width: 19px;
    vertical-align: sub;
  }
  .op-icon-arrow {
    margin-left: 10px;
  }
}
@mixin btn {
  width: 300px;
  font-size: 17px;
}
.btn-wrapper {
  padding: 40px 0;
  text-align: center;
}
.op-btn-primary {
  @include btn;
}
.op-btn {
  @include btn;
  color: #4A4A4A;
  border: 1px solid #E9EEF0;
}
</style>
