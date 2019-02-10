<template>
  <div>
    <div class="supply">
      <div class="header">
        <p>补给</p>
        <search v-model="form.keyword" @search="handleSearch"> </search>
        <select-bar :items="tabLists" @changeIndex="changeBarIndex"> </select-bar>
      </div>
      <div class="content-wrapper" v-show="tabIndex===selectIndex" v-for="(good,tabIndex) in tabLists" :key="tabIndex" >
        <van-list
          class="content"
          v-if="goodsList[tabIndex]"
          v-model="loading"
          :finished="pageList[tabIndex].finished"
          finished-text="没有更多了"
          @load="getGoods"
        >
          <div class="goods-wrapper">
            <router-link tag="div" class="good" :to="{name:'Detail_supply',params:{id:item.id}}" v-for="(item,goodIndex) in goodsList[tabIndex]" :key="goodIndex">
              <div class="img-wrapper">
                <img src="~images/subpic3.png" alt="" height="195px">
              </div>
              <h4 class="good-title bold ellipsis">{{item.goodsname}}</h4>
              <p class="good-des">¥{{item.price}}&nbsp&nbsp&nbsp&nbsp<i class="price">会员价：&nbsp¥{{item.vipprice}}</i></p>
            </router-link>
          </div>
        </van-list>
        <div v-else>
          <no-goods> </no-goods>
        </div>
      </div>
    </div>
    <tab-bar> </tab-bar>
  </div>
</template>

<script>
  import Search from '@/components/Search.vue'
  import SelectBar from '@/components/SelectBar.vue'
  import NoGoods from '@/components/NoGoods.vue'
  import TabBar from '@/components/Tabbar.vue'
  import {getCategories, getGoods} from '@/api/goods.js'
  export default {
    name:'list-supply',
    data(){
      return{
        goods:true,
        loading: false,
        finished: false,
        tabLists:['全部','配件','护肤','其他'],
        selectIndex:Number(this.$route.params.page),
        goodsList:{
          0:[{id:0,goodsname:'Shavedog剃须膏300ml',price:96,vipprice:76.8},
           {id:1,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:2,goodsname:'Shavedog剃须膏300ml',price:96,vipprice:76.8},
            {id:3,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:4,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:5,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:6,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:7,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8},
            {id:8,goodsname:'Shavedog剃须膏3000ml',price:200,vipprice:76.8}

          ],
          1:[{id:0,goodsname:'Shavedog剃须膏50ml',price:96,vipprice:76.8}],
          2:[{id:0,goodsname:'Shavedog剃须膏2000ml',price:90,vipprice:76.8}]
        },
        pageList:[
          {page:10,total:30,finished:false},
          {page:1,total:0,finished:true},
          {page:2,total:0,finished:false},
          {page:3,total:0,finished:false}
        ],
        form:{
          size:20,
          keyword:'',
          categoryId:''
        }

      }
    },
    components:{
      TabBar,
      Search,
      SelectBar,
      NoGoods,
    },
    created(){
      this.selectIndex=Number(this.$route.params.page)||0
    },
    methods:{
      changeBarIndex(index){
        this.selectIndex=index;
        this.$router.replace({name:'List_supply',params:{page:index}})
        console.log(selectIndex)
      },
      async getGoods(){
        const searchForm=Object.assign({},this.form)

        if(Number(searchForm.categoryId===0)){
          searchForm.categoryId=''
        }
        searchForm.page=this.pageList[this.selectIndex].page
        const data=await getGoods(searchForm)
        this.loading=false
        if(searchForm.page){
          this.goodsList[this.selectIndex].push(...data.results)
        }else{
          this.$set(this.goodsList,this.selectIndex,data.results)
        }
        const total=data.total
        const current=this.pageList[this.selectIndex].page //当前页数
        this.pageList[this.selectIndex].total=total
        if(total>current*this.form.size){
          this.pageList[this.selectIndex].finished=false
          console.log(8)
        }else{
          this.pageList[this.selectIndex].finished=true
        }
        this.pageList[this.selectIndex].page++;
      },
      handleSearch(){
        this.pageList[this.selectIndex].page=0;
        this.getGoods()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/common.styl"
.supply
  padding:33px 15px 0 15px
  color: #000
  height:100%
  background-color: #fff
  .header
    p
      font-size:17px
      margin-bottom:19px
  .content
    margin-left:6px
    padding-top:20px
    .goods-wrapper
      display: flex
      justify-content:space-between
      flex-wrap:wrap
      .good
        width:46%
        margin-bottom:25px
        .img-wrapper
          border:1px solid #ccc
      .good-title
        font-size:14px
        color: #222222
        margin:10px 0 5px
      .good-des
        font-size:12px
        line-height: 20px
        color: #00363B
        .price
          color:#25a4bb
</style>
