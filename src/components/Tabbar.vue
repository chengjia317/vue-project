<template>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/home">
          <img :src="tabBarImg[0].select" alt="" v-if="showBtn('home')">
          <img :src="tabBarImg[0].normal" alt="" v-else>
          <p>使命</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/subscribe">
          <img :src="tabBarImg[1].normal" alt="" v-if="!showBtn('subscribe')">
          <img :src="tabBarImg[1].select" alt="" v-else>
          <p>订阅</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/supply">
          <img :src="tabBarImg[2].normal" alt="" v-if="!showBtn('supply/list')">
          <img :src="tabBarImg[2].select" alt="" v-else>
          <p>补给</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/me">
          <img :src="tabBarImg[3].normal" alt="" v-if="!showBtn('me')">
          <img :src="tabBarImg[3].select" alt="" v-else>
          <p>我的</p>
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {
    name: "tabbar",
    data(){
      return{
        tabBarImg:[
          {normal:require('images/home.png'),
           select:require('images/home1.png')
          },
          {normal:require('images/subscibe.png'),
           select:require('images/subscibe1.png')
          },
          {normal:require('images/supply.png'),
           select:require('images/supply1.png')
          },
          {normal:require('images/me.png'),
           select:require('images/me1.png')
          }
        ]
      }
    },
    methods:{
      showBtn(path){
        if(this.$route.path==='/'+path){
          return true;
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tab
    width: 100%
    height: 50px
    position: relative
    z-index: 999
    bottom: 0
    left: 0
    display: flex
    box-shadow : 0 2px 8px 0 rgba(0,0,0,0.10)
    background: #fff
    .tab-item
      width: 25%
      display: flex
      flex-direction: column
      justify-content: space-around
      align-items : center
      a
        text-decoration :none
        display: block
        img
          width:20px
          height:20px
        p
          font-size:9px
          line-height:13px
          color:#909090
</style>
