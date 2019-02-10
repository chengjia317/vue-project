<template>
  <div class="sub">
    <h4 class="nav-title">订阅</h4>
    <div class="part1">
      <div class="logo">
        <img src="~images/SHAVEDOG.png" alt="">
      </div>
      <h1 class="bold">茬狗订阅会员</h1>
      <p class="light">钱不一定要花在刀刃上 想换就换的新鲜剃须刀</p>
      <div class="btn">
        <button class="begin-sub btn1 bold" @click="startSub">开始订阅</button>
        <button class="gift btn1 normal">
          <i class="icon-gift"></i>
        赠礼
        </button>
      </div>
    </div>
    <div class="part2">
      <h2 class="bold">茬狗会员特权</h2>
      <p class="price">仅需¥150/每年</p>
      <ul class="list2">
        <li>
          <h3>畅享12个刀头</h3>
          <p>一年四期，我们每三个月为会您寄送3个新鲜刀头。</p>
        </li>
        <li>
          <h3>独享商品折扣</h3>
          <p>会员购买其他补给商品时享受折扣价，并会获得额外刀头，节省您的每一分钱。</p>
        </li>
        <li>
          <h3>多次订购自动续期</h3>
          <p>如果您多次订购会员，会自动为您的会员期限续期。</p>
        </li>
      </ul>
    </div>
    <div class="part3">
      <h2 class="bold">来看看瞧瞧都有啥</h2>
      <ul class="list2">
        <li>
          <div>
            <img src="~images/subpic2.png" alt="">
          </div>
          <h3>第一期配送内容</h3>
          <div class="text">
            <p>3个新鲜刀头/一只狗头盔</p>
            <p>一个自主站立式手柄（不能震动哦）</p>
            <p>一瓶氨基酸芦荟剃须膏（湿刮高潮全靠它）</p>
          </div>
        </li>
        <li>
          <div>
            <img src="~images/subpic3.png" alt="">
          </div>
          <h3>后续三期补给盒</h3>
          <div class="text">
            <p>之后每三个月都会将补给盒送货上门，每个补给盒含3个价值XX元的刀头。</p>
          </div>
        </li>
      </ul>
      <div class="btn">
        <button class="begin-sub btn1" @click="startSub">开始订阅</button>
        <button class="gift btn1 ">
          <i class="icon-gift"></i>
          赠礼
        </button>
      </div>
    </div>
    <div class="part4">
      <div>
        <img src="~images/subpic4.png" alt="">
      </div>
      <div class="main">
        <p class="main-title">刀头这东西，如果没用过，吹多了都是假，长得都差不多， 无非金属+塑料。</p>
        <h3 class="main-des">既然如此，快听我们吹吹:</h3>
        <ul>
          <li>· 由瑞典钢材 Sandvik 打造</li>
          <li>· 自有专利，安全辅助滑轮 </li>
          <li>· PTFE 铂金刀锋涂层</li>
          <li>· 维他命E芦荟润滑条</li>
          <li>· 5+1 层刀片各自分工</li>
          <li>· 太空银刀柄，镀铬工艺</li>
          <li> ...</li>
        </ul>
        <h3 class="main-con">茬狗能自己站着，一直站着，不靠别人，</h3>
        <p>这如今， 挺重要的。</p>
      </div>
    </div>
    <div class="part5">
      <div>
        <img src="~images/subpic5.png" alt="">
      </div>
      <div class="main">
        <h3 class="main-title">湿刮的世界里，不应该再有高压瓶喷出的泡泡</h3>
        <ul>
          <li>一切剃须前的准备，都是为了</li>
          <li style="font-size: 20px">唤醒皮肤，软化胡须。</li>
          <li>冰冷的高压乙烷泡沫，</li>
          <li>不仅会增加皮肤的不适和刺痛感，</li>
          <li>大量酒精还会让皮肤快速失去水分，</li>
          <li>干燥紧绷。</li>
          <li>我们的芦荟精华膏状粘稠物，</li>
          <li>不会。</li>
        </ul>
        <div class="btn">
          <button class="begin-sub btn1" @click="startSub">开始订阅</button>
          <button class="gift btn1 ">
            <i class="icon-gift"></i>
            赠礼
          </button>
        </div>
      </div>
    </div>
    <div class="part6">
      <div>
        <img src="~images/subpic6.png" alt="">
      </div>
      <div class="content">
        <h2>不把我们用倒闭了，
          <br/>算你输</h2>
        <p>剃须刀的工厂来自于我们创始团队成员之一的家族，出口外贸的生意已经做了十四年，也正是依靠自有的生产供应链，我们才能打破行业原有的定价规则，真正为大家提供价格合理，质量上乘的刀锋体验。</p>
        <p>我们其他的产品，从设计、打样到全自动生产，全都是和中国本土工厂合作，产品的持续更新和迭代具有十足的保证。</p>
        <p>所以，刀头真的请随便用，不把我们用倒闭了，算你输。</p>
      </div>
    </div>
    <div class="part7">
      <h4 class="title">Ours vs Theirs</h4>
      <div class="col">
        <ul>
          <li class="us">
            <span>我们的</span>
            <div class="chat chat1">
              <i>￥</i>9
            </div>
          </li>
          <li class="theirs">
            <span>TA们的</span>
            <div class="chat chat2" >
              <i>￥</i>30+
            </div>
          </li>
        </ul>
        <p>刀头平均单价对比</p>
      </div>
      <p class="bottom">告别中间商，告别品牌税，告别明星广告</p>
      <h1>价格，早就该真诚一点</h1>
    </div>
    <div class="part8">
      <div class="content">
        <p>你应该开始察觉到</p>
        <p>所有这一切</p>
        <p>意味着什么</p>
        <p>不好意思，本产品不能试用</p>
        <p>茬狗会员，一养一年</p>
        <p>还等什么</p>
        <p>还等什么</p>
        <p>Shavedog</p>
        <p>愿你的刀刃永远锋利</p>
        <p>.</p>
        <p>.</p>
        <p>和干净</p>
        <div class="btn">
          <button class="begin-sub btn1" @click="startSub">开始订阅</button>
          <button class="gift btn1 ">
            <i class="icon-gift"></i>
            赠礼
          </button>
        </div>
      </div>
    </div>
    <tab-bar> </tab-bar>
    <detail-order v-show="showOrder" @closeMask="closeMask"> </detail-order>
  </div>
