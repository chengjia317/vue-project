// 商品数据
export default{
  state:{
    good:{
      name:'Shavedog茬狗手动剃须刀豪华套装 茬狗经典款1刀架+6刀头',
      price:55,
      vipPrice:47,
      num:1
    }
  },
  mutations:{
    ADD_GOODS(state,good){
      state.good=good
    }
  }
}
