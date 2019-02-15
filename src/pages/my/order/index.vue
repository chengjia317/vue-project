<template>
  <div style="height: 100%">
    <com-tab-title title="我的订单"></com-tab-title>

    <top-tab class="tab" :data="tabList" :active.sync="selectedIndex" @change="changeTopTab"></top-tab>
    
    <div class="btn-wrapper">
      <router-link :to="{name: 'my_subscribe'}" class='op-btn-text' tag="button"><i class="op-icon-right"></i>查看订阅订单</router-link>
    </div>

    <div class="wrapper" v-for="(tab, tabIndex) in tabList" :key="tabIndex" v-show="tabIndex === selectedIndex">
      <van-list
        v-if="ordersList[tabIndex].length"
        class="content"
        v-model="loading"
        :finished="pageList[tabIndex].finished"
        finished-text="没有更多了"
        @load="getOrder">
        <div class="order-list">
          <order :data="item" :index="index" v-for="(item, index) in ordersList[tabIndex]" :key="index" @success='handelSuccess'></order>
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
      if (searchForm.page === 0) {
        this.$set(this.ordersList, this.selectedIndex, [])
      }
      
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
      this.pageList[this.selectedIndex].page = 0
      this.getOrder()
    },

    // 取消订单成功|支付成功回调
    handelSuccess (index, status) {
      if (this.selectedIndex === 1) {
        this.ordersList[this.selectedIndex].splice(index, 1)
      } else {
        this.$set(this.ordersList[this.selectedIndex][index], 'status', status)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 40px;
}
.btn-wrapper {
  position: fixed;
  left: 10px;
  right: 10px;
  height: 40px;
  top: 90px;
  z-index: 9;
  display: flex;
  justify-content: center;
  justify-items: center;
  background: #f6f8f9;
}
.op-btn-text {
  height: auto;
  border: none;
}
.op-icon-right {
  margin-right: 4px;
}
.tab {
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 9;
}
.wrapper {
  min-height: 100%;
  background: #f6f8f9;
  padding-top: 120px;
}
.tab {
  position: fixed;
  top: 50px;
  width: 100%;
}
.order-list {
  padding: 10px;
  padding-bottom: 0;
}

.status {
  font-size: 14px;
  color: #0E948A;
}
</style>
