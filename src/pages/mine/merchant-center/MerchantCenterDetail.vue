<template>
  <div class="detail">
    <div class="detail-address">
      <img src="../../../assets/images/mechant-address.png" alt="" class="fl">
      <span>
        <p class="detail-address-people">{{detailAddress.name}}&nbsp;&nbsp;{{detailAddress.tel}}</p>
        <p>
          {{detailAddress.province}}{{detailAddress.city}}{{detailAddress.county}}{{detailAddress.addressDetail}}
        </p>
      </span>
    </div>
    <div class="detail-product">
      <van-card :num="detailData.count" :price="detailData.currency" :title="detailData.sku_name"
        :thumb="detailData.sku_image" />
      <div class="detail-status">
        <p><span>订单状态:</span><span class="fr detail-color-red">{{detailData.status|orderStatus}}</span></p>
        <p><span>订单编号:</span><span class="fr detail-color-black">{{detailData.order_id}}</span></p>
        <p><span>交易时间:</span><span class="fr detail-color-black">{{detailData.transaction_time}}</span></p>
      </div>
    </div>
    <!-- 物流单号 -->
    <div class="detail-num" v-if="detailData.status==1">
      <mt-field label="物流单号" placeholder="请输入物流单号" type="number" v-model="shipParams.wl_number"></mt-field>
    </div>
    <div class="detail-num" v-if="detailData.status==2">
      <p class="wl-num"><span>物流单号</span><span class="fr ">{{detailData.wl_number}}</span></p>
    </div>
    <router-link to="/merchant">
      <div class="order-button">
        <mt-button size="large" v-if="detailData.status!=1">返回</mt-button>
      </div>
    </router-link>
    <div v-if="detailData.status==1" v-show="showBtn">
      <van-button square size="large" type="warning" @click="cancel"> 返回</van-button>
      <van-button square size="large" type="danger" @click="ship">发货</van-button>
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
        api.merchantDetail({ 'id': this.$route.params.id, 'is_shops': '1' }).then(res => {
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
            this.detailData.status = 2
            this.detailData.wl_number = res.data.wl_number
            Toast({
              message: res.msg,
              className: 'zZindex'
            })
          }
        }).catch(err => {
          if (err.code != 0) {
            Toast({
              message: err.msg,
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

      img {
        width: 30px;
        margin: 65px 22px 0 30px;
      }

      span {
        margin-top: 55px;
        display: block;
        font-size: 26px;
        color: #999;
      }

      .detail-address-people {
        font-size: 32px;
        color: #333;
        margin-bottom: 10px;
      }
    }

    /* 商品/订单状态部分 */
    .detail-product {
      background-color: #fff;
      margin: 0px 24px 10px 24px;
      border-radius: 20px;

      .van-card {
        background-color: #fff;
        border-radius: 20px;

        .van-card__title {
          margin-top: 25px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .van-card__price {
          font-size: 14px;
          color: #ce0101;
        }

        .van-card__num {
          font-size: 12px;
          color: #999;
        }
      }

      img {
        width: 180px;
        border-radius: 20px;
      }

      .detail-status {
        margin: 10px 24px;

        p {
          height: 100px;
          line-height: 100px;
          border-bottom: 1px solid #f2f2f2;
          color: #999;
          font-size: 26px;

          .detail-color-red {
            color: #ce0101;
          }

          .detail-color-black {
            color: #333;
          }
        }
      }
    }

    .detail-status p:first-child {
      border-top: 1px solid #f2f2f2;
    }

    /* 物流单号 */
    .detail-num {
      height: 97px;
      background-color: #fff;
      margin: 0 24px;
      border-radius: 20px;
      color: #999;
      .wl-num{
        height: 97px;
        line-height:97px;
        margin-left: 24px;
        font-size:28px;
        margin-right: 24px;
      }
    }
    .mint-cell:last-child {
      border-radius: 20px;
    }
  }
</style>