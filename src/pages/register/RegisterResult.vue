<template>
  <div class="result">
    <mt-header class="result-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
    </mt-header>
    <div class="result-img">
      <img src="../../assets/images/success.svg" lt="">
      <p>注册成功</p>
    </div>
    <div class="result-btn">
      <router-link :to="{name:'Verified',params:{id:'result'}}" >
        <mt-button size="large" class="result-btn-name">进行实名认证</mt-button>
      </router-link>
      <router-link :to="{name:'SafetyVerification',params: {id:'result'}}">
        <mt-button size="large" class="result-btn-pwd">设置支付密码</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
  body {
    background-color: #fff;
  }

  .result-header {
    background-color: #fff !important;

    label.mint-button-text {
      color: #000 !important;
    }

    .mintui {
      color: #000;
    }
  }

  .result-img {
    margin: 50px auto;
    display: table;
  }

  .result-btn {
    width: 80%;
    margin: 0 auto;

    .result-btn-pwd {
      background-color: #fff;
      margin-top: 20px;
      color: #09bb07 !important;
      border: 1px solid #09bb07;
    }

    .result-btn-name {
      background-color: #09bb07;
      color: #fff;
    }
  }
</style>