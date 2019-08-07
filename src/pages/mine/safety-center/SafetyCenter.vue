<template>
  <div class="safety-center">
    <div class="safety-center-information">
      <mt-cell title="手机号" to="tel" :value="this.infor.mobile" is-link></mt-cell>
      <router-link :to="{name:'SafetyVerification',params:{id:'safetycenter'}}">
        <mt-cell title="修改支付密码" is-link class="modify-pwd"></mt-cell>
      </router-link>
      <mt-cell title="忘记支付密码" to="forget" is-link></mt-cell>
    </div>
    <router-link to="mine">
      <mt-button size="large" class="cancel">返回</mt-button>
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
  .modify-pwd {
    span {
      color: #333;
    }
  }
  .safety-center .cancel{
    position: absolute;
    bottom: 10px;
    background-color: #09bb07 !important;
    color: #fff;
  }
</style>