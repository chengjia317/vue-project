<template>
  <div class="tab-title">
    <i class="op-icon-return" @click="handleReturn"></i>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleReturn () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-title {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 13px 15px;
  background: #fff;
  font-size: 17px;
  z-index: 9;
  .title {
    margin-left: 15px;
  }
}
</style>
