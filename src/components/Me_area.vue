<template>
  <div>
    <div class="mask"></div>
    <div class="wrapper">
      <div class="header">
        <h2 class="title">请选择区域</h2>
        <i class="icon-close" @click="close"></i>
      </div>
      <div class="content">
        <van-area :area-list="areaList" :visible-item-count="visibleItemCount" @change="change"/>
      </div>
      <div class="bottom">
        <button class="cancel-btn" @click="close">取消</button>
        <button class="sure-btn" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDistricts} from '@/api/address'
  export default {
    data(){
      return{
        name: ['北京市', '北京市', '东城区'],
        value: [110000,110100,110101],
        visibleItemCount: 3,
        areaList: {
          province_list: {
            110000: '北京市',
            120000: '天津市'
          },
          city_list: {
            110100: '北京市',
            120100: '天津市',
          },
          county_list: {
            110101: '东城区',
            110102: '西城区',
            110105: '朝阳区',
            110106: '丰台区',
            120101: '和平区',
            120102: '河东区',
            120103: '河西区',
            120104: '南开区',
            120105: '河北区',
          }
        }
      }
    },
    created(){
      this.getDistricts();
    },
    methods:{
      async getDistricts(){
        const data=await  getDistricts()
        let cityList=[]
        let countryList=[]
        console.log(data)
        data.forEach(province=>{
          cityList.push(...province.cities)
        })

        data.forEach(province=>{
          province.cities.forEach(city=>{
            countryList.push(...city.areas)
          })
        })
        this.areaList.province_list=this.formatData(data)
        this.areaList.city_list=this.formatData(cityList)
        this.areaList.county_list=this.formatData(countryList)

      },
      formatData(data){
        let result=[]
        data.forEach(item=>{
          result[item.id]=item.name
        })
        return result
      },
      close(){
        this.$emit('closeMask')
      },
      confirm(){
        this.$emit('confirm',this.value,this.name)
        this.close()
      },
      change(old,news){
        //改变value和name的值 传递选中的省市数据
        this.value=[news[0].code,news[1].code,news[2].code]
        this.name=[news[0].name,news[1].name,news[2].name]
      }
    }
  }
</script>

<style lang="stylus" scoped>
.van-area>>>.van-picker__toolbar
  display: none
.mask
  position: fixed
  width: 100%
  height: 100%
  background: rgba(0,0,0,.5)
  top:70px
  left:0
  z-index: 10
.wrapper
  position: fixed
  background: #ffffff
  z-index :20
  top:30%
  right:20px
  left:20px
  padding:30px 0 33px
  border-radius: 5px
  .header
    font-size: 18px
    color: #222222
    margin-left: 30px
    position: relative
    .icon-close
      position: absolute
      right:30px
      top:0
  .content
    padding: 30px 0 30px
  .bottom
    margin: 0 25px
    display: flex
    align-items: center
    button
      width:135px
      height:44px
      border: 1px solid #E6EAEE
      border-radius: 5px
      font-size: 15px
      color: #000000
      background: #fff
    .sure-btn
      background: #0E948A
      margin-left:15px
</style>
