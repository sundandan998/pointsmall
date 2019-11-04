import request from '../../utils/request'
export default {
  // 个人信息
  information(params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
  // 添加订单
  addOrder(params = {}) {
    return request({
      url: '/order/add/',
      method: 'post',
      data: params
    })
  },
  // // 获取订单列表
  // orderList (params = {}) {
  //   return request({
  //     url: '/order/list/',
  //     method: 'get',
  //     params: params
  //   })
  // },
  // 修改订单状态
  editOrder(params = {}) {
    return request({
      url: '/order/' + params.id + '/status/modify/',
      method: 'post',
      data: params
    })
  },
  // 获取订单列表详情
  orderDetail(params = {}) {
    return request({
      url: '/order/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  },
  // 商家订单
  merchantOrder(params = {}) {
    return request({
      url: '/order/list/',
      method: 'get',
      params: params
    })
  },
  // 商家订单详情
  merchantDetail(params = {}) {
    return request({
      url: '/order/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  },
  // 代理商订单
  agent(params = {}) {
    return request({
      url: '/order/agent/list/',
      method: 'get',
      params: params
    })
  },
  // 代理商订单详情
  agentDetail(params = {}) {
    return request({
      url: '/order/agent/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  },
  // 导出excel 
  export(params = {}) {
    return request({
      url: '/order/agent/export/',
      method: 'get',
      params: params,
      // responseType:'arraybuffer'
    })
  },
  // 商家发货
  ship(params = {}) {
    return request({
      url: '/order/shop/' + params.id + '/deliver/',
      method: 'post',
      data: params
    })
  },

  // 用户收货
  receipt(params = {}) {
    return request({
      url: '/order/' + params.id + '/receive/',
      method: 'post',
      data: params
    })
  },
  // 冻结订单列表
  freeze(params = {}) {
    return request({
      url: '/order/freeze/list/',
      method: 'get',
      params: params
    })
  },
  // 转让
  transfer(params = {}) {
    return request({
      url: '/order/transfer/',
      method: 'post',
      data: params
    })
  },
  // 资产详情
  assetsDetail(params = {}) {
    return request({
      url: '/order/asset/' + params.order_id + '/detail/',
      method: 'get',
      params: params
    })
  },
  // 获取个人资产详情--用户模块里的
  personalAssets(params = {}) {
    return request({
      url: '/user/asset/' + params.code + '/detail/',
      method: 'get',
      params: params
    })
  },
}
