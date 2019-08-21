// vant框架
import {
  PasswordInput, NumberKeyboard, Popup, List, PullRefresh, Dialog, GoodsAction, Tab, Tabs, AddressList,
} from 'vant'
import { Slider } from 'element-ui'
const external = {
  install: function (Vue) {
    Vue.use(PasswordInput).use(NumberKeyboard)
    Vue.use(Popup)
    Vue.use(List)
    Vue.use(PullRefresh)
    Vue.use(Dialog)
    Vue.use(GoodsAction)
    Vue.use(Tab)
    Vue.use(Tabs)
    Vue.use(AddressList)
    Vue.use(Slider)
  }
}
export default external
