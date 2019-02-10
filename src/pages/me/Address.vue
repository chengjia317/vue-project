<template>
  <div>
    <back :backtitle="toptitle"> </back>
    <div class="no-address" v-if="isAddress">暂无添加地址</div>
    <div class="wrapper" v-if="!isAddress">
      <div class="information" v-for="(item,index) in userData" :key="index">
        <div class="user">
          <span class="user-name">{{item.userName}}</span>
          <span class="user-tel">{{item.userTel}}</span>
        </div>
        <div class="address">{{item.userAdd}}</div>
        <div class="radio" v-if="canSelect">
          <div class="radio-wrapper" v-if="selectId===item.id">
            <img src="~images/icon_radio_checked.png" alt="">
          </div>
          <div class="radio-wrapper" v-else>
            <img src="~images/icon_radio.png" alt="">
          </div>
          <span class="now-add" v-if="selectId===item.id">当前地址</span>
        </div>
        <div class="aside-button">
          <button class="edit-btn" @click="handleEdit(item.id)">编辑</button>
          <button class="del-btn" @click="handleDelete(item.id,index)">删除</button>
        </div>
      </div>
    </div>
    <router-link tag="button" class="add-address" to="/me/address/edit">
      <i class="icon-add-white"></i>
      新建收货地址</router-link>
  </div>
</template>

<script>
  import Back from '@/components/Back'
  export default {
    name: "address",
    components:{
      Back
    },
    data(){
      return{
        canSelect:true,
        isAddress:'',
        userData: [
          {id:0,userName: '程思嘉', userTel: 1888888, userAdd: '北京市海淀区四环到五环之间 爱奇艺创新大厦'},
          {id:1,userName: '瑾忆', userTel: 166666, userAdd: '北京市海淀区四环到五环之间 '}
        ],
        selectId:0
      }
    },
    created(){
      this.getAddressList()
    },
    watch:{
      selectId(){
        this.$store.commit('SELECT_ADDRESS', this.addressId)
      }
    },
    computed:{
      dataList(){
        return this.$store.state.address.dataList
      },
      selectId(){
        return this.$store.state.address.selectedId
      },
      toptitle(){
        return this.canSelect?'选择地址':'我的地址'
      }
    },
    methods:{
      handleEdit(id){
        this.$router.push({name:'Me_address_edit',params:{id:id}})
      },
      handleDelete(id,index){
        this.$store.dispatch('deleteAddress',id,index)
      },
      async getAddressList(){
        this.$store.dispatch('getAddresses')
      }
    },
    beforeRouteEnter(to,form,next){
      next(vm=>{
        vm.canSelect=to.query.mode==='select'
      })
    },
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.no-address
  width:100%
  position:fixed
  top:45%
  text-align: center
.add-address
  width:100%
  height:58px
  background: #0E948A
  text-align: center
  position: fixed
  bottom:0
  font-size: 17px
  color: #FFFFFF
  line-height:58px
.wrapper
  margin: 0 20px
  height:100px
  .information
    border-bottom: 1px solid #EFF3F6
    position: relative
    padding:10px 0
    .user
      font-size: 15px
      color: #222222
      font-weight:550
      .user-name
        margin-right:30px
    .address
      margin-top: 6px
      font-size:12px
      color:#444
    .radio
      margin-top:23px
      display: flex
      align-items:center
      .radio-wrapper
        width: 20px
        height:20px
        margin-right:11px
        img
          -webkit-background-size: cover
          background-size: cover
          width:100%
      .now-add
        font-size: 12px
        color: #0E948A
    .aside-button
      position: absolute
      bottom:10px
      right:0
      button
        width:56px
        height:24px
        border: 1px solid #444444
        border-radius: 2px
        font-size: 12px
        color: #444444
        background: #fff
      .edit-btn
        margin-right:10px
</style>
