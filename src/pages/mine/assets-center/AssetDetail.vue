<template>
  <div class="asset-detail">
    <div class="assets-center-title">
      <mt-cell title="资产详情" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <div class="asset-detail-code">
      <div class="asset-detail-code-top">
        <div class="asset-detail-token fl">
          <img src="../../../assets/images/ld.png" alt="">
          <p>life</p>
          <p>斯帕尔克</p>
        </div>
        <div class="asset-num fr">
          <span>500</span>
        </div>
      </div>
      <div class="asset-detail-code-bot">
        <span><img src="../../../assets/images/wait.png" alt="">1200(超级积分)</span>
      </div>
    </div>
    <div class="asset-list">
      <div class="asset-list-top">
        <span>2,000</span><span class="fr">还剩30天解冻</span>
      </div>
      <div class="asset-list-bot">
        <mt-progress :value="20"></mt-progress>
        <!-- <van-progress pivot-text="" show-pivot="false" color="#f2826a" :percentage="25" /> -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 'a',
      }
    },
    created() {
      document.title = '资产详情'
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .asset-detail-code-top {
    height: 20px;
    margin: 10px 10px 10px 15px;
  }

  .asset-detail-code-bot {
    margin: 10px 10px;
    height: 20px;
    float: right;
  }

  .asset-detail-code {
    border-bottom: 2px solid #f2f2f2;
    height: 75px;

    .asset-detail-token {
      display: -webkit-box;

      p {
        display: table-row;
      }

      img {
        margin-right: 15px;
      }

      .integral {
        height: 50px;
      }
    }
  }

  .asset-list {
    .asset-list-top {
      margin: 10px 10px 10px 15px;
    }
  }
</style>