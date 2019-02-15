<template>
  <van-tabbar :class="isapp ? 'is-weapp': ''" v-model="active">
    <van-tabbar-item icon="home-o" to='/index'>
      <span>使命</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon1.active : icon1.normal">
    </van-tabbar-item>
    <van-tabbar-item icon="search" to='/subscribe'>
      <span>订阅</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon2.active : icon2.normal">
    </van-tabbar-item>
    <van-tabbar-item icon="search" to='/supply'>
      <span>补给</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon3.active : icon3.normal">
    </van-tabbar-item>
    <van-tabbar-item icon="setting-o" to='/my'>
      <span>我的</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon4.active : icon4.normal">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      icon1: {
        normal: require("../../assets/image/tabbar_1.png"),
        active: require('../../assets/image/tabbar_1_active.png')
      },
      icon2: {
        normal: require("../../assets/image/tabbar_2.png"),
        active: require('../../assets/image/tabbar_2_active.png')
      },
      icon3: {
        normal: require("../../assets/image/tabbar_3.png"),
        active: require('../../assets/image/tabbar_3_active.png')
      },
      icon4: {
        normal: require("../../assets/image/tabbar_4.png"),
        active: require('../../assets/image/tabbar_4_active.png')
      },
      isapp: false,
    }
  },

  mounted () {
    this.$op.isWeChatApplet().then(async res => {
      this.isapp = res
    })
  },

  watch:{
    $route(to, from){
      const path = to.path
      if (path === '/index') {
        this.active = 0
      } else if (path === '/subscribe') {
        this.active = 1
      } else if (/^\/supply/.test(path)) {
        this.active = 2
      } else if (path === '/my') {
        this.active = 3
      } 
    }
  },
}
</script>

<style lang="scss" scoped>
.van-tabbar {
  height: 50px;
  margin-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
}
.van-tabbar::after {
  content: '';
  position: fixed;
  z-index: 10;
  top: initial;
  left: 0;
  right: 0;
  transform: initial;
  bottom: 0px;
  width: 100%;
  border: none;
  height: env(safe-area-inset-bottom);
  background: #fff;
}
.van-tabbar.is-weapp {
  margin-bottom: 34px;
}
.van-tabbar.is-weapp::after {
  height: 34px!important;
}

.van-tabbar-item {
  color: #909090;
  & /deep/ .van-tabbar-item__text {
    transform: scale(.8)
  }
  & /deep/ img {
    width: 20px;
  }
}
.van-tabbar-item--active {
  color: #008489;
}
</style>
