import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: ()=> import('@/pages/login/Login.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: ()=> import('@/pages/home/Home.vue')
    },
    {
      path:'/subscribe',
      name:'Subscribe',
      component: ()=> import('@/pages/subscribe/Subscribe.vue')
    },
    {
      path:'/supply',
      name:'Supply',
      component: ()=> import('@/pages/supply/Supply.vue'),
      redirect:'/supply/list',
      children:[
        {
          path:'list/:page?',
          name:'List_supply',
          component: ()=> import('@/pages/supply/List-supply.vue')
        },
        {
          path:'details/:id',
          name:'Detail_supply',
          component: ()=> import('@/pages/supply/Detail-supply.vue')
        }
      ]
    },
    {
      path:'/me',
      name:'Me',
      component: ()=> import('@/pages/me/Me.vue')

    },
    {
      path:'/me/notice',
      name:'Me_notice',
      component: ()=> import('@/pages/me/Notice.vue')
    },
    {
      path:'/me/order/:page?',
      name:'Me_Order',
      component: ()=> import('@/pages/me/Order.vue')
    },
    {
      path:'/me/order/detail/:id',
      name:'Order_detail',
      component: ()=> import('@/pages/me/Order-detail.vue')
    },
    {
      path:'/me/discount/:page?',
      name:'Me_discount',
      component: ()=> import('@/pages/me/Discount.vue')
    },
    {
      path:'/me/address',
      name:'Me_address',
      component: ()=> import('@/pages/me/Address.vue')
    },
    {
      path:'/me/address/edit/:id?',
      name:'Me_address_edit',
      component: ()=> import('@/pages/me/Address-edit.vue')
    },
    {
      path:'/me/invite',
      name:'Me_invite',
      component: ()=> import('@/pages/me/Invite.vue')
    },
    {
      path:'/me/subs',
      name:'Me_subs',
      component: ()=> import('@/pages/me/Subs.vue')
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})
