<template>
  <div class="detail">
    <div class="detail-address">
      <img src="../../../assets/images/mechant-address.png" alt="">
      <span>
        <p class="detail-people">{{detailAddress.name}}&nbsp;&nbsp;{{detailAddress.tel}}</p>
        <p>
          {{detailAddress.province}}{{detailAddress.city}}{{detailAddress.county}}{{detailAddress.addressDetail}}
        </p>
      </span>
    </div>
    <div class="detail-product">
      <van-card :num="detailData.count" :price="detailData.currency" :title="detailData.sku_name"
        :thumb="detailData.sku_image" />
      <div class="detail-status">
        <p><span>总额:</span><span class="fr detail-status-black">￥0</span></p>
        <p><span>订单状态:</span><span class="fr detail-status-red">{{detailData.status|orderStatus}}</span></p>
        <p><span>订单编号:</span><span class="fr detail-status-black">{{detailData.order_id}}</span></p>
        <p><span>交易时间:</span><span class="fr detail-status-black">{{detailData.transaction_time}}</span></p>
      </div>
    </div>
    <router-link to="/agent">
      <div class="order-button" v-show="showBtn">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
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
        id: '',
        detailParams: {
          is_shops: 1
        },
        shipParams: {
          wl_number: '',
          id: this.$route.params.id
        },
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
      }
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
    created() {
      document.title = '订单详情'
      this.detailId = this.$route.params
      this.detail()
    },
    methods: {
      // 订单详情
      detail() {
        api.agentDetail({ 'id': this.$route.params.id }).then(res => {
          this.detailData = res.data
          this.detailAddress = res.data.address
        }).catch(err => {

        })
      },
      // 返回
      cancel() {
        this.$router.push({
          name: 'MerchantCenter'
        })
      },
      // 发货
      ship() {
        api.ship(this.shipParams).then(res => {
          if (res.code == 0) {
            this.detailData.status = 1
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
    .detail-address {
      height: 190px;
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 20px;
      overflow: hidden;

<<<<<<< HEAD
  .detail-address {
    /* border-bottom: 2px solid #f2f2f2; */
    padding: 10px 10px 10px 15px;

    img {
      display: inline-block;
      float: left;
      margin-right: 10px;
      height: 60px;
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
=======
      img {
        float: left;
        height: 40px;
        margin: 70px 22px 0 30px;
      }
>>>>>>> style

      span {
        margin-top: 50px;
        display: block;
        font-size: 26px;
        color: #999;

        .detail-people {
          font-size: 32px;
          color: #333;
          margin-bottom: 5px;
        }
      }
    }

    .detail-product {
      height: auto;
      border-radius: 20px;
      margin: 10px 24px;
      background-color: #fff;

      .van-card {
        background-color: #fff;
        border-radius: 20px;
        .van-card__thumb {
          img {
            height: 90px;
            width: 90px;
          }
        }

<<<<<<< HEAD
  .detail-status {
    margin-top: 40px;
    height: auto;

    p {
      border-bottom: 1px solid #f2f2f2;
      padding: 20px 10px 20px 15px;
    }
=======
        .van-card__title {
          margin-top: 25px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .van-card__bottom {
          font-size: 14px;
>>>>>>> style

          .van-card__num {
            color: #999;
          }
        }
      }

      .detail-status {
        p {
          border-bottom: 1px solid #f2f2f2;
          height: 90px;
          line-height: 90px;
          margin: 0 24px;
          font-size: 29px;
          color: #999;
          .detail-status-red{
            color:#ce0101;
          }
          .detail-status-black{
            color:#333;
          }
        }
      }
    }

  }
</style>