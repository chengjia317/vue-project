<template>
  <div>
    <ul class="select-bar">
      <li :class="{active:index===selectIndex}" @click="changeIndex(index)" v-for="(item,index) in items" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "select-bar",
    data(){
      return{
        selectIndex:0
      }
    },
    props:{
      //顶部栏内容
      items:{
        type:Array,
        required:true
      }
    },
    methods:{
      changeIndex(index){
        this.selectIndex=index;
        this.$emit('changeIndex',index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.select-bar
  width: 100%
  height:40px
  display: flex
  align-items:center
  padding-top: 7px
  box-shadow: 0 1px 0 0 #EFF3F6
  background-color: #fff
  li
    margin-right:15px
    color: #666666
    position: relative
    line-height: 43px
  li.active
    color:#008489
  li.active::after
    content: ''
    display: inline-block
    position: absolute
    left: 50%
    margin-left: -14px
    bottom: 0
    width: 28px
    height: 3px
    background: #008489
    border-radius: 1px
</style>
