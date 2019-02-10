<template>
  <div class="edit-add">
    <back :backtitle="toptitle"> </back>
    <ul class="add-list">
      <li>
        <input type="text"  v-model="users.name" placeholder="收货人姓名">
      </li>
      <li>
        <input type="number" v-model="users.tel" placeholder="联系电话" oninput="if(value.length>11)value=value.slice(0,11)">
      </li>
      <li @click="showArea">
        <span>省/市/区</span>
        <input type="text" v-model="areaName">
        <i class="icon-arrow"></i>
      </li>
      <li>
        <input type="text" v-model="users.address" placeholder="详细地址">
      </li>
      <button class="save" :disabled="disabled" @click="addAddresses">保存地址</button>
    </ul>
    <me-area v-show="isShow" @cofirm="getAdd" @closeMask="closeMask" > </me-area>
  </div>
</template>

<script>
  import Back from '@/components/Back'
  import MeArea from '@/components/Me_area'
  import {addAddresses, editAddresses, getAddressesDetails} from '@/api/address'

  export default {
    name: "address-edit",
    components:{
      Back,
      MeArea
    },
    data(){
      return{
        isShow:false,
        areaName:'',//省市地址
        users:{
          name:'',tel:'',address:'',
          provinceId: '',//省
          cityId: '',//城市
          areaId: '',//区
        }
      }
    },
    created(){
      if(this.id){
        this.initForm();
      }
    },
    computed:{
      disabled(){
        for (let item in this.users) {
          if (this.users[item] === '') {
            return true
          }
        }
        return false
      },
      id(){
        return this.$route.params.id
      },
      toptitle(){
        return this.$route.params.id?'编辑收货地址':'新建收货地址'
      }
    },
    methods:{
      showArea(){
        this.isShow=true
      },
      closeMask(){
        this.isShow=false
      },
      async initForm(){
        this.$op.loading()
        const data=await getAddressesDetails(this.id)
        this.$toast.clear()
        this.users=data
        this.areaName=`${data.provinceName}${data.cityName}${data.areaName}`
        console.log(areaName)
      },
      getAdd(value,name){
        console.log(value,name)
         this.users.provinceId=value[0];
         this.users.cityId=value[1];
         this.users.areaId=value[2];
         this.areaName=name.join('')
      },
      async addAddresses(){
        if(this.id){
          await editAddresses(this.id,this.users)
        }else{
          await addAddresses(this.users)
        }
        this.$toast.clear()
        this.$router.go(-1)
        console.log(this.areaName)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.edit-add
  background: #FFFFFF
  height:100%
  .add-list
    padding:0 20px
    li
      border-bottom:1px solid #EFF3F6
      height:50px
      font-size:15px
      line-height:50px
      color: #222222
      position: relative
      .icon-arrow
        position: absolute
        right:0
        top:50%
        margin-top:-4px
    .save
      width:100%
      margin:67px auto
      height:58px
      background: #0E948A
      border: 1px solid #05726A
      font-size: 17px
      text-align: center
      color: #FFFFFF
</style>
