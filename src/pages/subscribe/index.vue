<template>
  <div>
    <div :class="['wrapper', {'is-weapp': isapp}]">
      <div class="section">
        <div class="section1">
          <div class="logo">
            <img src="../../assets/image/shavedog.png" alt="">
          </div>
          <h1 class="title font-ps">茬狗订阅会员</h1>
          <div class="slogan">
            <p>钱不一定要花在刀刃上</p>
            <p>想换就换的新鲜剃须刀</p>
          </div>
          <div class="flex-sb">
            <button class="op-btn-primary btn-subscribe" @click="handleOpen">开始订阅</button>
            <!-- <button class="op-btn-primary btn-gift"  @click="handleOpen"><i class="op-icon-gift"></i>赠礼</button> -->
          </div>
        </div>

        <div class="section2">
          <h2 class="title font-ps">茬狗会员特权</h2>
          <div class="price">仅需¥150/每年</div>
          <ul class="list">
            <li>
              <h3 class="sub-title font-ps">畅享12个刀头</h3>
              <p>一年四期，我们每三个月为会您寄送3个新鲜刀头。</p>
            </li>
            <li>
              <h3 class="sub-title font-ps">独享商品折扣</h3>
              <p>会员购买其他补给商品时享受折扣价，并会获得额外刀头，节省您的每一分钱。</p>
            </li>
            <li>
              <h3 class="sub-title font-ps">多次订购自动续期</h3>
              <p>如果您多次订购会员，会自动为您的会员期限续期。</p>
            </li>
          </ul>
        </div>

        <div class="section3">
          <h2 class="title font-ps">来看看瞧瞧都有啥</h2>
          <ul class="list">
            <li>
              <div class="img">
                <img src="../../assets/image/subscribe2.png" alt="">
              </div>
              <h3 class="sub-title font-ps">第一期配送内容</h3>
              <div class="des">
                <p>3个新鲜刀头/一只狗头盔</p>
                <p>一个自主站立式手柄（不能震动哦）</p>
                <p>一瓶氨基酸芦荟剃须膏（湿刮高潮全靠它）</p>
              </div>
            </li>
            <li>
              <div class="img">
                <img src="../../assets/image/subscribe3.png" alt="">
              </div>
              <h3 class="sub-title font-ps">后续三期补给盒</h3>
              <div class="des">
                <p>之后每三个月都会将补给盒送货上门，每个补给盒含3个价值XX元的刀头。</p>
              </div>
            </li>
          </ul>
          <div class="flex-sb">
            <button class="op-btn-primary btn-subscribe" @click="handleOpen">开始订阅</button>
            <!-- <button class="op-btn-primary btn-gift"  @click="handleOpen"><i class="op-icon-gift"></i>赠礼</button> -->
          </div>
        </div>

        <div class="section4">
          <div class="img">
            <img src="../../assets/image/subscribe4.png" alt="">
          </div>
          <div class="content">
            <p>刀头这东西，如果没用过，吹多了都是假，长得都差不多， 无非金属+塑料。</p>
            <div class="em font-ps">既然如此，快听我们吹吹:</div>
            <ul>
              <li>· 由瑞典钢材 Sandvik 打造</li>
              <li>· 自有专利，安全辅助滑轮 </li>
              <li>· PTFE 铂金刀锋涂层</li>
              <li>· 维他命E芦荟润滑条</li>
              <li>· 5+1 层刀片各自分工</li>
              <li>· 太空银刀柄，镀铬工艺</li>
              <li> ...</li>
            </ul>
            <div class="slogan font-ps">茬狗能自己站着，一直站着，不靠别人，</div>
            <div>这如今， 挺重要的。</div>
          </div>
        </div>

        <div class="section5">
          <div class="img">
            <img src="../../assets/image/subscribe5.png" alt="">
          </div>
          <div class="content">
            <div class="em font-ps">湿刮的世界里，不应该再有高压瓶喷出的泡泡</div>
            <ul>
              <li>一切剃须前的准备，都是为了</li>
              <li style="font-size: 20px;">唤醒皮肤，软化胡须。</li>
              <li>冰冷的高压乙烷泡沫，</li>
              <li>不仅会增加皮肤的不适和刺痛感，</li>
              <li>大量酒精还会让皮肤快速失去水分，</li>
              <li>干燥紧绷。</li>
              <li>我们的芦荟精华膏状粘稠物，</li>
              <li class="font-ps">不会。</li>
            </ul>
            <div class="flex-sb">
              <button class="op-btn-primary btn-subscribe" @click="handleOpen">开始订阅</button>
              <!-- <button class="op-btn-primary btn-gift"  @click="handleOpen"><i class="op-icon-gift"></i>赠礼</button> -->
            </div>
          </div>
        </div>

        <div class="section6">
          <div class="img">
            <img src="../../assets/image/subscribe6.png" alt="">
          </div>
          <div class="content">
            <h4 class="slogan font-ps">不把我们用倒闭了，<br>算你输</h4>
            <p>剃须刀的工厂来自于我们创始团队成员之一的家族，出口外贸的生意已经做了十四年，也正是依靠自有的生产供应链，我们才能打破行业原有的定价规则，真正为大家提供价格合理，质量上乘的刀锋体验。</p>
            <p>我们其他的产品，从设计、打样到全自动生产，全都是和中国本土工厂合作，产品的持续更新和迭代具有十足的保证。</p>
            <p>所以，刀头真的请随便用，不把我们用倒闭了，算你输。</p>
          </div>
        </div>

        <div class="section7">
          <h4 class="title">Ours vs Theirs</h4>
          <div class="chart">
            <ul>
              <li class="ours">
                <span>我们的</span>
                <div class="col"><i class="unit">¥</i>9</div>
              </li>
              <li class="theirs">
                <span>TA们的</span>
                <div class="col"><i class="unit">¥</i>30+</div>
              </li>
            </ul>
            <div class="chart-title">刀头平均单价对比</div>
          </div>
          <div class="content">
            <p>告别中间商，告别品牌税，告别明星广告</p>
            <p class="slogan">价格，早就该真诚一点</p>
          </div>
        </div>

        <div class="section8">
          <div class="content">
            <p>你应该开始察觉到</p>
            <p>所有这一切</p>
            <p>意味着什么</p>
            <p>不好意思，本产品不能试用</p>
            <p class="slogan">茬狗会员，一养一年</p>
            <p>还等什么</p>
            <p>还等什么</p>
            <p>Shavedog</p>
            <p>愿你的刀刃永远锋利</p>
            <p>.</p>
            <p>.</p>
            <p>和干净</p>
          </div>
          <div class="flex-sb">
            <button class="op-btn-primary btn-subscribe" @click="handleOpen">开始订阅</button>
            <!-- <button class="op-btn-primary btn-gift"  @click="handleOpen"><i class="op-icon-gift"></i>赠礼</button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 可用现金券列表 -->
    <discount-details :show.sync="discountShow"></discount-details>

    <!-- 填写订单 -->
    <order-details :show.sync="orderShow" @discountOpen="discountShow = true"></order-details>
  </div>
