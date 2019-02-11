<template>
  <div>
    <com-tab-title title="我的订阅"></com-tab-title>

    <div class="wrapper">
      <div v-if="!dataList.length" class="no-data">暂无订阅</div>
      <div v-else class="content">
        <router-link v-for="(item, index) in dataList" :key="index" tag="div" class="subscribe" :to="{name: 'my_subscribe_list', params: {id: item.id}}">
          <div class="header flex-sb">
            <div class="logo">
              <img src="../../../assets/image/s_big.png" alt="">
            </div>
            <h2 class="name">SHAVEDOG纯爷们1号清爽套餐</h2>
          </div>
          <div class="info">
            <div class="date">会员日期：{{item.startAt | formatDate}}至{{item.endAt | formatDate}}</div>
            <div>收货地址：{{item.address.provinceName}}{{item.address.cityName}}{{item.address.areaName}}{{item.address.address}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getSubscribe} from '@/api/order'
export default {
  data () {
    return {
      dataList: []
    }
  },

  async created () {
    this.$op.loading()
    this.dataList = await getSubscribe()
    this.$toast.clear()
  },

  mounted () {
    this.scroll = new BScroll('.wrapper', {
      click: true
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: fixed;
  top: 50px;
  bottom: 0;
}
.content {
  padding: 20px 15px;
}
.subscribe + .subscribe {
  margin-top: 10px;
}
.subscribe {
  background-image: linear-gradient(90deg, #585766 0%, #3C3C45 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10);
  overflow: hidden;
  .header {
    padding: 19px 25px 29px;
    .logo{
      width: 58px;
      height: 58px;
    }
    .name {
      flex: 1;
      margin-left: 18px;
      font-family: PingFangSC-Semibold;
      font-size: 24px;
      color: #E9C984;
      text-shadow: 0 1px 1px rgba(0,0,0,0.20);
    }
  }
  .info {
    padding: 13px 23px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba($color: #fff, $alpha: .5);
    background: rgba($color: #000, $alpha: .2);
    .date {
      margin-bottom: 6px
    }
  }
}
</style>
