<template>
  <div class="login">
    <div class="main">
      <h1  class="bold">欢迎使用ShaveDog</h1>
      <ul>
        <li class="list">
          <div class="tel">手机号码</div>
          <div class="col other">
            <input type="number" v-model="users.tel" oninput="if(value.length>11) value=value.slice(0,11)" placeholder="请输入手机号码">
            <i class="icon-cancel" @click="users.tel=''"></i>
          </div>
        </li>
        <li class="list">
          <div class="tel">短信验证码</div>
          <div class="col">
            <input type="number" v-model="users.captcha" oninput="if(value.length>6) value=value.slice(0,6)" placeholder="请输入短信验证码">
            <send-code> </send-code>
          </div>
        </li>
      </ul>
      <button :disabled="disabled" :class="['login-btn',{'active-btn':islogin}]" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  import sendCode from '@/components/Send_code'
  export default {
    name: "login",
    data(){
      return{
        users:{
          tel:'',
          captcha:''
        }
      }
    },
    components:{
      sendCode
    },
    computed:{
      validate(){
        return /^1\d{10}$/g.test(this.users.tel)
      },
      disabled(){
        return !(this.users.tel&&this.users.captcha)
      },
      islogin(){
        return (this.validate&&this.users.captcha.length===6)
      }
    },
    methods:{
      login(){
        if(this.validate&&this.users.captcha.length===6){
          const redirect=this.$route.params.redirect||'/'
          this.$router.push(redirect)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.login
  background: url('~images/login_bg.png')
  width: 100%
  height:100%
  -webkit-background-size: cover
  background-size: cover
  color: #fff
  .main
    height: 100%
    padding:108px 30px 0 30px
    background: rgba(0,0,0,.6)
    h1
      font-size: 22px
      color:#fff
      margin-bottom:20px
    ul
      .list
        margin-bottom:10px
        border-bottom:1px solid rgba(255,255,255,.2)
        .tel
          font-size: 12px
        .col
          display:flex
          justify-content:space-around
    .login-btn
      background-color: rgba(255,255,255,0.15)
      border-radius: 5px
      height:50px
      width:100%
      font-size: 16px
      margin-top: 30px
      color: rgba(255,255,255,0.5)
    .active-btn
      background-color: #fff
      color: #008489
input
  width: 100%
  height:30px
  background: none
  border:none
  color: #fff
  letter-spacing: 0.15px
.other
  position: relative
  .icon-cancel
    position: absolute
    right:2px
    bottom:10px
</style>
