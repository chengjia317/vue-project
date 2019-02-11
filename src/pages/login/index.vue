<template>
  <div class="page">
    <div class="content">
      <h1 class="welcome">欢迎使用ShaveDog</h1>
      <ul>
        <li class="item">
          <div class="title">手机号码</div>
          <div class="flex-sb">
            <input v-model="form.phone" type="number" placeholder="请输入手机号码" oninput="if(value.length>11)value=value.slice(0,11)">
            <i v-show="form.phone" class="op-icon-clear" @click="form.phone=''"></i>
          </div>
        </li>
        <li class="item">
          <div class="title">短信验证码</div>
          <div class="flex-sb">
            <input v-model="form.captcha" type="number" placeholder="请输入短信验证码"  oninput="if(value.length>6)value=value.slice(0,6)">
            <send-code></send-code>
          </div>
        </li>
      </ul>
      <button :disabled="disabled" class="op-btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import sendCode from '@/components/sendCode/'
export default {
  components: {
    sendCode
  },

  data () {
    return {
      form: {
        phone: '',
        captcha: ''
      }
    }
  },

  computed: {
    disabled: function () {
      return !(this.form.phone && this.form.captcha)
    }
  },

  methods: {
    async login () {
      if (this.$op.validate.phone(this.form.phone)) {
        this.$store.dispatch('login', this.form).then(() => {
          const redirect = this.$route.params.redirect || '/'
          this.$router.push(redirect)
        })
      }
    }
  }
  
}
</script>

<style lang="scss" scoped>
input{
  width: 100%;
  height: 40px;
  color: #fff;
  background: none;
  border: none;
}
.page {
  width: 100%;
  height: 100%;
  background: url('../../assets/image/login_bg.png');
  background-size: cover;
  .content {
    padding: 30px;
    width: 100%;
    height: 100%;
    color: #fff;
    background: rgba(0,0,0,.6);
    .welcome {
      margin-bottom: 20px;
      font-size: 22px;
    }
    .title {
      font-size: 12px;
    }
    .op-btn {
      margin-top: 30px;
      font-size: 16px;
    }
  }
}
.item {
  position: relative;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,.2);
  .op-icon {
    position: absolute;
    right: 0;
  }
}
</style>
