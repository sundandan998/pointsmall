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
      <div class="asset-detail-code-right">
        <span class="fr">{{assetData.balance}}</span>
        <p>&asymp;{{assetData.integral}}(超级积分)</p>
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="asset-list">
        <router-link
          :to="{name:'AvailableTransfer',params:{amount:assetData.available_amount||this.detail.available_amount,action:'available',code:this.assetDataToken.code}}">
          <div class="asset-list-available">
            <span>可用</span>
            <p>{{assetData.available_amount}}</p>
            <img src="../../../assets/images/r.png" alt="" class="fr">
          </div>
        </router-link>
        <div class="asset-list-freeze">
          <span class="asset-list-freeze-title">冻结</span>
          <div class="asset-list-freeze-num" v-for="item in listData">
            <router-link
              :to="{name:'FreezeTransfer',params:{order_id: item.order_id,action:'freeze','day':item.remain_days,'freezeDay':item.freeze_days}}">
              <p><span>{{item.amount}}</span><span class="fr asset-list-day">还剩 <b>{{item.remain_days}}</b>天解冻</span>
              </p>
              <div class="progress">
                <el-slider :value="item.freeze_days-item.remain_days" disabled :max="item.freeze_days"></el-slider>
              </div>
              <img src="../../../assets/images/r.png" alt="" class="fr">
              <span class="asset-list-date">到期日 {{item.unfreeze_date}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </van-list>
    <!-- 底部按钮 -->
    <router-link to="/assets">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/order/order.js'
  import {mapActions,mapGetters } from 'vuex'
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
            this.$store.commit('detail',res.data)
          }
        }).catch()
      }
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .asset-detail {

    /* 标题部分 */
    .asset-center-title {
      margin: 10px 24px;

      .mint-cell {
        border-radius: 10px;
      }
    }

    /* 通证部分 */
    .asset-detail-code {
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 10px;
      height: 150px;

      .asset-detail-code-left {
        margin-top: 40px;

        .asset-detail-name {
          display: inline-block;

          span {
            font-size: 28px;
          }

          p {
            font-size: 22px;
            color: #999;
          }
        }

        img {
          margin: 0 30px 0 20px;
        }

      }

      .asset-detail-code-right {
        text-align: right;

        p {
          display: inline-block;
          font-size: 20px;
          margin-right: 20px;
          color: #999;
        }

        span {
          font-size: 28px;
          color: #c9191d;
          display: inline-block;
          margin: 40px 20px 0 0px;
        }
      }
    }

    /* 可用 */
    .asset-list-available {
      height: 160px;
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 10px;
      overflow: hidden;

      span {
        font-size: 28px;
        color: #333;
        display: block;
        margin: 20px;
      }

      P {
        padding: 20px;
        font-size: 28px;
        border-top: 1px solid #f2f2f2;
      }

      img {
        position: relative;
        top: -50px;
        right: 10px;
      }

    }

    /* 冻结部分 */
    .asset-list-freeze {
      background-color: #fff;
      height: auto;
      margin: 0 24px;
      border-radius: 20px;
      overflow: hidden;

      .asset-list-freeze-title {
        font-size: 28px;
        display: block;
        margin: 20px;
      }

      .asset-list-freeze-num {
        border-top: 2px solid #f2f2f2;

        p {
          font-size: 28px;
          margin: 32px 20px 32px 20px;

          .asset-list-day {
            color: #333;

            b {
              color: #c9191d;
              font-weight: 400;
            }
          }
        }

        img {
          margin: -30px 10px 0 0;
        }
        .asset-list-date {
          display: block;
          margin: 22px 0 22px 20px;
          color: #999;
          font-size: 22px;
        }
      }

      /* 步骤条 */
      .progress {
        width: 85%;
        margin-left: 20px;

        .el-slider__runway {
          background-color: #409EFF !important;
          height: 20px;
          border-radius: 20px;
          line-height: 20px;
        }

        .el-slider__runway.disabled .el-slider__bar {
          background-color: #C0C4CC;
          height: 20px;
          border-radius: 20px;
        }

        .el-slider__runway.disabled .el-slider__button {
          /* height: 30px;
          width: 30px;
          top: 4px;
          position: relative; */
          display: none;
        }
      }
    }
  }
</style>