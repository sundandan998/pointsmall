<template>
  <div class="detail">
    <div class="detail-address">
      <img src="../../../assets/images/mechant-address.png" alt="">
      <span>
        <p>{{detailAddress.name}} {{detailAddress.tel}}</p>
        <p class="detail-province">
          {{detailAddress.province}}{{detailAddress.city}}{{detailAddress.county}}{{detailAddress.addressDetail}}
        </p>
      </span>
    </div>
    <div class="detail-product">
      <van-card :num="detailData.count" :desc="'￥'+detailData.currency" :title="detailData.sku_name"
        :thumb="detailData.sku_image" />
        <p><span class="detail-num">积分总额:</span><span class="fr">{{detailData.total_integral}}(超级积分)</span></p>
        <p><span class="detail-num">实付通证数量:</span><span class="fr">{{detailData.total_amount}}({{detailData.token}})</span>
        </p>
        <p  v-if="detailData.status!=1"><span class="detail-num">物流单号:</span><span class="fr">{{detailData.wl_number}}</span>
        </p>
        <div class="detail-status">
          <p><span class="detail-num">订单状态:</span><span class="fr">{{detailData.status|orderStatus}}</span></p>
          <p><span class="detail-num">订单编号:</span><span class="fr">{{detailData.order_id}}</span></p>
          <p><span class="detail-num">交易时间:</span><span class="fr">{{detailData.transaction_time}}</span></p>
        </div>
    </div>
  
    <router-link to="/myorder">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
    <div class="bottom-button" v-if="detailData.status==2" v-show="showBtn">
      <van-button square size="large" type="primary" @click="cancel"> 返回</van-button>
      <van-button square size="large" type="danger" @click=receipt>确认收货</van-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/order/order.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        status: '',
        detailData: {},
        detailAddress: {},
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
      }
    },
    created() {
      document.title = '订单详情'
      this.detailId = this.$route.params
      this.detail()
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
    },
    methods: {
      // 订单详情
      detail() {
        api.merchantDetail(this.$route.params).then(res => {
          this.detailData = res.data
          this.detailAddress = res.data.address
        }).catch(err => {

        })
      },
      // 取消
      cancel() {
        this.$router.push({
          name: 'MyOrder'
        })
      },
      //  确认收货
      receipt() {
        api.receipt(this.$route.params).then(res => {
          if (res.code == 0) {
            this.detailData.status = 3
            Toast({
              message: res.msg,
              className: 'zZindex'
            })
          }
        }).catch(err => {
          if (err.code != 0) {
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/Global.scss";

  .detail {

    /* 地址 */
    .detail-address {
      height: 190px;
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 20px;
      overflow: hidden;

      img {
        display: inline-block;
        float: left;
        margin: 60px 20px 0 30px;
        height: 45px;
      }

      span {
        display: block;
        margin-top: 50px;
        font-size: 32px;

        .detail-province {
          font-size: 26px;
          color: #999;
        }
      }
    }

    /* 商品 */
    .detail-product {
      height: auto;
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 20px;

      .van-card__thumb {
        img {
          border-radius: 20px;
        }
      }

      .van-card {
        background-color: #fff;
        border-radius: 20px;
      }

      .van-card__content {
        font-size: 14px;
        margin-top: 20px;
      }
      .van-card__title{
        margin-bottom: 20px;
      }
      .van-card__desc.van-ellipsis {
        font-size: 15px;
        color: #c9191d;
      }
      p{
        height: 100px;
        line-height: 100px;
        margin: 0 30px 0 40px;
        font-size: 26px;
        color:#333;
        border-bottom: 1px solid #f2f2f2;
        .detail-num{
          color:#999;
        }
      }
    }
  }
</style>