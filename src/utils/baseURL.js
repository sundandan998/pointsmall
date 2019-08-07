import Vue from 'vue'
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://111.230.221.200:10001'
    // baseUrl = 'https://www.sparkcell.cn/webadmin'
    break
  case 'test':
    baseUrl = 'http://111.230.221.200:10001'
    // baseUrl = 'https://www.sparkcell.cn/webadmin'
    break
  case 'production':
    baseUrl = 'http://111.230.221.200:10001'
    // baseUrl = 'https://www.sparkcell.cn/webadmin'
    break
}
Vue.prototype.$baseUrl = baseUrl

export default baseUrl
