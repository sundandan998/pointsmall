<template>
  <div class="detail">
    <div class="detail-address">
      <img src="../../../assets/images/address.svg" alt="">
      <span>
        <p>收件人：{{detailAddress.name}} {{detailAddress.tel}}</p>
        <p>
          收获地址：{{detailAddress.province}}{{detailAddress.city}}{{detailAddress.county}}{{detailAddress.addressDetail}}
        </p>
      </span>
    </div>
    <div class="detail-product">
      <van-card :num="detailData.count" :desc="detailData.price+'积分'" :title="detailData.sku_name"
        :thumb="detailData.sku_image" />
    </div>
    <p class="detail-num"><span>积分总额:</span><span
        class="fr">{{detailData.total_integral|keepTwoNum}}({{detailData.token}})</span></p>
    <p class="detail-num"><span>实付通证数量:</span><span
        class="fr">{{detailData.total_amount|keepTwoNum}}({{detailData.token}})</span></p>
    <p class="detail-num" v-if="detailData.status!=1"><span>物流单号:</span><span class="fr">{{detailData.wl_number}}</span>
    </p>
    <div class="detail-status">
      <p><span>订单状态:</span><span class="fr">{{detailData.status==1?'待发货':detailData.status==2?'待收货':'已完成'}}</span></p>
      <p><span>订单编号:</span><span class="fr">{{detailData.order_id}}</span></p>
      <p><span>交易时间:</span><span class="fr">{{detailData.transaction_time}}</span></p>
    </div>
    <router-link to="/myorder">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
    <div class="bottom-button" v-if="detailData.status==2">
      <van-button square size="large" type="warning" @click="cancel"> 返回</van-button>
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
        detailData: {},
        detailAddress: {},
      }
    },
    created() {
      document.title = '订单详情'
      this.detailId = this.$route.params
      this.detail()
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
      cancel() {
        this.$router.push({
          name: 'MyOrder'
        })
      },
      //  确认收货
      receipt() {
        api.receipt(this.$route.params).then(res => {
          if (res.code == 0) {
            window.location.reload()
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

  .detail-address {
    /* border-bottom: 2px solid #f2f2f2; */
    padding: 10px 10px 10px 15px;

    img {
      display: inline-block;
      float: left;
      margin-right: 10px;
      height: 45px;
    }
  }

  .van-card {
    background-color: #fff;
  }

  .van-card__content {
    min-height: 5px;
  }

  .van-card__thumb {
    height: 40px;
    width: 40px;
    margin-right: -5px;
  }

  .detail-product {
    height: 70px;
    padding: 10px 10px 0 15px;
    .van-card__desc {
      color: red;
      max-height: 20px;
    }
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