<template>
  <div class="top">
    <div>
      <i class="icon-arrow-left" @click="goBack"></i>
    </div>
    <p class="title">{{backtitle}}</p>
  </div>
</template>

<script>
  export default {
    name: "back",
    props:{
      backtitle:{
        type:String,
        required:true
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.top
  display: flex
  padding-left: 15px
  height: 37px
  padding-top: 33px
  background-color: #fff
  .title
    font-size:17px
    color:#000000
</style>
