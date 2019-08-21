<template>
  <div class="transfer-detail">
    <div class="transfer-detail-title">
      <span>转让</span>
      <p>2000LIFE+</p>
    </div>
    <div class="transfer-detail-infor">
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
    </div>
    <div class="bottom-button">
      <van-button square size="large" type="warning"> 返回</van-button>
      <van-button square size="large" type="danger" @click="transfer">再转一笔</van-button>
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
      document.title = '订单详情'
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .transfer-detail-title {
    border-bottom: 2px solid #f2f2f2;
    padding: 10px 0 10px 15px;

    p {
      padding-top: 10px;
    }
  }

  .transfer-detail-infor {
    .mint-cell {
      margin-bottom: 0px;
      min-height: 40px;
    }
  }
</style>