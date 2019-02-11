<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>

    <tabbar v-show="this.$route.meta.showTab"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar/'
export default {
  name: 'app',
  components: {
    tabbar
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/reset.scss';
@import '~@/assets/css/common.scss';
html, body{
  width: 100%;
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
