<template>
  <div style="height: 100%">
    <div class="header">
      <search v-model="form.keyword" placeholder="搜搜Shavedog精选补给" @search="handleSearch"></search>
      <top-tab :data="tabList" :active="selectedIndex" @change="changeTopTab"></top-tab>
    </div>

    <div class="wrapper" v-for="(tab, tabIndex) in tabList" :key="tabIndex" v-show="tabIndex === selectedIndex">

      <van-list
        v-if="goodsList[tabIndex].length"
        :class="['content', {'is-weapp' : isapp}]"
        v-model="loading"
        :finished="pageList[tabIndex].finished"
        finished-text="没有更多了"
        @load="getGoods">
        <div class="goods-wrapper">
          <router-link :to="{name: 'supply_details', params: {id: item.id}}" tag="div"  class="goods" v-for="(item, index) in goodsList[tabIndex]" :key="index">
            <div class="cover">
              <img :src="item.coverImage" alt="">
            </div>
            <h3 class="name ellipsis">{{item.name}}</h3>
            <div class="price">
              <span>¥{{item.price | toDecimal2}}</span>
              <span v-if="item.isVipPrice" class="price-member">会员价：¥{{item.vipPrice | toDecimal2}}</span>
            </div>
          </router-link>
        </div>
      </van-list>

      <div v-else class="content nogoods">
        <no-goods></no-goods>
      </div>

    </div>
  </div>
</template>

<script>
import topTab from '@/components/topTab'
import search from '@/components/search'
import noGoods from '@/components/noGoods'
import {getCategories, getGoods} from '@/api/goods.js'
export default {
  name: 'list',
  components: {
    topTab,
    search,
    noGoods
  },

  data () {
    return {
      isapp: false,
      active: 0,
      selectedIndex: 0, // 当前选中标签页索引 0: 全部 | 1: 配件 | 2: 护肤 | 3: 其他
      value: '',
      loading: false,
      finished: false,
      goodsList: [[]], // 各分类商品列表-初始化：全部
      // 各分类商品列表对应页码信息-初始化：全部
      pageList: [{
        page: 0,
        total: 0,
        finished: false
      }],
      tabList: [{
          id: 0,
          name: '全部',
      }],
      form: {
        size: 20,
        keyword: '',
        categoryId: '',
      }
    }
  },

  async created () {
    await this.getCategories()
    this.getGoods()
  },

  mounted () {
    // this.$op.isWeChatApplet().then(async res => {
    //   if (res && (this.$op.isIPhoneX() || this.$op.isIPhoneXSMax() || this.$op.isIPhoneXR())) {
    //     this.isapp = true
    //   }
    // })
    if (this.$op.isIPhoneX() || this.$op.isIPhoneXSMax() || this.$op.isIPhoneXR()) {
      this.isapp = true
    }
  },

  methods: {
    async getCategories() {
      this.$op.loading()
      const data = await getCategories()
      this.$toast.clear()
      this.tabList.push(...data)
      // 初始化追加各分类对应的存储数据（全部已默认存在）
      for (let i = 0;i<data.length;i++) {
        this.goodsList.push([])
        this.pageList.push({
          page: 0,
          total: 0,
          finished: false
        })
      }

      // 刷新查询当前分类下的商品
      this.form.categoryId = Number(this.$route.params.type)
      this.selectedIndex = this.tabList.findIndex(item => {
        return item.id === this.form.categoryId
      })
      if (this.selectedIndex < 0) {
        this.active = 0
        this.selectedIndex = 0
        this.form.categoryId = ''
      }
    },
    async getGoods () {
      const searchForm = Object.assign({}, this.form)
      if (Number(searchForm.categoryId) === 0) {
        searchForm.categoryId = ''
      }
      console.log(this.selectedIndex)
      searchForm.page = this.pageList[this.selectedIndex].page
      const data = await getGoods(this.$op.formatSearchData(searchForm))

      this.loading = false
      if (searchForm.page) {
        this.goodsList[this.selectedIndex].push(...data.results)
      } else {
        this.$set(this.goodsList, this.selectedIndex, data.results)
      }

      const total = data.total // 当前分类商品总数
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
    changeTopTab (index, id) {
      console.log('id', id)
      this.selectedIndex = index
      this.form.categoryId = id
      this.$router.replace({ name: "supply", params: { type: id } })
      this.pageList[this.selectedIndex].page = 0
      this.getGoods()
    },

    handleSearch () {
      this.pageList[this.selectedIndex].page = 0
      this.getGoods()
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/_variables.scss';
.wrapper {
  min-height: 100%;
  padding: 90px 0 50px;
  background: #fff;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}

.content.is-weapp {
  margin-bottom: 34px;
}
.content {
  width: 100%;
  min-height: 100%;
  padding: 20px 20px 0;
  background: #fff;
  & /deep/ .van-list__loading {
    width: 100%;
  }
  .goods-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: -25px;
  }
  .goods {
    width: 160px;
    margin-bottom: 25px;
    .cover {
      width: 160px;
      height: 195px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-family: PingFangSC-Semibold;
      margin: 10px 0 5px;
    }
    .price {
      font-size: 12px;
    }
    .price-member {
      margin-left: 14px;
      color: $color-primary;
    }
  }
}
.nogoods {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
