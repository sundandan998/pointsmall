import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cs',
      name: 'cs',
      component: () => import('@/pages/index/cs')
    },
    // 注册
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/register/Register')
    },
    // 注册结果页
    {
      path: '/result',
      name: 'Result',
      component: () => import('@/pages/register/RegisterResult')
    },
    // 首页
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index/Index')
    },
    // 商品详情
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('@/pages/index/ProductDetails')
    },
    // 填写订单
    {
      path: '/order/:id',
      name: 'Order',
      component: () => import('@/pages/index/FillOrder')
    },
    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/pages/mine/Mine')
    },
    //  资产中心
    {
      path: '/assets',
      name: 'Assets',
      component: () => import('@/pages/mine/assets-center/AssetsCenter')
    },
    // 明细
    {
      path: '/assetsdetail',
      name: 'AssetsDetail',
      component: () => import('@/pages/mine/order/AssetsDetail')
    },
     // 明细详情
     {
      path: '/assetsdetails',
      name: 'AssetsDetails',
      component: () => import('@/pages/mine/order/AssetsDetails')
    },
    // 我的订单
    {
      path: '/myorder',
      name: 'MyOrder',
      component: () => import('@/pages/mine/order/MyOrder')
    },
    // 订单详情
    {
      path:'/orderdetail/:id',
      name:'OrderDetail',
      component: () => import('@/pages/mine/order/OrderDetail')
    },
    // 收货地址
    {
      path:'/address',
      name:'ShippingAddress',
      component: () => import('@/pages/mine/shipping-address/ShippingAddress')
    },
     // 新建地址
     {
      path:'/newaddress',
      name:'NewAddress',
      component: () => import('@/pages/mine/shipping-address/NewAddress')
    },
     // 地址详情
     {
      path:'/addressdetail',
      name:'AddressDetail',
      component: () => import('@/pages/mine/shipping-address/AddressDetail')
    },
    // 安全中心
    {
      path: '/safety',
      name: 'SafetyCenter',
      component: () => import('@/pages/mine/safety-center/SafetyCenter')
    },
     // 商家中心
     {
      path: '/merchant',
      name: 'MerchantCenter',
      component: () => import('@/pages/mine/merchant-center/MerchantCenter')
    },
     // 商家中心详情
     {
      path: '/merchantdetail/:id',
      name: 'MerchantCenterDetail',
      component: () => import('@/pages/mine/merchant-center/MerchantCenterDetail')
    },
    // 修改手机号
    {
      path: '/tel',
      name: 'ModifyTel',
      component: () => import('@/pages/mine/safety-center/ModifyTel')
    },
    // 修改支付密码
    {
      path: '/modify',
      name: 'ModifyPwd',
      component: () => import('@/pages/mine/safety-center/ModifyPwd')
    },
    // 设置支付密码
    {
      path: '/set',
      name: 'SetPwd',
      component: () => import('@/pages/mine/safety-center/SetPwd')
    },
    // 安全验证
    {
      path: '/verification',
      name: 'SafetyVerification',
      component: () => import('@/pages/mine/safety-center/SafetyVerification')
    },
    // 忘记密码
    {
      path: '/forget',
      name: 'Forget',
      component: () => import('@/pages/mine/safety-center/forgetPwd')
    },
    // 预约信息
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('@/pages/index/Reservation')
    },
  ]
})
