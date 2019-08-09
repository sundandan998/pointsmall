import request from '../../utils/request'
export default {
  // 服务列表
  serviceList(params = {}) {
    return request({
      url: '/system/service/list/',
      method: 'get',
      params: params
    })
  },
  //  安全验证
  verification(params = {}) {
    return request({
      url: '/system/code/security/',
      method: 'post',
      data: params
    })
  },
  // 手机验证码
  sendCode(params = {}) {
    return request({
      url: '/system/sms_code/',
      method: 'post',
      data: params
    })
  },
  // 检测认证信息
  certification(params = {}) {
    return request({
      url: '/user/verify/user/',
      method: 'post',
      data: params
    })
  },
  // 个人信息修改密码
  editPwd(params = {}) {
    return request({
      url: '/user/pay_pwd/modify/',
      method: 'post',
      data: params
    })
  },
  // 登录接口
  loginByCode(params = {}) {
    return request({
      url: '/user/authorization/',
      method: 'post',
      data: params
    })
  },
  // --------------xxxxxxxxxxxxxxx-------
  // 获取用户openid
  openId(params = {}) {
    return request({
      url: '/user/wx/user/',
      method: 'post',
      data: params
    })
  },
  // 商品列表
  goods(params = {}) {
    return request({
      url: '/goods/list/',
      method: 'get',
      params: params
    })
  },
  // 个人资产列表
  assets(params = {}) {
    return request({
      url: '/user/asset/list/',
      method: 'get',
      params: params
    })
  },
  // 明细列表
  detail(params = {}) {
    return request({
      url: '/user/flow/list/',
      method: 'get',
      params: params
    })
  },
  // 地址列表
  address(params = {}) {
    return request({
      url: '/user/address/list/',
      method: 'get',
      params: params
    })
  },
  //增加地址
  addAddress(params = {}) {
    return request({
      url: '/user/address/add/',
      method: 'post',
      data: params
    })
  },
  // 修改地址
  editAddress(params = {}) {
    return request({
      url: '/user/address/'+ params.id +'/modify/',
      method: 'post',
      data: params
    })
  },
  // 删除地址
  delAddress(params = {}) {
    return request({
      url: '/user/address/'+ params.id +'/destroy/',
      method: 'post',
      data: params
    })
  },
  // -----------------xxxxxx--------------------
  // 个人信息
  information(params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
  // 获取用户积分
  userIntegral(params = {}) {
    return request({
      url: '/user/integral/',
      method: 'get',
      params: params
    })
  },
  // 转出积分
  turnOut(params = {}) {
    return request({
      url: '/user/transfer_out/',
      method: 'post',
      data: params
    })
  },
  // 更换手机号
  replacePhone(params = {}) {
    return request({
      url: '/user/mobile/modify/',
      method: 'post',
      data: params
    })
  },
  // 明细
  details(params = {}) {
    return request({
      url: '/user/flow/list/',
      method: 'get',
      params: params
    })
  },
  // // 明细详情
  // detail(params = {}) {
  //   return request({
  //     url: '/user/flow/' + params.id + '/detail/',
  //     method: 'get',
  //     params: params
  //   })
  // },
  // 扫一扫接口
  scan(params = {}) {
    return request({
      url: '/user/wx/sign/',
      method: 'get',
      params: params
    })
  },
  // 设置支付密码
  payPwd(params = {}) {
    return request({
      url: '/user/pay_pwd/set/',
      method: 'post',
      data: params
    })
  },
  // 认证信息
  certification(params = {}) {
    return request({
      url: '/user/verify/user/',
      method: 'post',
      data: params
    })
  },
}
