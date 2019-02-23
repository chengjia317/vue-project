<template>
  <div class="order-item">
    <div class="flex-sb">
      <span>订单号 {{data.displayId}}</span>
      <!-- 右上角信息插槽 -->
      <slot name="header-right">
        <span class="status">{{data.isShip | formatOrderStatus}}</span>
      </slot>
    </div>

    <template>
      <div class="details flex-sb" @click="goToDetails(data.id)">
        <img class="cover" src="../../assets/image/index2.png" alt="">
        <div class="content">
          <h3 class="name">茬狗shavedog — 订阅会员年费套餐，共4期，每三个月寄送1期</h3>
          <div>
            <span class="op-tag"><i class="font-10">订阅商品</i></span>
            <span>第{{data.period}}期</span>
          </div>
        </div>
        <i v-if="hasRouter" class="op-icon-arrow"></i>
      </div>
    </template>

    <div class="flex-end price-wapper">
      <div>
        合计：<i class="price-unit">¥</i><span class="price">{{15000 | toDecimal2}}</span>
      </div>
    </div>

    <!-- 按钮信息插槽 -->
    <slot name="btn"></slot>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 是否可以跳转到商品详情页
     */
    hasRouter: {
      type: Boolean,
      default: false
    },

    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    goToDetails(id) {
      if (this.hasRouter) {
        this.$router.push({name: 'my_subscribe_details', params: {id}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-item + .order-item {
  margin-top: 10px;
}

.order-item {
  padding: 12px 15px 15px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #444;
  background: #fff;
  border-radius: 4px;
  .details {
    padding: 20px 0;
  }
  .status {
    font-size: 14px;
    color: #0E948A;
  }
  .cover {
    width: 75px;
    height: 75px;
  }
  .content {
    flex: 1;
    margin-left: 10px;
  }
  .name {
    margin-bottom: 12px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #222;
  }
  .op-icon-arrow {
    margin-left: 25px;
  }
  .price-wapper {
    margin-bottom: 10px;
    .price {
      font-size: 18px;
      color: #101010;
    }
  }
}
</style>
