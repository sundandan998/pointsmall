<template>
  <div class="home">
    <!-- 中间部分 -->
    <div class="home-body">
      <div class="health-information">
        <div class="home-body-list">
          <mt-cell title="邀请新人" to="invite" is-link v-if="shops.is_agent==true">
            <img slot="icon" src="../../assets/images/invite.svg">
          </mt-cell>
        </div>
        <div class="home-body-list center">
          <mt-cell title="代理商中心" to="agent" is-link v-if="shops.is_agent==true">
            <img slot="icon" src="../../assets/images/agent.svg">
          </mt-cell>
          <mt-cell title="供货商中心" to="merchant" is-link v-if="shops.is_shops==true">
            <img slot="icon" src="../../assets/images/merchant.svg">
          </mt-cell>
        </div>
        <div class="home-body-list order">
          <mt-cell title="资产中心" to="assets" is-link>
            <img slot="icon" src="../../assets/images/access.svg">
          </mt-cell>
          <mt-cell title="我的订单" to="myorder" is-link>
            <img slot="icon" src="../../assets/images/reservation.svg">
          </mt-cell>
          <mt-cell title="收货地址" to="address" is-link>
            <img slot="icon" src="../../assets/images/address.svg">
          </mt-cell>
        </div>
        <!-- to="safety" -->
        <div class="home-body-list">
          <mt-cell title="安全中心" is-link @click.native="setpwd">
            <img slot="icon" src="../../assets/images/safety.svg">
          </mt-cell>
        </div>
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

  .home {
    .home-body{
      margin-top: 10px;
    }
    .mint-cell {
      margin: 0px 12px;
      border-radius: 10px;
    }

    .home-body-list {
      margin-bottom: 10px;
    }
    .center{
      background-color: #fff;
      margin: 0px 24px 10px 24px;
      border-radius: 20px;
    }

  }
  .center .mint-cell:first-child{
    border-bottom:0.1px solid #f2f2f2;
    border-radius: unset;
  }
  .order .mint-cell:first-child{
    border-bottom-right-radius: unset;
    border-bottom-left-radius: unset;
  }
  .order .mint-cell:nth-child(2){
    border-radius: unset;
  }
  .order .mint-cell:last-child{
    border-top-right-radius: unset;
    border-top-left-radius: unset;
  }
</style>