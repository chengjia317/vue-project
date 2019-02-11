<template>
  <div>
    <ul class="op-tab">
      <li :class="['item', {'active': index === selectedIndex}]" v-for="(item, index) in data" :key="index" @click="change(index, item)">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },

    active: {
      type: Number,
      default: 0
    }
  },

  watch: {
    active: function() {
      this.selectedIndex = this.active
    }
  },

  data () {
    return {
      selectedIndex: this.active,
    }
  },

  methods: {
    change (index, item) {
      this.selectedIndex = index
      this.$emit('change', index, item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/_variables.scss';
.op-tab {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  color: #666;
  box-shadow: 0 1px 0 0 #EFF3F6;
  background: #fff;
  .item {
    position: relative;
    margin: 0 11px;
    text-align: center;
  }
  .item.active {
    color: $color-primary;
  }
  .item.active::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -14px;
    bottom: 0;
    width: 28px;
    height: 3px;
    background: $color-primary;
    border-radius: 1px;
  }
}
</style>
