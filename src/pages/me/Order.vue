<template>
  <div>
    <back :backtitle="toptitle"></back>
    <div class="top-bar">
      <select-bar :items="tabLists" @changeIndex="changeBarIndex"> </select-bar>
    </div>
    <!--全部-->
    <div ref="scroll0"  v-show="selectIndex===0" class="scroll-wrapper" >
      <div class="goods-list">
        <order-good class="order-good" :page="0" v-for="i in 5" :key="i">
          <div slot="header-status">
            <span class="status">待发货</span>
          </div>
          <div slot="bottom-btn" class="bottom-btn">
            <button class="cancle-btn">取消订单</button>
            <button class="pay-btn">付款</button>
          </div>
        </order-good>
      </div>
    </div>
    <!--待付款-->
    <div ref="scroll1"  v-show="selectIndex===1" class="scroll-wrapper">
      <div class="goods-list">
        <order-good class="order-good" :page="1">
          <div slot="header-status">
            <span class="status">待付款</span>
          </div>
          <div slot="bottom-btn" class="bottom-btn">
            <button class="cancle-btn">取消订单</button>
            <button class="pay-btn">付款</button>
          </div>
        </order-good>
      </div>
    </div>
    <!--待发货-->
    <div ref="scroll2"  v-show="selectIndex===2" class="scroll-wrapper">
      <div class="goods-list">
        <order-good class="order-good" :page="2">
          <div slot="header-status">
            <span class="status">待发货</span>
          </div>
          <div slot="bottom-btn" class="bottom-btn">
            <button class="cancle-btn">取消订单</button>
            <button class="pay-btn">付款</button>
          </div>
        </order-good>
      </div>
    </div>
    <!--待收货-->
    <div ref="scroll3"  v-show="selectIndex===3" class="scroll-wrapper">
      <div class="goods-list">
        <order-good class="order-good" :page="3">
          <div slot="header-status">
            <span class="status">待收货</span>
          </div>
          <div slot="bottom-btn" class="bottom-btn">
            <button class="cancle-btn">取消订单</button>
            <button class="pay-btn">付款</button>
          </div>
        </order-good>
      </div>
    </div>
    <!--全部订单-->
    <div ref="scroll4"  v-show="selectIndex===4" class="scroll-wrapper">
      <div class="goods-list">
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Back from '@/components/Back'
  import SelectBar from '../../components/SelectBar.vue'
  import OrderGood from '../../components/Order_good.vue'

  export default {
    components:{
      Back,
      SelectBar,
      OrderGood
    },
    data(){
      return{
        selectIndex:Number(this.$route.params.page),
        tabLists:['全部','待付款','待发货','待收货','已完成'],
        toptitle:'我的订单',
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initScroll()
      })
    },
    methods:{
      initScroll (){
        this.scroll0 = new BScroll(this.$refs.scroll0)
        this.scroll1 = new BScroll(this.$refs.scroll1)
        this.scroll2 = new BScroll(this.$refs.scroll2)
        this.scroll3 = new BScroll(this.$refs.scroll3)
        this.scroll4 = new BScroll(this.$refs.scroll4)
      },
      changeBarIndex(index){
        this.selectIndex=index;
        this.$router.replace({name:'Me_Order',params:{page:index}})
        console.log(this.selectIndex);

      }
    }
  }
</script>

<style lang="stylus" scoped>
.top-bar>>>ul
  padding-left:15px
.top-bar>>>ul li
  margin-right:23px
.goods-list
  margin-top: 10px
  background-color: #eee
  margin-left:10px
  margin-right:10px
  .order-good/deep/ .status
    font-size:14px
    color: #0E948A
  .order-good/deep/ .bottom-btn
    display: flex
    justify-content:flex-end
    margin-top:18px
  .order-good/deep/ button
    width:65px
    height:24px
    border: 1px solid #444444
    border-radius: 2px
    background: #fff
    margin-left:10px
    font-size: 12px
    color: #444444
  .order-good/deep/ .pay-btn
    width:56px
    color:#0E948A
    border: 1px solid #0E948A
    border-radius: 2px
</style>
