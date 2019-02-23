<template>
  <div v-show="show">
    <div class="mask"></div>
      <div class="wrapper">
        <div class="header">
          <h2>现金券</h2>
          <i @click="handleClose" class="op-icon-close"></i>
        </div>
        <div ref="content" class="content">
          <div>
            <discount class="discount-wrapper" v-for="(item, index) in dataList" :type="1" :data="item" :key="item.id" @click.native="handleUse(index, item.isSelected)">
              <div class="radio-wrapper">
                <div class="radio-checked" v-if="item.isSelected">
                  <img src="../../assets/image/icon_radio_checked.png">
                </div>
                <div class="radio" v-else>
                  <img src="../../assets/image/icon_radio.png">
                </div>
              </div>
            </discount>
          </div>
        </div>
        <button class="op-btn-primary" @click="handleConfirm">确认使用</button>
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
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.content, {
              click: true,
              mouseWheel: true
            })
          } else {
            this.scroll.refresh()
          }
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
    const token = this.$store.state.account.token
    if (this.$route.path !== '/subscribe' && token) {
      this.$store.dispatch('getDiscountData')
    }
  },

  methods: {
    handleUse (index, isSelected) {
      console.log(index, isSelected)
      if (isSelected) {
        this.$store.commit('DISCOUNT_CANCEL', index)
      } else {
        this.$store.commit('DISCOUNT_SELECTED', index)
      }
    },

    handleConfirm () {
      this.$store.commit('DISCOUNT_CONFIRM')
      this.handleClose()
    },

    handleClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  margin-right: 8px;
  width: 16px;
}
.radio-checked {
  margin-right: 0px;
  width: 24px;
}
.discount-wrapper /deep/ .discount {
  margin-right: 2px;
}

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
  height: 300px;
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
