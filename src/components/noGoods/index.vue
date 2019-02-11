<template>
  <div class="nogoods-wrapper">
    <div class="no-goods">
      <div class="image">
        <img src="../../assets/image/no_goods.png" />
      </div>
      <p>暂无商品</p>
      <router-link tag="button" :to="{name: 'subscribe'}" class="op-btn">
        <i class="op-icon-vip-green"></i>了解会员权益
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.nogoods-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}
.no-goods {
  color: rgba(34, 34, 34, .5);
  text-align: center;
  .image{
    margin: 0 auto 22px;
    width: 140px;
  }
  .op-btn {
    margin-top: 50px;
    width: 160px;
    height: 44px;
    line-height: 44px;
    background: rgba(0, 132, 137, .2);
    .op-icon-vip-green {
      margin-right: 8px;
    }
  }
}
</style>

