<template>
  <div class="assets-center">
    <div class="assets-center-title">
      <mt-cell title="资产详情" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <div class="assets-center-list">
      <div class="assets-center-list-left">
        <img src="../../../assets/images/ld.png" alt="">
        <span>LIFE+</span>
        <span>斯帕尔克细胞</span>
      </div>
      <span class="assets-center-list-right fr">1000</span>
    </div>
    <p class="integral-num fr"><img src="../../../assets/images/wait.png" alt=""> 120(超级积分)</p>
    <router-link to="mine">
    <div class="assets-center-button">
      <mt-button size="large">返回</mt-button>
    </div>
  </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      document.title = '资产中心'
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .assets-center-list {
    height: 50px;
    padding: 5px 10px 5px 15px;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
  }

  .assets-center-list-left {
    width: 50%;
    float: left;
    overflow: hidden;

    img {
      float: left;
      margin-right: 15px;
    }

    span {
      display: block;
    }
  }

  .integral-num {
    margin: 5px 10px 0 0;
  }

  .assets-center-button {
    button {
      position: fixed;
      bottom:0;
      border-radius:20px;
      background-color: #09BB07;
      color: #fff;
    }

  }
</style>