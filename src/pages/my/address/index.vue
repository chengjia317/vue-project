<template>
  <div>
    <com-tab-title :title="tabTitle"></com-tab-title>
    <div class="wrapper">
      <div v-if="!dataList.length" class="no-data">暂无添加地址</div>
      <div class="content">
        <template  v-if="dataList.length">
          <div class="address-wrapper" v-for="(item, index) in dataList" :key="index">
            <div @click="handleSelecte(item.id)">
              <input v-if="canSelecte" hidden v-model="addressId" type="radio" :value="item.id">
              <div class="address-info">
                <div class="user">
                  <span class="name">{{item.recipient}}</span>
                  <span>{{item.phone | formatPhone}}</span>
                </div>
                <div class="address">{{item.provinceName}}{{item.cityName}}{{item.areaName}} {{item.address}}</div>
              </div>
              <div class="radio-wrapper" v-if="canSelecte">
                <div class="radio-checked" v-if="selecteId === item.id">
                  <img src="../../../assets/image/icon_radio_checked.png">
                </div>
                <div class="radio" v-else>
                  <img src="../../../assets/image/icon_radio.png">
                </div>
                <span class="tag" v-show="selecteId === item.id">当前地址</span>
              </div>
              <div class="button-wrapper">
                <button class="op-btn-text" @click.stop="handleEdit(item.id)" type="button">编辑</button>
                <button class="op-btn-text" @click.stop="handleDelete(item.id, index)" type="button">删除</button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <router-link to="/my/address/edit" tag="button" class="op-btn-bottom"><i class="op-icon-add"></i> 新建收货地址</router-link>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      canSelecte: true, // 地址是否为可选状态
      addressId: this.selecteId, // 当前选中的地址id
    }
  },

  watch: {
    addressId () {
      this.$store.commit('SELECTE_ADDRESS', this.addressId)
    }
  },

  computed: {
    dataList () {
      return this.$store.state.address.dataList
    },

    selecteId () {
      return this.$store.state.address.selectedId      
    },

    tabTitle () {
      return this.canSelecte ? '选择地址' : '我的地址'
    }
  },

  beforeRouteEnter (to, form, next) {
    next(vm => {
      vm.canSelecte = to.query.mode === 'select'
    })
  },

  created () {
    this.getAddressList()
  },

  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.wrapper', {
        click: true,
        mouseWheel: true
      })
    })
  },

  methods: {
    async getAddressList () {
      this.$store.dispatch('getAddresses')
    },

    handleEdit (id) {
      this.$router.push({name: 'my_address_edit', params: {id} })
    },

    handleDelete (id, index) {
      this.$store.dispatch('deleteAddress', id, index)
    },

    handleSelecte (selecteId) {
      this.addressId = selecteId
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  position: absolute;
  left: 0;
  bottom: 9px;
  margin-bottom: -10xp;
  width: 16px;
}
.radio-checked {
  position: absolute;
  left: 0;
  bottom: 3px;
  margin-left: -4px;
  width: 24px;
}
.radio-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
}
.wrapper {
  position: fixed;
  top: 50px;
  bottom: 58px;
  width: 100%;
  background: #fff;
}
.content {
  padding: 0 20px;
}
.address-wrapper{
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid #EFF3F6;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}
.op-btn-text {
  margin-left: 10px;
  width: 56px;
}
.op-btn-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  .op-icon-add {
    margin-right: 6px;
  }
}
.tag {
  display: inline-block;
  margin: 0 0 12px 30px;
  color: #0E948A;
}

</style>
