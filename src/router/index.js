import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/cs',
    //   name: 'cs',
    //   component: () => import('@/pages/index/cs')
    // },
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
    // 邀请码
    {
      path: '/code',
      name: 'Code',
      component: () => import('@/pages/register/InvitationCode')
    },
    // 首页
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/pages/index/Index')
    },
    // 代理商首页
    {
      path: '/',
      name: 'AgentIndex',
      component: () => import('@/pages/index/AgentIndex')
    },
    // 代理商列表页
    {
      path: '/agentlist',
      name: 'AgentList',
      component: () => import('@/pages/index/AgentList')
    },
     // 非代理商页
     {
      path: '/nonagent',
      name: 'NonAgent',
      component: () => import('@/pages/index/NonAgent')
    },
    // 购买结果
    {
      path: '/buyresult',
      name: 'BuyResult',
      component: () => import('@/pages/index/BuyResult')
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
    // 会员日填写订单
    {
      path: '/memberdayorder/:id',
      name: 'MemberDayOrder',
      component: () => import('@/pages/member-day/MemberDayFillOrder')
    },
    // 去支付
    {
      path: '/pay/:id',
      name: 'ToPay',
      component: () => import('@/pages/index/ToPay')
    },
    // 会员日开始
    {
      path: '/memberstart',
      name: 'MemberDayStart',
      component: () => import('@/pages/member-day/MemberDayStart')
    },
    // 我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/pages/mine/Mine')
    },
    // 邀请新人
    {
      path: '/invite',
      name: 'InvitePeople',
      component: () => import('@/pages/mine/invite-people/InvitePeople')
    },
    //  资产中心
    {
      path: '/assets',
      name: 'Assets',
      component: () => import('@/pages/mine/assets-center/AssetsCenter')
    },
    // 资产详情
    {
      path: '/assetdetail/:code',
      name: 'AssetDetail',
      component: () => import('@/pages/mine/assets-center/AssetDetail')
    },
    // 冻结转让
    {
      path: '/freezetransfer/:order_id',
      name: 'FreezeTransfer',
      component: () => import('@/pages/mine/assets-center/FreezeTransfer')
    },
    // 可用转让
    {
      path: '/availabletransfer',
      name: 'AvailableTransfer',
      component: () => import('@/pages/mine/assets-center/AvailableTransfer')
    },
    // 确认转让
    {
      path: '/confirm',
      name: 'ConfirmTransfer',
      component: () => import('@/pages/mine/assets-center/ConfirmTransfer')
    },
    // 转让--订单详情
    {
      path: '/transferdetail/:code',
      name: 'TransferDetail',
      component: () => import('@/pages/mine/assets-center/TransferDetail')
    },
    // 明细
    {
      path: '/assetsdetail',
      name: 'AssetsDetail',
      component: () => import('@/pages/mine/order/AssetsDetail')
    },
    // 明细详情
    {
      path: '/assetsdetails/:id',
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
      path: '/orderdetail/:id',
      name: 'OrderDetail',
      component: () => import('@/pages/mine/order/OrderDetail')
    },
    // 收货地址
    {
      path: '/address',
      name: 'ShippingAddress',
      component: () => import('@/pages/mine/shipping-address/ShippingAddress')
    },
    // 新建地址
    {
      path: '/newaddress',
      name: 'NewAddress',
      component: () => import('@/pages/mine/shipping-address/NewAddress')
    },
    // 地址详情
    {
      path: '/addressdetail',
      name: 'AddressDetail',
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
    // 代理商列表
    {
      path: '/agent',
      name: 'Agent',
      component: () => import('@/pages/mine/agent/Agent')
    },
    // 代理商详情
    {
      path: '/agentdetail/:id',
      name: 'AgentDetail',
      component: () => import('@/pages/mine/agent/AgentDetail')
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
