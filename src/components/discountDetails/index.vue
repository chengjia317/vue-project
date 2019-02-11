<template>
  <div v-show="show">
    <div class="mask"></div>
      <div class="wrapper">
        <div class="header">
          <h2>优惠券</h2>
          <i @click="handleClose" class="op-icon-close"></i>
        </div>
        <div ref="content" class="content">
          <div>
            <discount :type="1" v-for="(item, index) in dataList" :key="item.id" :data="item">
              <button v-if="!item.isSelected" class="op-btn-text active" @click="handleUse(index)">使用</button>
              <button v-if="item.isSelected" class="op-btn-text" @click="handleCancel(index)">取消</button>
            </discount>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import discount from '../discount'
import BScroll from "better-scroll"
export default {
  components: {
    discount
  },

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

  watch: {
    show () {
      if (this.show) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.content, {
            click: true,
          })
        })
      }
    },
  },

  computed: {
    dataList () {
      return this.$store.state.discount.dataList
    }
  },

  created () {
    // 订阅无优惠券选择
    if (this.$route.path !== '/subscribe') {
      this.$store.dispatch('getDiscountData')
    }
  },

  methods: {
    handleUse (index) {
      this.$store.commit('DISCOUNT_SELECTED', index)
    },

    handleCancel (index) {
      this.$store.commit('DISCOUNT_CANCEL', index)
    },

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
  padding: 30px 16px;
  background: #FFF;
  z-index: 20;
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
.content {
  height: 400px;
  overflow: hidden;
}
.op-btn-text {
  margin-right: -10px;
  width: 50px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #9B9B9B;
  border: 1px solid #9B9B9B;
  border-radius: 2px;
}
.op-btn-text.active {
  color: #0E948A;
  border: 1px solid #0E948A;
}
</style>
