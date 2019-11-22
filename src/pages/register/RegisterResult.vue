<template>
  <div class="result">
    <mt-header class="result-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
    </mt-header>
    <div class="result-img">
      <img src="../../assets/images/register-successfu.png" lt="">
      <p>注册成功</p>
    </div>
    <div class="result-btn">
      <p>*设置支付密码后可购买商品</p>
      <!-- <router-link :to="{name:'Verified',params:{id:'result'}}" >
        <mt-button size="large" class="result-btn-name">进行实名认证</mt-button>
      </router-link> -->
      <!-- <router-link :to="{name:'SafetyVerification',params: {id:'result'}}"> -->
      <router-link :to="{name:'SetPwd',params: {id:'result'}}">
        <mt-button size="large" class="result-btn-pwd">设置支付密码</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = ""
      next()
    },
    created() {
      document.title = '千企联盟'
    },
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
  .result {
    .result-header {
      background-color: #fff !important;
      margin: 50px 0 80px 0px;

      label.mint-button-text {
        color: #333 !important;
      }

      .mintui {
        color: #333;
      }
    }

    .result-img {
      margin: 0px auto;
      display: table;
      width: 62px;

      p {
        margin-top: 30px;
        font-size: 36px;
        color: #333;
        text-align: center;
        margin-bottom: 210px;
      }
    }

    .result-btn {
      margin: 0px 54px 0 54px;
      .result-btn-pwd {
        height: 88px;
        width: 100%;
        border-radius: 44px;
        background-color: #fff;
        color: #fff;
        border: 1px solid #c9191D;
        background-color: #c9191D;
      }
      p{
        margin-bottom: 10px;
      }
    }
  }
</style>