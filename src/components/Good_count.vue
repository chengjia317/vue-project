<template>
  <div class="good-count">
    <div class="reduce-wrapper"  @click="minus">
      <span class="icon-reduce"></span>
    </div>
    <div class="good-count">
      <span>{{count}}</span>
    </div>
    <div class="add-wrapper"  @click="add">
      <span class="icon-add"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "good-count",
    props:{
      value:{//定义初始值
        type:Number,
        default:1
      }
    },
    data(){
      return{
        count:this.value
      }
    },
    watch:{
      value(){
        this.count=this.value
        console.log('this.value')
      }
    },
    methods:{
      minus(){
        if(this.count>0){
          this.count--;
          this.$emit('input',this.count)
          this.$emit('changeCount')
        }
      },
      add(){
        this.count++;
        this.$emit('input',this.count)
        this.$emit('changeCount')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.good-count
  display: flex
  height:28px
  div
    background: #FFFFFF
    border: 1px solid #E6EAEE
    border-radius: 5px 0 0 5px
    height:28px
    display: flex
    justify-content: center
    align-items: center
  .reduce-wrapper
    width:35px
  .good-count
    width:47px
    text-align: center
    background: #F6F8F9
  .add-wrapper
    width:35px
</style>
