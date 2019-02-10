<template>
  <div>
    <keep-alive include="List-supply">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import TabBar from '@/components/Tabbar.vue'

  export default {
    name: "supply",
    components:{
      TabBar,
    }
  }
</script>

<style lang="stylus" scoped>

</style>
