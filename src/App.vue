<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  @import "~styles/common.styl"
  @import "~styles/reset.css"
  html,body
    height:100%
  #app
    font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    width: 100%
    height: 100%
    font-size: 14px
    background: #f6f8f9
    position: relative
</style>
