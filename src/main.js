// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
// import Vant from 'vant'
// import axios from 'axios'
import store from './store'
import 'mint-ui/lib/style.css'
// loading加载
import { Indicator } from 'mint-ui'
//vant框架样式
import 'vant/lib/index.css'
//element框架样式
import 'element-ui/lib/theme-chalk/index.css'
// 各种组件集合
import external from './external-components/index'
Vue.use(MintUI)
// Vue.use(axios)
Vue.use(external) 
// Vue.use(Vant)
Vue.prototype.$Indicator = Indicator
Vue.config.productionTip = false

/* eslint-disable no-new */
// 全局过滤去掉小数点后数字
// Vue.filter('keepTwoNum', function (value) {
//   value = Number(value)
//   return value.toFixed(0)
// })
Vue.filter('keepTwoNum', function (value) {
  if (value == 0.00) {
    value = Number(value)
    return value.toFixed(2)
  } else {
    value = Number(value)
    return value
  }
})
new Vue({
  el: '#app',
  router,
  store,
  // axios,
  components: { App },
  template: '<App/>'
})
