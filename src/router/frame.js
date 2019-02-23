export default [
  {
    path: '/',
    redirect: '/index',
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: false}
  },
  // 使命
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
    meta: {showTab: true, keepAlive: true, requiresAuth: false}
  },
  // 订阅
  {
    path: '/subscribe',
    name: 'subscribe',
    component: () => import('@/pages/subscribe/index.vue'),
    meta: {showTab: true, keepAlive: true, requiresAuth: false}
  },
  // 补给
  {
    path: '/supply',
    name: 'supply',
    component: () => import('@/pages/supply/index.vue'),
    redirect: '/supply/list/:type?',
    children: [
      {
        path: 'list/:type?',
        name: 'supply_list',
        component: () => import('@/pages/supply/list.vue'),
        meta: {showTab: true, keepAlive: true, requiresAuth: false},
      },
      {
        path: 'details/:id?',
        name: 'supply_details',
        component: () => import('@/pages/supply/details.vue'),
        meta: {showTab: false, keepAlive: true, requiresAuth: false},
      },
    ]
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('@/pages/my/index.vue'),
    meta: {showTab: true, keepAlive: true, requiresAuth: false},
  },
  // 我的通知
  {
    path: '/my/notice',
    name: 'my_notice',
    component: () => import('@/pages/my/notice/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  // 我的订单
  {
    path: '/my/order/:type?',
    name: 'my_order',
    component: () => import('@/pages/my/order/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  {
    path: '/my/order_details/:id?',
    name: 'my_order_details',
    component: () => import('@/pages/my/order/details.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  // 我的订阅
  {
    path: '/my/subscribe',
    name: 'my_subscribe',
    component: () => import('@/pages/my/subscribe/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  {
    path: '/my/subscribe/list/:id?',
    name: 'my_subscribe_list',
    component: () => import('@/pages/my/subscribe/list.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  {
    path: '/my/subscribe_details/:id?',
    name: 'my_subscribe_details',
    component: () => import('@/pages/my/subscribe/details.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  // 我的现金券
  {
    path: '/my/discount/:type?',
    name: 'my_discount',
    component: () => import('@/pages/my/discount/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  // 我的地址
  {
    path: '/my/address',
    name: 'my_address',
    component: () => import('@/pages/my/address/index.vue'),
    meta: {showTab: false, keepAlive: true, requiresAuth: true}
  },
  {
    path: '/my/address/edit/:id?',
    name: 'my_address_edit',
    component: () => import('@/pages/my/address/edit.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
  // 推荐有礼
  {
    path: '/invite',
    name: 'invite',
    component: () => import('@/pages/invite/index.vue'),
    meta: {showTab: false, keepAlive: false, requiresAuth: true}
  },
]