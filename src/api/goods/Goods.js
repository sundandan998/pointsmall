import request from '../../utils/request'
export default {
  // 商品列表
  goods(params = {}) {
    return request({
      url: '/goods/list/',
      method: 'get',
      params: params
    })
  },
}