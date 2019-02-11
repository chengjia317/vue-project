<template>
  <div>
    <com-tab-title title="我的订单"></com-tab-title>

    <top-tab class="tab" :data="tabList" :active.sync="selectedIndex" @change="changeTopTab"></top-tab>
    
    <div class="wrapper" v-for="(tab, tabIndex) in tabList" :key="tabIndex" v-show="tabIndex === selectedIndex">
      <van-list
        @touchmove.prevent
        v-if="ordersList[tabIndex].length"
        class="content"
        v-model="loading"
        :finished="pageList[tabIndex].finished"
        finished-text="没有更多了"
        @load="getOrder">
        <div class="order-list">
          <order :data="item" v-for="(item, index) in ordersList[tabIndex]" :key="index"></order>
        </div>
      </van-list>

      <div v-else class="no-data">暂无订单</div>
    </div>
  </div>
</template>

<script>
import topTab from '@/components/topTab'
import order from '@/components/order'
import {getOrders} from '@/api/order'
export default {
  components: {
    topTab,
    order
  },
  
  data () {
    return {
      loading: false,
      finished: false,
      ordersList: [[], [], [], [], []],
      pageList: [{
        page: 0,
        total: 0,
        finished: false
      }, {
        first: true,
        page: 0,
        total: 0,
        finished: false
      }, {

        page: 0,
        total: 0,
        finished: false
      }, {
        page: 0,
        total: 0,
        finished: false
      }, {
        page: 0,
        total: 0,
        finished: false
      }],
      selectedIndex: Number(this.$route.params.type),
      hasRouter: true, // 点击跳转到商品详情页
      form: {
        status: '',
        size: 20
      },
      tabList: [
        {
          name: '全部',
        },
        {
          name: '待付款',
        },
        {
          name: '待发货',
        },
        {
          name: ' 待收货',
        },
        {
          name: '已完成',
        },
      ]
    }
  },

  created () {
    this.getOrder()
  },

  methods: {
    async getOrder () {
      switch (this.selectedIndex) {
        case 0:
          this.form.status = ''
          break
        case 1:
          this.form.status = 'WAIT'
          break
        case 2:
          this.form.status = 'PAID'
          break
        case 3:
          this.form.status = 'DELIVERED'
          break
        case 4:
          this.form.status = 'FINISH'
          break
      }
      
      const searchForm = Object.assign({}, this.form)
      searchForm.page = this.pageList[this.selectedIndex].page
      
      const data = await getOrders(this.$op.formatSearchData(searchForm))
      this.loading = false

      this.ordersList[this.selectedIndex].push(...data.results)

      const total = data.total // 当前状态订单总数
      const current = this.pageList[this.selectedIndex].page
      this.pageList[this.selectedIndex].total = total

      if (total > (current) * this.form.size) {
        this.pageList[this.selectedIndex].finished = false
      } else {
        this.pageList[this.selectedIndex].finished = true
      }
      this.pageList[this.selectedIndex].page++
    },

    // 切换顶部分类
    changeTopTab (index) {
      this.selectedIndex = index
      this.$router.replace({name: 'my_order', params: {type: index}})
      // 自动加载第一页数据
      if (this.pageList[this.selectedIndex].page === 0) {
        this.getOrder()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.tab {
  position: fixed;
  top: 50px;
  width: 100%;
}
.wrapper {
  width: 100%;
  position: fixed;
  top: 90px;
  bottom: 0;
  overflow: auto;
}
.tab {
  position: fixed;
  top: 50px;
  width: 100%;
}
.order-list {
  padding: 10px;
}

.status {
  font-size: 14px;
  color: #0E948A;
}
</style>
