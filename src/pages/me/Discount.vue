<template>
  <div>
    <back :backtitle="toptitle"> </back>
    <div class="top-bar">
      <select-bar :items="discountList" @changeIndex="changeBarIndex" > </select-bar>
    </div>
    <!--未使用-->
    <div  ref="scroll0" v-show="selectIndex===0" class="wrapper">
      <div class="card">
        <coupon v-for="(item,index) in unusedList" :key="index" :page="0" :coupons="item"> </coupon>
      </div>
    </div>
    <!--已使用-->
    <div ref="scroll1"  v-show="selectIndex===1" class="wrapper">
      <div class="card">
        <coupon v-for="(item,index) in usedList" :key="index" :page="1" :coupons="item"> </coupon>
      </div>
    </div>
    <!--已过期-->
    <div ref="scroll2"  v-show="selectIndex===2"  class="wrapper">
      <div class="card">
        <coupon v-for="(item,index) in expiredList" :key="index" :page="2" :coupons="item"> </coupon>
      </div>
    </div>
    <router-link tag="button" to="/me/invite">获取优惠券</router-link>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import SelectBar from '@/components/SelectBar'
  import Back from '@/components/Back'
  import Coupon from '@/components/Discount_coupon.vue'
  import {getCoupons} from "@/api/coupons"
  export default {
    name: "discount",
    components: {
      SelectBar,
      Back,
      Coupon
    },
    data() {
      return {
        tabFirst: [false, true, true], // 选项卡是否第一次加载
        unusedList:[
          {price:50,startTime:'2019.2.5',endTime:'2019.8.5'},
          {price:250,startTime:'2019.2.5',endTime:'2019.8.5'}
        ],
        usedList:[
          {price:50}
        ],
        expiredList:[
          {price:50}
        ],
        selectIndex:Number(this.$route.params.page),
        discountList: ['未使用', '已使用', '已过期'],
        toptitle: '我的优惠券'
      }
    },
    computed:{
      status(){
        return this.selectIndex === 0 ? 'UNUSED' : this.selectIndex === 1 ? 'USED' : 'EXPIRED'
      }
    },
    created(){
      this.getCoupons(0)
      this.getCoupons(1)
      this.getCoupons(2)
    },
    mounted() {
      this.$nextTick(()=>{
        this.initScroll()
      })
    },
    methods:{
      async getCoupons(index){
        const status = index === 0 ? 'UNUSED' : index === 1 ? 'USED' : 'EXPIRED'
        this.$op.loading()
        const data=await getCoupons(status)
        if(index===0){
          this.unusedList=data
        }else if(index===1){
          this.usedList=data
        }else{
          this.expiredList=data
        }
        this.$toast.clear()
      },
      changeBarIndex(index){
        this.selectIndex=index;
        this.$router.replace({name: "Me_discount",params:{page:index}})
      },
      initScroll () {
        this.scroll0 = new BScroll(this.$refs.scroll0)
        this.scroll1 = new BScroll(this.$refs.scroll1)
        this.scroll2 = new BScroll(this.$refs.scroll2)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.top-bar /deep/ ul
  justify-content:space-around
.wrapper
  background-color: #eee
  height:100%
  padding-top:10px
  flex:1
  .card
    width:344px
    margin-left:auto
    margin-right:auto
    .coupon
      margin-top:10px
button
    width:100%
    height:58px
    line-height:58px
    background: #0E948A
    position: fixed
    text-align: center
    bottom:0
    left:0
    font-size: 17px
    color: #FFFFFF
</style>
