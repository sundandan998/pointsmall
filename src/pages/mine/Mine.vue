<template>
  <div class="home">
    <!-- 中间部分 -->
    <div class="home-body">
      <div class="health-information">
        <mt-cell title="商家中心" to="agent" is-link v-if="shops.is_agent==true">
          <img slot="icon" src="../../assets/images/merchant.svg">
        </mt-cell>
        <mt-cell title="商家中心" to="merchant" is-link v-if="shops.is_shops==true">
          <img slot="icon" src="../../assets/images/merchant.svg">
        </mt-cell>
        <mt-cell title="资产中心" to="assets" is-link>
          <img slot="icon" src="../../assets/images/access.svg">
        </mt-cell>
        <mt-cell title="我的订单" to="myorder" is-link>
          <img slot="icon" src="../../assets/images/reservation.svg">
        </mt-cell>
        <mt-cell title="收货地址" to="address" is-link>
          <img slot="icon" src="../../assets/images/address.svg">
        </mt-cell>
        <!-- to="safety" -->
        <mt-cell title="安全中心" is-link @click.native="setpwd">
          <img slot="icon" src="../../assets/images/safety.svg">
        </mt-cell>
      </div>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  // 接口请求
  import api from '@/api/user/User.js'
  import { Dialog } from 'vant'
  export default {
    data() {
      return {
        selected: 'mine',
        message: 'mine',
        show: true,
        info: {},
        // 商家中心
        shops: {},
        integral: {
          'available': '--'
        }
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      document.title = '我的'
      this.userInfo()
    },
    methods: {
      setpwd() {
        if (this.shops.pay_pwd_active == true) {
          this.$router.push({
            name: 'SafetyCenter'
          })
        } else {
          Dialog.confirm({
            title: '提示',
            message: '请先设置支付密码再进行操作',
            cancelButtonText: '再想想',
            confirmButtonText: '去设置'
          }).then(() => {
            this.$router.push({
              name: 'SafetyVerification',
              params: { id: 'mine' }
            })
          }).catch(() => {
          })
        }
      },
      // 个人信息
      userInfo() {
        api.information().then(res => {
          this.shops = res.data
        }).catch(err => {
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';
</style>