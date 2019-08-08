<template>
  <div class="details">
    <div class="details-title">
      <span>xx</span>
      <p>-20 (LIFE+)</p>
    </div>
    <div class="details-information">
      <p>流 水 号 <span>xxx</span></p>
      <p>订单编号 <span>xxx</span></p>
      <p>时 间 <span>xxx</span></p>
    </div>
    <router-link to="detail">
      <div class="details-button">
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
      document.title = '明细详情'
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .details-title {
    height: 60px;
    text-align: center;
    margin-top: 10px;
    border-bottom: 1px solid #f2f2f2;
  }

  .details-information {
    margin: 10px 0 10px 15px;

    p {
      margin-bottom: 5px;
      color: #f2f2f2;

      span {
        color: #333;
        margin-left: 30px;
      }
    }
  }

  .details-button {
    button {
      position: fixed;
      bottom: 0;
      border-radius: 20px;
      background-color: #09BB07;
      color: #fff;
    }
  }
</style>