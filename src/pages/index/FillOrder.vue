<template>
  <div class="order">
    <div class="order-product">
      <div class="index-img fl">
        <img src="../../assets/images/1.jpg" alt="">
      </div>
      <div class="index-text">
        <p>生物质石墨烯乳胶健康枕</p>
        <p>120 积分</p>
      </div>
    </div>
    <div class="order-details">
      <div class="order-color">
        <p>颜色</p>
        <p><span>白色</span><span>黑色</span></p>
      </div>
      <div class="order-size">
        <p>尺寸</p>
        <p><span>单人</span><span>双人</span></p>
      </div>
      <p>数量</p>
      <p>合计</p>
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
      document.title = '填写订单'
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .order-product {
    margin: 5px 10px 10px 10px;
    height: 80px;

    .index-img img {
      width: 60px;
      height: 80px;
      margin-right: 10px;
    }

    .index-text {
      position: relative;
      top: 8px;
      color: #333;
    }

    .index-text p:last-child {
      position: relative;
      top: 18px;
      color: #E51C23;
    }
  }

  .order-details {
    p {
      margin-left: 15px;
      margin-top: 10px;

      span {
        width: 50px;
        height: 25px;
        background-color: pink;
        margin-right: 20px;
        display: inline-block;
        border-radius: 7px;
        color: #fff;
        line-height: 25px;
        text-align: center;
      }
    }

    .order-color {
      border-top: 2px solid #f2f2f2;
    }
  }
</style>