</template>

<script>
import discountDetails from '@/components/discountDetails'
import orderDetails from '@/components/orderDetails'
import BScroll from "better-scroll"
export default {
  components: {
    discountDetails,
    orderDetails
  },

  data () {
    return {
      orderShow: false,
      discountShow: false,
      isapp: false,
    }
  },

  mounted () {
    this.$op.isWeChatApplet().then(async res => {
      this.isapp = res
    })
    setTimeout(() => {
      this.$nextTick(() => {
        this.scroll = new BScroll('.wrapper', {
          click: true,
          mouseWheel: true
        })
      })
    }, 0)
  },

  activated () {
    this.scroll && this.scroll.refresh()
  },

  deactivated () {
    this.$store.commit("DISCOUNT_CLEAR")
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 是否为立即订阅,是则页面初始化时打开订单弹出层,反之维持原状
      if (to.params.operation === 'renew' || from.path === '/my/address') {
        vm.orderShow = true
      }
    })
  },

  methods: {
    handleOpen () {
      if (this.$store.state.account.token) {
        this.orderShow = true
      } else {
        this.$toast({
          message: '您暂未登录，请授权登录',
          duration: 2000
        })
        this.$router.replace({
          name: 'my',
          params: {redirect: this.$route.path}
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  bottom: 50px;
}
.wrapper.is-weapp {
  bottom: 84px;
}
.section {
  font-family: PingFangSC-Regular;
  text-align: center;
}
.op-btn-primary {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
}
.btn-subscribe {
  flex: 1;
}
.btn-gift {
  margin-left: 10px;
  width: 84px;
}
.op-icon-gift {
  margin-top: 15px;
  vertical-align: top;
  margin-right: 5px;
}
.flex-sb {
  text-align: center;
}

.list {
  margin: 0 auto;
  padding: 0 40px;
  color: #868686;
  background: #fff;
  line-height: 24px;
  box-shadow: 0 3px 12px 0 rgba(0,0,0,0.05);
  border-radius: 4px;
  .des {
    line-height: 29px;
  }
}

.section1 {
  padding: 47px 42px 0;
  width: 100%;
  height: 436px;
  background: url('../../assets/image/subscribe1.png');
  background-size: cover;
  .logo {
    margin: 0 auto;
    width: 77px;
  }
  .title {
    font-size: 36px;
    color: #008489;
  }
  .slogan {
    margin: 9px 0 30px;
    font-family: PingFangSC-Light;
    font-size: 16px;
    line-height: 28px;
  }
}
.section2 {
  padding: 50px 20px 0;
  background: #fcfcfc;
  .title {
    font-size: 28px;
    color: #263645;
  }
  .price {
    margin: 10px 0 15px;
    font-size: 14px;
    color: #0E948A;
  }
  .list {
    padding: 50px;
    li+li {
      margin-top: 50px;
    }
  }
  .sub-title {
    margin-bottom: 12px;
    font-size: 20px;
    color: #263645;
  }
}
.section3 {
  padding: 50px 20px 0;
  background: #fcfcfc;
  .title {
    margin-bottom: 30px;
    font-size: 28px;
    color: #0E948A;
  }
  .list {
    padding: 20px 34px 50px;
  }
  .flex-sb {
    margin: 30px 0 50px;
  }
  .sub-title {
    margin: 20px 25px;
    font-size: 12px;
    color: #0E948A;
  }
  .img {
    height: 240px;
  }
}
.section4 {
  .content {
    text-align: left;
    padding: 25px 20px 70px;
    color: #263645;
    line-height: 25px;
  }
  .em {
    margin: 20px 0 26px;
    font-size: 20px;
  }
  .slogan {
    margin: 16px 0;
    font-size: 24px;
    color: #0E948A;
    line-height: 40px;
  }
  .img {
    height: 377px;
  }
}
.section5 {
  text-align: left;
  .em {
    margin-bottom: 26px;
    font-size: 28px;
    color: #263645;
    line-height: 40px;
  }
  .content {
    font-family: PingFangSC-Regular;
    padding: 50px 20px 55px;
    line-height: 34px;
    color: #001800;
  }
  .font-ps{
    font-size:28px;
    color:#05726A;
  }
  .flex-sb {
    margin-top: 26px;
  }
  .img {
    height: 374px;
  }
}
.section6 {
  background: #C3CDCF;
  color: #263645;
  line-height: 29px;
  text-align: left;
  .content {
    padding: 30px 22px;
    .slogan {
      margin-bottom: 37px;
      font-size: 28px;
      color: #263645;
      line-height: 40px;
    }
    p {
      margin-top: 30px;
    }
  }
  .img {
    height: 310px;
  }
}
.section7 {
  padding: 50px 0 60px;
  font-family: PingFangSC-Light;
  .title {
    margin-bottom: 46px;
    font-family: PingFangSC-Semibold;
    font-size: 28px;
    color: #0E948A;
  }
  .chart {
    .chart-title {
      margin: 17px 0 30px;
      font-weight: bold;
    }
    ul {
      display: flex;
      justify-content: center;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
      }
      .ours {
        margin-right: 16px;
        align-self: flex-end;
      }
      .ours .col {
        margin-top: 17px;
        height: 51px;
        line-height: 51px;
        background: #0E948A;
      }
      .theirs .col{
        margin-top: 7px;
        height: 194px;
        line-height: 194px;
        background: #60899F;
      }
      .col {
        width: 86px;
        color: #fff;
        font-family: Montserrat-Bold;
        font-size: 24px;
        font-weight: bold;
        border-radius: 4px;
        .unit {
          margin-right: 2px;
          font-size: 18px;
        }
      }
    }
  }
  .content {
    line-height: 50px;
  }
  .slogan {
    font-family: PingFangSC-Regular;
    font-size: 28px;
  }
}
.section8 {
  padding: 62px 20px 40px;
  font-size: 15px;
  line-height: 30px;
  color: #fff;
  background: #0E948A;
  .content {
    margin-bottom: 50px;
  }
  .op-btn-primary {
    background: #222;
  }
  .slogan {
    margin: 15px 0;
    font-size: 28px;
  }
}
</style>
