<template>
  <div class="detail">
    <div class="detail-address">
      <img src="../../../assets/images/address.svg" alt="">
      <span>
        <p>收件人：xxxxx</p>
        <p>收获地址：dxxxxxx</p>
      </span>
    </div>
    <div class="detail-product">
      <van-card num="2" price="120积分" title="华为运动智能手环" thumb="https://img.yzcdn.cn/vant/t-thirt.jpg" />
      <!-- <img src="../../../assets/images/1.jpg" alt="">
      <span>
        <p>华为运动智能手环</p>
        <p>120积分</p>
      </span>
      <span class="fr">2</span> -->
    </div>
    <p class="detail-num"><span>积分总额:</span><span class="fr">1(LIFE+)</span></p>
    <p class="detail-num"><span>实付通证数量:</span><span class="fr">1(LIFE+)</span></p>
    <p class="detail-num"><span>物流单号:</span><span class="fr">xxxxxx</span></p>
    <div class="detail-status">
      <p><span>订单状态:</span><span class="fr">xxx</span></p>
      <p><span>订单编号:</span><span class="fr">xxx</span></p>
      <p><span>交易时间:</span><span class="fr">xxx</span></p>
    </div>
    <router-link to="myorder">
      <div class="detail-button">
        <!-- <mt-button size="large">返回</mt-button> -->
        <goods-action-button
        type="danger"
        text="立即购买"
      />
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
      document.title = '订单详情'
    }
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/Global.scss";

  .detail {}

  .detail-address {
    border-bottom: 2px solid #f2f2f2;
    padding: 10px 10px 10px 15px;

    img {
      display: inline-block;
      float: left;
      margin-right: 30px;
      height: 30px;
    }
  }

  .van-card {
    background-color: #fff;
  }

  .van-card__content {
    min-height: 5px;
  }

  .van-card__thumb {
    height:40px;
    width: 40px;
    margin-right: -5px;
  }

  .detail-product {
    height: 70px;
    padding: 10px 10px 0 15px;

    img {
      width: 60px;
      position: relative;
      left: -18px;
    }
  }

  .detail-num {
    border-top: 1px solid #f2f2f2;
    border-bottom: 2px solid #f2f2f2;
    padding: 10px 10px 10px 15px;
  }

  .detail-status {
    p {
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 10px 10px 15px;
    }

    p span:first-child {
      color: #A6A6A6;
    }
  }

  .detail-button {
    button {
      width: 100%;
      border-radius: 20px;
      background-color: #fff;
      color: #4ECD4D !important;
      border: 1px solid #4ECD4D !important;
      position: fixed;
      bottom: 10px;
    }
  }
</style>