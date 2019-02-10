<template>
  <div class="search">
    <form action="">
      <div class="search-wrapper">
        <i class="icon-search"></i>
        <input type="text" placeholder="搜搜Shavedog精选补给">
      </div>
    </form>
  </div>
</template>

<script>
    export default {
      name: "search"
    }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.search-wrapper
  width: 100%
  height:35px
  background: #EFF3F6
  border-radius: 2px
.search-wrapper
  display: flex
  align-items : center
  .icon-search
    margin-left: 10px
    margin-right: 10px
  input
    font-size: 14px
    color: #C9C9C9
    background: none
</style>
