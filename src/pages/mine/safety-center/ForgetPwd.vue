<template>
  <div class="forget-pwd">
    <div class="forget-pwd-content">
      <span>忘记支付密码</span>
      <span>需要联系客服重置按客服需求提供相关材料</span>
      <p> <img src="../../../assets/images/tel.svg" alt=""> 客服电话:400-756-8888</p>
    </div>
    <div class="order-button">
      <router-link to="safety">
        <mt-button size="large" class="back">返回</mt-button>
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
    created() {
      document.title = '忘记支付密码'
    },
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/Global.scss";

  .forget-pwd {
    .forget-pwd-content {
      margin-top: 220px;
      text-align: center;
      font-size:30px;
      span {
        display: block;
        color:#333;
      }
      p{
        color:#999;
        margin-top: 30px;
      }
    }
  }
</style>