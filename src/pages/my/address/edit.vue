<template>
  <div>
    <com-tab-title :title="tabTitle"></com-tab-title>
  
    <div class="page">
      <ganged :show.sync="show" @confirm="getArea"></ganged>
      <ul class="address-list">
        <li>
          <input v-model="form.recipient" type="text" placeholder="收货人姓名">
        </li>
        <li>
          <input v-model="form.phone" type="number" placeholder="联系电话" oninput="if(value.length>11)value=value.slice(0,11)">
        </li>
        <li @click="show=true">
          <span>省/市/区</span>
          <input disabled v-model="areaName" type="text">
          <i class="op-icon-arrow"></i>
        </li>
        <li>
          <input v-model="form.address" type="text" placeholder="详细地址">
        </li>
      </ul>
      <button :disabled="disabled" class="op-btn-primary" @click="addAddresses">保存地址</button>
    </div>
  </div>
</template>

<script>
import ganged from '@/components/ganged'
import {addAddresses, editAddresses, getAddressesDetails} from '@/api/address'
export default {
  components: {
    ganged
  },

  data () {
    return {
      submitFlag: false, // 是否提交信息
      show: false,
      areaName: '', // 省市区显示字符
      form: {
        recipient: '',
        phone: '',
        provinceId: '',
        cityId: '',
        areaId: '',
        address: ''
      }
    }
  },

  computed: {
    disabled: function () {
      for (let item in this.form) {
        if (this.form[item] === '') {
          return true
        }
      }
      return false
    },

    id: function () {
      return this.$route.params.id
    },

    tabTitle: function () {
      return this.$route.params.id ? '编辑收货地址' : '新建收货地址'
    }
  },

  created () {
    if (this.id) {
      this.initForm()
    }
  },

  beforeRouteLeave (to, from, next) {
    if (this.submitFlag) {
      to.meta.keepAlive = false
    } else {
      to.meta.keepAlive = true
    }
    next()
  },

  methods: {
    async initForm () {
      this.$op.loading()
      const data = await getAddressesDetails(this.id)
      console.log('address details', data)
      this.$toast.clear()
      this.form = data
      this.areaName = `${data.provinceName}${data.cityName}${data.areaName}`
    },

    getArea (value, name) {
      this.form.provinceId = value[0]
      this.form.cityId = value[1]
      this.form.areaId = value[2]
      this.areaName = name.join('')
    },

    async addAddresses () {
      if (this.$op.validate.phone(this.form.phone)) {
        this.$op.loading('正在提交')
        if (this.id) {
          await editAddresses(this.id, this.form)
        } else {
          await addAddresses(this.form)
        }
        this.$toast.clear()
        this.submitFlag = true
        this.$router.go(-1)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
input{
  flex: 1;
  height: 50px;
  font-size: 15px;
  background: none;
  border: none;
}
input[disabled] {
  text-align: right;
  color:#000;
  opacity:1
}
input::input-placeholder{
  color: #C5C5C5;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #C5C5C5;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  color: #C5C5C5;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #C5C5C5;
}
.page {
  padding: 50px 20px 0;
}
.address-list {
  margin-bottom: 60px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li+li {
    border-top: 1px solid #EFF3F6;
  }
  .op-icon-arrow {
    margin-left: 15px;
  }
}
.op-btn-primary {
  height: 58px;
  line-height: 58px;
}
</style>
