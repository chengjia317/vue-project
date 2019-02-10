<template>
  <div>
    <button v-if="show" @click="getCode">获取验证码</button>
    <button v-else>{{time}}s后获取</button>
  </div>
</template>

<script>
  export default {
    name: "send_code",
    data(){
      return{
        show:true,
        time:60
      }
    },
    methods:{
      getCode(){
        this.show=false;
        this.time--;
        const timer=setInterval(()=>{
          if(this.time>1){
            this.time--
          }else{
            clearInterval(timer)
            this.show=true
          }
        },1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
button
  background: none
  color: #fff
  white-space :nowrap
  font-size:12px
</style>
