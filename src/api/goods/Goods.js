import request from '../../utils/request'
export default {
  // 商品详情
  goodsDetail(params = {}) {
    return request({
      url: '/goods/' + params.id + '/desc/',
      method: 'get',
      params: params
    })
  },
  // 订单详情
  orderDetail(params = {}) {
    return request({
      url: '/goods/' + params.id + '/detail/',
      method: 'get',
      params: params
    })
  },
  // 个人信息
  information(params = {}) {
    return request({
      url: '/user/info/',
      method: 'get',
      params: params
    })
  },
}
