<template>
  <div class="op-stepper">
    <span class="reduce" @click="handleReduce">
      <i :class="['op-icon-reduce', {'disabled': step === minValue}]"></i>
    </span>
    <span class="op-value">{{step}}</span>
    <span class="add">
      <i class="op-icon-add" @click="handleAdd"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 初始化计数值
     */
    value: {
      type: Number,
      default: 1
    },
    /**
     * 组件最小值
     */
    minValue: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      step: this.value
    }
  },

  watch: {
    value: function () {
      this.step = this.value
    }
  },

  methods: {
    handleAdd () {
      this.step++
      this.$emit('input', this.step)
      this.$emit('change')
    },

    handleReduce () {
      if (this.step === this.minValue) {
        return
      }
      this.step--
      this.$emit('input', this.step)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin base {
  width: 35px;
  height: 28px;
  border: 1px solid #E6EAEE;
  display: flex;
  justify-content: center;
  align-items: center;
}
.op-stepper {
  display: inline-flex;
}
.reduce {
  border-radius: 5px 0 0 5px;
  @include base;
}
.op-icon-reduce {
  display: inline-block;
  width: 12px;
  height: 2px;
  background-image: url('../../assets/image/icon_reduce.png');
  background-size: cover;
}
.op-icon-reduce.disabled {
  background-image: url('../../assets/image/icon_reduce_disabled.png');
}
.op-value {
  width: 47px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: #F6F8F9;
}
.add {
  border-radius: 0 5px 5px 0;
  @include base;
}
.op-icon-add {
  display: inline-block;
  width: 10px;
  height: 12px;
  background-image: url('../../assets/image/icon_add.png');
  background-size: cover;
}
</style>
