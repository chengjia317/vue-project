<template>
  <div>
    <button v-if="time === second" class="op-btn-text" @click="getCode">获取验证码</button>
    <button v-else class="op-btn-text">{{time}}s后重新获取</button>
  </div>
</template>

<script>
export default {
  props: {
    second: {
      type: Number,
      default: 60
    },
    name: {
      type: String,
      default: "获取验证码"
    }
  },

  data () {
    return {
      time: this.second
    }
  },

  methods: {
    getCode () {
      // TODO 获取验证码
      this.startCountDown()
    },

    startCountDown () {
      this.time--
      const timer = setInterval(() => {
        if (this.time > 1) {
          this.time--
        } else {
          clearInterval(timer)
          this.time = this.second
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.op-btn-text {
  color: #fff;
  border: none;
  white-space: nowrap;
}
</style>
