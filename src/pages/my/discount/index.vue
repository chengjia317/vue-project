<template>
  <div>
    <com-tab-title title="我的优惠券"></com-tab-title>
    
    <top-tab class="tab" :data="tabList" :active="selectedIndex" @change="changeTopTab"></top-tab>

    <!-- 未使用 -->
    <div ref="scroll0" :class="['scrollWrapper', {'active': selectedIndex === 0}]">
      <div v-if="!unusedList.length" class="no-data">暂无优惠券</div>
      <div v-else class="content">
        <discount :type="1" :data="item" v-for="(item, index) in unusedList" :key="index"></discount>
      </div>
    </div>

    <!-- 已使用 -->
    <div ref="scroll1" :class="['scrollWrapper', {'active': selectedIndex === 1}]">
      <div v-if="!usedList.length" class="no-data">暂无优惠券</div>
      <div v-else class="content">
        <discount :type="2" :data="item" v-for="(item, index) in usedList" :key="index"></discount>
      </div>
    </div>

    <!-- 已过期 -->
    <div ref="scroll2" :class="['scrollWrapper', {'active': selectedIndex === 2}]">
      <div v-if="!expiredList.length" class="no-data">暂无优惠券</div>
      <div v-else class="content">
        <discount :type="3" :data="item" v-for="(item, index) in expiredList" :key="index"></discount>
      </div>
    </div>

    <router-link to="/invite" class="op-btn-bottom" tag="button">获取优惠券</router-link>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import topTab from "@/components/topTab"
import discount from "@/components/discount"
import {getCoupons} from "@/api/coupons"
export default {
  components: {
    topTab,
    discount
  },

  data() {
    return {
      unusedList: [],
      usedList: [],
      expiredList: [],
      tabFirst: [false, true, true], // 选项卡是否第一次加载
      selectedIndex: Number(this.$route.params.type), // 当前选中标签页索引 0: 未使用 | 1: 已使用 | 2: 已过期
    };
  },

  computed: {
    tabList: function () {
      return [
        {
          name: `未使用${this.unusedList.length}`
        },
        {
          name: `已使用${this.usedList.length}`
        },
        {
          name: `已过期${this.expiredList.length}`
        }
      ]
    },

    status: function () {
      return this.selectedIndex === 0 ? 'UNUSED' : this.selectedIndex === 1 ? 'USED' : 'EXPIRED'
    }
  },

  created() {
    this.getCoupons(0)
    this.getCoupons(1)
    this.getCoupons(2)
  },

  mounted() {
    this.$nextTick(()=>{
      this.initScroll()
    })
  },

  methods: {
    async getCoupons (index) {
      const status = index === 0 ? 'UNUSED' : index === 1 ? 'USED' : 'EXPIRED'
      this.$op.loading()
      const data = await getCoupons(status)
      console.log('coupons list', data)
      if (index === 0) {
        this.unusedList = data
      } else if (index === 1){
        this.usedList = data
      } else {
        this.expiredList = data
      }
      this.$toast.clear()
    },

    changeTopTab(index) {
      this.selectedIndex = index
      this.$router.replace({ name: "my_discount", params: { type: index } })
    },

    initScroll () {
      !this.scroll0 ? this.scroll0 = new BScroll(this.$refs.scroll0) : this.scroll0.refresh()
      !this.scroll1 ? this.scroll1 = new BScroll(this.$refs.scroll1) : this.scroll1.refresh()
      !this.scroll2 ? this.scroll2 = new BScroll(this.$refs.scroll2) : this.scroll2.refresh()
    },
  }
};
</script>

<style lang="scss" scoped>
.scrollWrapper {
  top: 90px;
  bottom: 58px;
}
.content {
  padding: 10px 0;
}
.tab {
  position: fixed;
  width: 100%;
  top: 50px;
  left: 0;
  z-index: 10;
}
.tab /deep/ .item {
  flex: 1;
}
</style>
