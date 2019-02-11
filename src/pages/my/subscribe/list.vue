<template>
  <div>
    <com-tab-title title="我的订阅"></com-tab-title>
    
    <div class="wrapper">
      <div class="content" v-if="ordersList.length">
        <subscribe-goods v-for="(item, index) in ordersList" :key="index" :data="item" :hasRouter="true"></subscribe-goods>
      </div>
      <div v-else class="no-data">暂无订阅</div>
    </div>
  </div>
</template>

<script>
import subscribeGoods from '@/components/subscribeGoods'
import {getSubscribeOrders} from '@/api/order'
import BScroll from 'better-scroll'
export default {
  components: {
    subscribeGoods
  },
  
  data () {
    return {
      id: this.$route.params.id,
      ordersList: [],
      hasRouter: true, // 点击跳转到商品详情页
    }
  },

  created () {
    this.getSubscribeOrders()
  },

  mounted () {
    this.scroll = new BScroll('.wrapper', {
      click: true
    })
  },

  methods: {
    async getSubscribeOrders () {
      this.ordersList = await getSubscribeOrders(this.id)
    },
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
}
.content {
  padding: 10px;
}
.order-list {
  padding: 10px;
}
</style>
