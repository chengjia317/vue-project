<template>
  <div id="app">
    <!-- <div class="inner"> -->
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      
      <tabbar v-show="this.$route.meta.showTab"></tabbar>
    <!-- </div> -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import tabbar from '@/components/tabbar/'
export default {
  name: 'app',
  components: {
    tabbar
  },

  mounted () {
    // new BScroll('#app', {
    //   scrollY: true,
    //   click: true,
    //   bounce: false,
    // })
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/reset.scss';
@import '~@/assets/css/common.scss';
html, body{
  width: 100%;
  height: 100%;
}
body {
  padding-bottom: env(safe-area-inset-bottom);
}
.inner {
  height: 100%;
}
#app {
  font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f6f8f9;
}
.main-content {
  background: #f6f8f9;
}
.page {
  height: 100%;
}
</style>
