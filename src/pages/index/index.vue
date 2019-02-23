<template>
  <div :class="['wrapper', {'is-weapp': isapp}]">
    <div>
      <div class="section1">
        <div class="img"><img src="../../assets/image/index0.png" alt=""></div>
        <div class="content">
          <h1 class="title">我们的使命</h1>
          <p>之所以成立 茬狗 shavedog 这个品牌，是因为想要反抗，我们实在是忍受不了，在剃须刀这件事上，</p>
          <p class="em">就这么一直被忽悠糊弄下去。</p>
          <p>你有想过吗？四个刀头，几块薄薄的钢片，居然就要一两百元，可以贵得再离谱一点吗？</p>
          <p> 我们之所以被过度消费和洗脑，是因为有一家垄断全球的大公司，从我们青春期开始，就不断在推出新产品，八个刀片的刀头、会震动的手柄、会加热的刀片……</p>
          <p class="em">去他x的，这不是 iPhone 好吗？</p>
          <div class="paragraph">
            <p>这100多年过度“创新”的背后，</p>
            <p>默默买单的却是我们。</p>
          </div>
        </div>
      </div>
      <div class="section2">
        <div class="img">
          <img src="../../assets/image/index1.png" alt="">
        </div>
        <div class="content">
          <p class="slogan font-ps">剃须应该是一件特别简单享受的事，</p>
          <div class="paragraph">
            <p>就像以前我们爸爸的爸爸那样，</p>
            <p>他们那时哪有什么6刀片的刀头。</p>
          </div>
          <p>于是我们决定成立 茬狗 shavedog，想要为所有人提供更真诚的剃须产品和更真实的剃须文化体验。</p>
          <p>爽歪歪的”湿刮仪式“，重点根本不在于那几个多出的刀片，而是在于剃须护理产品的科学选择和使用。</p>
          <p style="padding:0 20px;margin-bottom:40px;">就好比我们一直傻傻觉得好用的剃须泡沫喷剂， 殊不知，瓶里的酒精防腐剂乙烷丙烷，</p>
          <p class="em">都是脸部皮肤的天敌！</p>
        </div>
      </div>
      <div class="section3">
        <div class="img1">
          <img src="../../assets/image/index2.png" alt="">
        </div>
        <div class="content">
          <p>别再跟风了，X列是爷爷们用的牌子，坑爹的“品牌税”交了这么多年，总不能连着被”坑三代“吧？ </p>
          <p class="em color-primary">是时候站起来，加入我们了。</p>
          <div class="paragraph">
            <p>一年150元，12个刀头，我们会每3个月，</p>
            <p>免费把3个超赞的新鲜刀头送到你家门口，</p>
            <p>让那些黄金价的剃须刀滚蛋去吧！</p>
          </div>
          <div class="paragraph">
            <p>不用再去超市尴尬地挑选和妥协，</p>
            <p>不用再把脏刀头当成宝贝，一用就是好几个月。</p>
          </div>
          <p>最后你问，为啥不用电动剃须刀呢？</p>
          <p class="em">对不起，我们不是无聊无趣的人。</p>
          <p class="percent">10%</p>
          <p>另外，我们承诺，每年拿出狗子净利润的10%，成立</p>
          <p class="em">「Shave 4 Good 茬善计划」，</p>
          <div class="paragraph">
            <p>旨在「净水 + 卫生 + 教育」的公益方向上，做出一点贡献，希望大家一路上，陪伴和监督，</p>
            <p>be the person your dog thinks you are！</p>
          </div>
          <div class="img2">
            <img src="../../assets/image/index3.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  data () {
    return {
      isapp: false
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.authInfo) {
        let authInfo = to.query.authInfo
        authInfo = JSON.parse(decodeURIComponent(authInfo))
        // Save auth information
        // authInfo={"token": "111", "userInfo": {"name":"22"}}
        vm.$store.commit('LOGIN', authInfo.token)
        vm.$store.commit('GET_PROFILE', authInfo.userInfo)
      }
    })
  },

  mounted () {
    // this.$op.isWeChatApplet().then(async res => {
    //   if (res && (this.$op.isIPhoneX() || this.$op.isIPhoneXSMax() || this.$op.isIPhoneXR())) {
    //     this.isapp = true
    //   }
    // })
    if (this.$op.isIPhoneX() || this.$op.isIPhoneXSMax() || this.$op.isIPhoneXR()) {
      this.isapp = true
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.scroll = new BScroll('.wrapper', {
          click: true,
          mouseWheel: true
        })
      }, 0)
    })
  },

  activated () {
    this.scroll && this.scroll.refresh()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  bottom: 50px;
}
.wrapper.is-weapp {
  bottom: 84px;
}
.content {
  text-align: center;
}
p {
  margin-bottom: 35px;
  line-height: 29px;
}
.em {
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  font-size: 20px;
}
.paragraph {
  margin-bottom: 35px;
  p {
    margin: 0
  }
}
.section1 {
  padding: 43px 35px;
  font-size: 15px;
  color: #263645;
  background: #fff;
  .title {
    margin: 30px 0 40px;
    font-size: 36px;
    color: #0E948A;
  }
  .em {
    margin: 30px 0 35px;
  }
  .img {
    height: 80px;
    text-align: center;
    img {
      width: 140px;
    }
  }
}
.section2 {
  background: #C3CDCF;
  .content {
    padding: 60px 20px 10px;
  }
  .slogan {
    line-height: 40px;
    font-size: 28px;
  }
  .img {
    height: 390px;
  }
}
.section3 {
  background: #fff;
  .content {
    padding: 40px 20px 100px;
  }
   .percent {
    margin: 70px 0 40px;
    font-family: Montserrat-Bold;
    font-weight: bold;
    font-size: 36px;
  }
  .img1 {
    height: 433px;
  }
  .img2 {
    height: 203px;
  }
}
</style>
