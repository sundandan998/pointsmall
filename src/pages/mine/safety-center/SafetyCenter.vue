<template>
  <div class="safety-center">
    <div class="safety-center-tel">
      <mt-cell title="手机号" to="tel" :value="this.infor.mobile" is-link></mt-cell>
    </div>
    <div class="safety-center-pwd">
      <router-link :to="{name:'SafetyVerification',params:{id:'safetycenter'}}">
        <mt-cell title="修改支付密码" is-link class="modify-pwd"></mt-cell>
      </router-link>
      <mt-cell title="忘记支付密码" to="forget" is-link class="modify-pay-pwd"></mt-cell>
    </div>
    <router-link to="mine">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        infor: {
          mobile: ''
        }
      }
    },
    created() {
      this.information()
    },
    methods: {
      // 个人信息
      information() {
        api.information().then(res => {
          this.infor = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/Global.scss";
  .safety-center {
    margin: 10px 24px;
    color:#333;
    font-size: 28px;
    .safety-center-tel {
      margin: 10px 0;
      .mint-cell {
        border-radius: 10px;
      }
      .mint-cell-value{
        span{
          color:#999;
        }
      }
    }
    .safety-center-pwd {
      a.mint-cell.modify-pwd {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      a.mint-cell.modify-pay-pwd {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
</style>