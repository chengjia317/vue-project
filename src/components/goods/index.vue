<template>
  <div class="order-item">
    <div class="flex-sb">
      <span>订单号 {{data.displayId}}</span>
      <!-- 右上角信息插槽 -->
      <slot name="header-right"></slot>
    </div>

    <template v-for="(item, index) in data.items">
      <div class="details flex-sb" @click="goToDetails(data.id)" :key="index">
        <img class="cover" :src="item.item.coverImage" alt="">
        <div class="content">
          <h3 class="name">{{item.item.name}} {{item.item.subTitle}}</h3>
          <!-- 单件商品 -->
          <div>
            <span v-for="(property, index) in item.item.property.values" :key="index">{{property.name}}</span>
          </div>
          <!-- 订阅商品 -->
          <!-- <div>
            <span class="op-tag"><i class="font-10">订阅商品</i></span>
            <span>三个月一期</span>
          </div> -->
        </div>
        <i v-if="hasRouter" class="op-icon-arrow"></i>
      </div>
    </template>

    <!-- 折扣信息插槽 -->
    <slot name="discount"></slot>

    <div class="flex-end price-wapper">
      <div>
        合计：<i class="price-unit">¥</i><span class="price">{{data.totalAmount | toDecimal2}}</span>
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
        this.$router.push({name: 'my_order_details', params: {id}})
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
