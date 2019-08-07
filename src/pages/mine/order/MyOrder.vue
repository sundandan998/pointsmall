<template>
  <div class="my-order">
    <div class="my-order-tabs">
      <van-tabs v-model="active" color="#1890FF" title-active-color="#1890FF">
        <van-tab title="全部">
          <router-link to="orderdetail">
          <div class="product">
            <p>2019-07-06 12:09</p>
            <img src="../../../assets/images/1.jpg" alt="" class="fl">
            <div class="product-text">
              <p>华为运动智能手环</p>
              <p>1(LIFE+)</p>
            </div>
            <span class="fr status">待发货</span>
          </div>
        </router-link>
        </van-tab>
        <van-tab title="待发货">
          <div class="product">
            <p>2019-07-06 12:09</p>
            <img src="../../../assets/images/1.jpg" alt="" class="fl">
            <div class="product-text">
              <p>华为运动智能手环</p>
              <p>1(LIFE+)</p>
            </div>
            <span class="fr status">待发货</span>
          </div>
        </van-tab>
        <van-tab title="待收获">
          <div class="product">
            <p>2019-07-06 12:09</p>
            <img src="../../../assets/images/1.jpg" alt="" class="fl">
            <div class="product-text">
              <p>华为运动智能手环</p>
              <p>1(LIFE+)</p>
            </div>
            <span class="fr status">待发货</span>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="product">
            <p>2019-07-06 12:09</p>
            <img src="../../../assets/images/1.jpg" alt="" class="fl">
            <div class="product-text">
              <p>华为运动智能手环</p>
              <p>1(LIFE+)</p>
            </div>
            <span class="fr status">待发货</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <router-link to="mine">
    <div class="order-button">
      <mt-button size="large">返回</mt-button>
    </div>
  </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0
      }
    },
    created() {
      document.title = '我的订单'
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .product {
    margin: 10px 15px 0 15px;
    height: 106px;
    color: #333;
    img {
      width: 60px;
      height: 80px;
      margin-right: 10px;
    }

    .product-text {
      margin-top: 8px;
    }

    .product-text p:last-child {
      position: relative;
      top: 16px;
      color: #E51C23;
    }

    .status {
      position: relative;
      top: -24px;
    }
  }

  .order-button {
    button {
      border-radius: 20px;
      background-color: #F9F9F9;
      color: #4ECD4D !important;
      border: 1px solid #4ECD4D !important;
      position: fixed;
      bottom: 10px;
    }
  }
</style>