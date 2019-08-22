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
      <van-card :num="detailData.count" :price="detailData.price+'积分'" :title="detailData.sku_name"
        :thumb="detailData.sku_image" />
    </div>
    <div class="detail-status">
      <p><span>订单状态:</span><span class="fr">{{detailData.status==1?'待发货':detailData.status==2?'待收货':'已完成'}}</span></p>
      <p><span>订单编号:</span><span class="fr">{{detailData.order_id}}</span></p>
      <p><span>交易时间:</span><span class="fr">{{detailData.transaction_time}}</span></p>
    </div>
    <div class="detail-num" v-if="detailData.status==1">
      <mt-field label="物流单号" placeholder="请输入物流单号" type="number" v-model="shipParams.wl_number"></mt-field>
    </div>
    <div class="detail-num" v-if="detailData.status!=1">
      <p class="wl-num"><span>物流单号</span><span class="fr">{{detailData.wl_number}}</span></p>
    </div>
    <router-link to="/merchant">
      <div class="merchant-button">
        <mt-button size="large" v-if="detailData.status!=1">返回</mt-button>
      </div>
    </router-link>
    <div class="bottom-button" v-if="detailData.status==1" v-show="showBtn">
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
        clientHeight:document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
      }
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize= ()=>{
        if(this.clientHeight>document.documentElement.clientHeight) {
          this.showBtn =false
        }else{
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
            // console.log(this.detailData.status==)
            this.detailData.status='已完成'
            // window.location.reload()
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
    border-bottom: 2px solid #f2f2f2;
    padding: 10px 10px 10px 15px;

    img {
      display: inline-block;
      float: left;
      margin-right: 10px;
      height: 30px;
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

    img {
      width: 60px;
      position: relative;
      left: -18px;
    }
  }

  .detail-num {
    border-top: 1px solid #f2f2f2;
    border-bottom: 2px solid #f2f2f2;

    .wl-num {
      padding: 10px 10px 10px 15px;

    }
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

  .merchant-button {
    button {
      border-radius: 20px;
      background-color: #F9F9F9;
      color: #4ECD4D !important;
      border: 1px solid #4ECD4D !important;
      position: fixed;
      bottom: 10px;
    }
  }
</style>