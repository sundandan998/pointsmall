<template>
  <div>
    <!-- <div class="button"> -->
      <van-goods-action>
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>
    <!-- </div> -->
  </div>
</template>
<script>

  export default {
    data() {
      return {
      }
    },
    created() {
      document.title = '商品详情'
    },
    methods: {
      onClickIcon() {
        Toast('点击图标');
      },
      onClickButton() {
        Toast('点击按钮');
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
</style>