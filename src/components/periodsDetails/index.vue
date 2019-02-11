<template>
  <div v-show="show">
    <div class="mask"></div>
    <div class="wrapper">
      <div class="header">
        <h2>每期详情</h2>
        <i @click="handleClose" class="op-icon-close"></i>
      </div>
      <div class="content">
        <ul class="periods-list">
          <li class="disabled">第1期</li>
          <li class="disabled">第2期</li>
          <li class="active">第3期</li>
          <li>第4期</li>
          <li>第5期</li>
        </ul>
        <div class="info-wrapper">
          <div class="info flex-sb"><span>发货次数</span><span>第3期/共8期</span></div>
          <div class="info flex-sb"><span>收货日期</span><span>2018-12-18</span></div>
          <div class="info flex-sb"><span>物流信息</span><span>已发货</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  methods: {
    handleClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 16px 70px;
  background: #FFF;
  z-index: 11;
}
.header {
  position: relative;
  padding: 0 30px;
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  text-align: center;
  .op-icon-close {
    position: absolute;
    top: 6px;
    right: 0;
  }
}
.periods-list {
  margin: 25px 0 20px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  li {
    margin: 0 5px 10px 0;
    width: 82px;
    height: 36px;
    line-height: 36px;
    color: #0E948A;
    border: 1px solid #0E948A;
    border-radius: 2px;
    text-align: center;
  }
  .disabled {
    color: #C5C5C5;
    background: #E9EEF0;
    border: none;
  }
  .active {
    color: #fff;
    background: #0E948A;
  }
}
.info-wrapper {
  line-height: 50px;
  color: #222;
  .info {
    border-top: 1px solid #EFF3F6;
  }
}
</style>