</template>

<script>
  import TabBar from '@/components/Tabbar.vue'
  import DetailOrder from '@/components/Detail_order'

  export default {
    name: "sub1",
    components:{
      TabBar,
      DetailOrder
    },
    data(){
      return{
        showOrder:false
      }
    },
    methods:{
      startSub(){
        this.showOrder=true
      },
      closeMask(){
        this.showOrder=false
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
.list2
  padding: 0 44px
  overflow: hidden
  background: #FFFFFF
  box-shadow: 0 3px 12px 0 rgba(0,0,0,0.05)
  border-radius: 4px
  padding-bottom:50px
.part1
  height: 436px
  background:url('~images/subpic1.png') no-repeat
  -webkit-background-size: cover
  background-size: cover
  .logo
    text-align: center
    padding-top:42.3px
    padding-bottom:4.7px
    img
      width:77.5px
      height:8px
  h1
    font-size: 36px
    color: #008489
    text-align: center
    margin-top:4.3px
  p
    font-size: 16px
    color: #000000
    text-align: center
    line-height: 28px
    width:160px
    margin: 9px auto
  .btn
    margin:30px 46px 0 47px
    .begin-sub
      width: 60%
    .gift
      width:35%
.part2
  background-color: #fcfcfc
  margin-top:50px
  text-align: center
  h2
    font-size: 28px
    color: #263645
  .price
    margin: 10px 0 15px
    font-size: 14px
    color: #0E948A
  .list2
    margin: 15px 20px 0 20px
    li
      font-size: 20px
      color: #263645
      h3
        margin:50px 0 12px
        color: #263645
        font-weight: 600
      p
        font-size: 14px
        color: #868686
        line-height: 24px
.part3
  background-color: #fcfcfc
  margin:50px 0
  text-align: center
  h2
    font-size: 28px
    color: #0E948A
  .list2
    margin:30px 20px 0 20px
    padding-top:20px
    h3
      font-size: 12px
      color: #0E948A
      margin-bottom:25px
    p
      font-size: 14px
      color: #868686
      line-height:24px
      margin-bottom:3px
  .btn
    margin:30px  20px 50px 20px
    overflow: hidden
.part4
  background-color: #fcfcfc
  .main
    margin:25px 20px 70px 20px
    .main-title
      font-size: 14px
      color: #263645
      line-height: 25px
    .main-des
      font-size: 20px;
      color: #001800;
      line-height:75px
    ul
      font-size:14px
      line-height:25px
    .main-con
      margin-top:25px
      margin-bottom:25px
      font-size: 24px
      color: #0E948A;
      line-height:40px
.part5
  .main
    margin:50px 20px 55px  20px
    .main-title
      font-size: 28px;
      color: #263645;
      line-height: 40px
    ul
      margin-top:16px
      margin-bottom:26px
      li
        line-height:36px
      li:last-child
        font-size: 28px;
        color:#0E948A
  .btn
    overflow: hidden
.part6
  background: #C3CDCF
  .content
    margin:30px 21px 0 22px
    padding-bottom:38px
    h2
      font-size: 28px
      color: #263645
      line-height:40px
    p
      margin-top:37px
      line-height: 29px
.part7
  text-align: center
  .title
    margin-top: 50px
    margin-bottom: 46px
    font-size: 28px;
    color: #0E948A;
  .col
    margin-bottom: 30px
    ul
      display: flex
      justify-content :center
      li
        display:flex
        flex-direction: column
        font-size: 18px
        align-self:flex-end
        color: #FFFFFF
        span
          font-size: 12px
          color: #263645
          margin-bottom: 17px
        .chat
          font-size: 24px
          width:86px
          border-radius: 4px
          i
            font-size:18px
        .chat1
          margin-right: 16px
          height:51px
          line-height: 51px
          background-color:#0E948A
        .chat2
          height:194px
          line-height: 194px
          background: #60899F
    p
      margin-top:17px
      font-size: 12px
      font-weight:600
  .bottom
    margin-top:30px
    line-height:50px
  h1
    font-size: 28px;
    margin-bottom:60px
.part8
  background: #0E948A
  text-align: center
  padding:60px 0 50px
  .content
    font-size:15px
    color: #FFFFFF
    p
      line-height:40px
    p:nth-child(5)
      font-size:28px
    .btn
      margin:50px 20px 0
      overflow:hidden
      .begin-sub
        background-color: #222222
      .gift
        background-color: #222222
</style>
