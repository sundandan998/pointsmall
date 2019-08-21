<template>
  <div class="asset-detail">
    <div class="asset-center-title">
      <mt-cell title="资产详情" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <div class="asset-detail-code">
      <div class="asset-detail-code-left fl">
        <img src="../../../assets/images/ld.png" alt="">
        <div class="asset-detail-name">
          <span>life</span>
          <p>斯帕尔克</p>
        </div>
      </div>
      <div class="asset-detail-code-right fr">
        <span>500</span>
        <p><img src="../../../assets/images/wait.png" alt="">1200(超级积分)</p>
      </div>
    </div>
    <div class="asset-list">
      <router-link to="transfer">
        <div class="asset-list-available">
          <mt-cell title="可用" label="描述信息" is-link></mt-cell>
        </div>
        <div class="asset-list-freeze">
          <span>冻结</span>
          <div class="asset-list-freeze-num">
            <p><span>2000</span><span class="fr">还剩30天解冻</span></p>
            <div class="progress">
              <el-slider v-model="value" disabled></el-slider>
            </div>
            <img src="../../../assets/images/r.png" alt="" class="fr">
            <span>到期日 2019-1-12</span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 底部按钮 -->
    <router-link to="mine">
      <div class="order-button">
        <mt-button size="large">取消</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value:10
      }
    },
    created() {
      document.title = '资产详情'
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .asset-detail-code {
    height: 55px;
    border-bottom: 4px solid #f2f2f2;
  }

  .asset-detail-name {
    display: inline-block;
  }

  .asset-detail-code-left {
    margin-left: 15px;

    img {
      margin-right: 10px;
    }
  }

  .asset-detail-code-right {
    margin-right: 10px;

    span {
      margin-left: 80px;
    }
  }

  .asset-list {
    .asset-list-top {
      margin: 10px 10px 10px 15px;
    }
  }

  /* 冻结部分 */
  .asset-list-freeze {
    border-bottom: 1px solid #f2f2f2;

    span {
      margin: 0 30px 0 15px;
      font-size: 0.78rem;
    }
    .asset-list-freeze-num {
      border-top: 1px solid #f2f2f2;
      margin-top: 5px;
      p {
        margin-top: 5px;
      }

      img {
        margin: -30px 10px 0 0;
      }
    }
    .asset-list-freeze-num span:last-child {
      display: block;
      margin-bottom: 5px;
    }

    .progress {
      width: 85%;
      margin-left: 15px;
      .el-slider__runway {
        background-color: #409EFF;
      }
    
    }
  }
</style>