<template>
  <div :class="discountClass">
    <i v-if="type === 2" class="icon-used">
    </i>
    <div class="price">
      <i class="unit">¥</i>{{data.value | toDecimal0}}
    </div>
    <div class="content flex-col-sb">
      <div>{{data.name}}</div>
      <div class="flex-sb">
        <div>{{data.startTime | formatDatePoint}} - {{data.endTime | formatDatePoint}}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 优惠券类型 1: 未使用 | 2: 已使用 3: 已过期
   */
  props: {
    type: {
      type: Number,
      default: 1
    },

    data: {
      type: Object,
      required: true,
    }
  },

  computed: {
    discountClass: function () {
      return {
        'discount': true,
        'flex-sb': true,
        'unused': this.type === 1,
        'used': this.type === 2 || this.type === 3,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.unused {
  background: url('../../assets/image/bg_discount_unused.png');
}
.used {
  background: url('../../assets/image/bg_discount_used.png');
}
.icon-used {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 60px;
  height: 50px;
  background: url('../../assets/image/icon_used.png');
  background-size: cover;
}
.discount {
  position: relative;
  margin: 10px auto;
  width: 344px;
  height: 93px;
  background-size: cover;
  font-size: 12px;
  color: #9B9B9B;
  box-shadow: 0px 2px 10px -7px #000;
  .price {
    width: 100px;
    margin-left: 3px;
    font-size: 36px;
    color: #fff;
    text-align: center;
    .unit {
      margin-right: 5px;
      font-size: 18px;
    }
  }
  .content {
    flex: 1;
    height: 93px;
    padding: 15px 27px 14px 14px;
  }
}
</style>
