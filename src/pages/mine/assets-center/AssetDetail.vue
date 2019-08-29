<template>
  <div class="asset-detail">
    <div class="asset-center-title">
      <mt-cell title="资产详情" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <div class="asset-detail-code">
      <div class="asset-detail-code-left fl">
        <img :src="assetDataToken.icon" alt="">
        <div class="asset-detail-name">
          <span>{{assetDataToken.code}}</span>
          <p>{{assetDataToken.subject}}</p>
        </div>
      </div>
      <div class="asset-detail-code-right fr">
        <span>{{assetData.balance|keepTwoNum}}</span>
        <p><img src="../../../assets/images/wait.png" alt="">{{assetData.integral|keepTwoNum}}(超级积分)</p>
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="asset-list">
        <router-link
          :to="{name:'AvailableTransfer',params:{amount:assetData.available_amount,action:'available',code:this.assetDataToken.code}}">
          <div class="asset-list-available">
            <span>可用</span>
            <p>{{assetData.available_amount|keepTwoNum}}</p>
            <img src="../../../assets/images/r.png" alt="" class="fr">
          </div>
        </router-link>
        <div class="asset-list-freeze">
          <span>冻结</span>
          <div class="asset-list-freeze-num" v-for="item in listData">
            <router-link
              :to="{name:'FreezeTransfer',params:{order_id: item.order_id,action:'freeze','day':item.remain_days,'freezeDay':item.freeze_days}}">
              <p><span>{{item.amount|keepTwoNum}}</span><span class="fr">还剩{{item.remain_days}}天解冻</span></p>
              <div class="progress">
                <el-slider :value="item.freeze_days-item.remain_days" disabled :max="item.freeze_days"></el-slider>
              </div>
              <img src="../../../assets/images/r.png" alt="" class="fr">
              <span>到期日 {{item.unfreeze_date}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </van-list>
    <!-- 底部按钮 -->
    <router-link to="/assets">
      <div class="order-button">
        <mt-button size="large">取消</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/order/order.js'
  export default {
    data() {
      return {
        // 冻结列表
        listData: [],
        // 资产详情数据
        assetData: {},
        assetDataToken: {},
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      document.title = '资产详情'
      this.assetDetail()
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.freeze({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.listData.push.apply(this.listData, res.data)
              this.loading = false
              if (res.has_next == true) {
                this.pageNum++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
      // 资产详情
      assetDetail() {
        api.personalAssets({ 'code': this.$route.params.code }).then(res => {
          if (res.code == 0) {
            this.assetData = res.data
            this.assetDataToken = res.data.token
          }
        }).catch()
      }
    }
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
    font-size: 0.78rem;
  }

  .asset-detail-code-left {
    margin-left: 15px;

    img {
      margin-right: 10px;
    }
  }

  .asset-detail-code-right {
    margin-right: 10px;
    font-size: 0.78rem;

    span {
      margin-left: 80px;
      font-size: 1.2rem;
    }

    img {
      width: 10px;
    }
  }

  .asset-list-available {
    border-bottom: 4px solid #f2f2f2;

    span {
      font-size: 0.78rem;
      color: #333;
      padding: 5px 15px;
      display: block;
    }

    P {
      padding: 10px 15px;
      border-top: 1px solid #f2f2f2;
    }

    img {
      position: relative;
      top: -30px;
      right: 10px;
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
      border-top: 2px solid #f2f2f2;
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
        background-color: #409EFF !important;
      }


    }
  }

</style>