<template>
  <div v-show="show">
    <div class="mask"></div>
    <div class="wrapper">
      <div class="header flex-sb">
        <h2 class="font-ps">请选择区域</h2>
        <i @click="handleClose" class="op-icon-close"></i>
      </div>
      <div class="content">
        <van-area :area-list="areaList" :visible-item-count="visibleItemCount" @change="change"/>
      </div>
      <div class="footer">
        <button class="op-btn" @click="handleClose">取消</button>
        <button class="op-btn-primary" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getDistricts} from '@/api/address'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visibleItemCount: 3,
      name: ['北京市', '北京市', '东城区'],
      value: [110000,110100,110101],
      areaList: {
        province_list: {
          // 110000: '北京市',
          // 120000: '天津市'
        },
        city_list: {
          // 110100: '北京市',
          // 120100: '天津市',
        },
        county_list: {
          // 110101: '东城区',
          // 110102: '西城区',
          // 110105: '朝阳区',
          // 110106: '丰台区',
          // 120101: '和平区',
          // 120102: '河东区',
          // 120103: '河西区',
          // 120104: '南开区',
          // 120105: '河北区',
        }
      }
    }
  },

  created () {
    this.getDistricts()
  },

  methods: {
    async getDistricts () {
      const data = await getDistricts()
      let cityList = []
      let countyList = []

      data.forEach(province => {
        cityList.push(...province.cities)
      })

      data.forEach(province => {
        province.cities.forEach(city => {
          countyList.push(...city.areas)
        })
      })
      // 重新定义数据格式
      this.areaList.province_list = this.formatData(data)
      this.areaList.city_list = this.formatData(cityList)
      this.areaList.county_list = this.formatData(countyList)
    },

    formatData (data) {
      let result = {}
      data.forEach(item => {
        result[item.id] = item.name
      })
      return result
    },

    change (el, val) {
      this.value = [val[0].code, val[1].code, val[2].code]
      this.name = [val[0].name, val[1].name, val[2].name]
    },

    // 确认选中项
    confirm () {
      this.$emit('confirm', this.value, this.name)
      this.handleClose()
    },

    handleClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 335px;
  transform: translate(-50%, -50%);
  padding: 30px 0;
  background: #FFFFFF;
  border-radius: 5px;
  z-index: 11;
}
.header {
  padding: 0 30px;
  font-size: 18px;
}
.content {
  padding: 25px 0 30px;
}
.footer {
  text-align: center;
  button {
    width: 135px;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
  }
  .op-btn {
    margin-right: 15px;
    color: #000000;
    border: 1px solid #E6EAEE;
  }
}

.van-picker /deep/ .van-picker__toolbar {
  display: none;
}
.van-picker /deep/ .van-picker-column__item {
  font-size: 18px;
}
.van-picker /deep/ .van-picker-column__item--selected {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
}
.van-picker /deep/ .van-picker__frame {
  background: rgba($color: #0E948A, $alpha: .2);
}
</style>
