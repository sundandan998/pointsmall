<template>
  <div class="transfer-detail">
    <div class="transfer-detail-title">
      <span>{{transferData.transaction_type}}</span>
      <p> <b>{{transferData.amount|keepTwoNum}}</b> ({{transferData.token}})</p>
    </div>
    <div class="transfer-detail-infor">
      <mt-cell title="订单号" :value="transferData.order_id"></mt-cell>
      <mt-cell title="接收方" :value="transferData.other_user" v-if="transferData.other_user!=null"></mt-cell>
      <mt-cell title="状态" :value="transferData.status"></mt-cell>
    </div>
    <div class="transfer-detail-date">
      <mt-cell title="交易时间" :value="transferData.transaction_time"></mt-cell>
      <mt-cell title="到期日" :value="transferData.unfreeze_date"></mt-cell>
    </div>
    <div class="bottom-button">
      <van-button square size="large" type="warning" v-on:click="$router.go(-3)"> 返回</van-button>
      <!-- @click="transfer" -->
      <van-button square size="large" type="danger" v-on:click="$router.go(-3)">再转一笔</van-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/order/order.js'
  export default {
    data() {
      return {
        transferData: {}
      }
    },
    created() {
      document.title = '订单详情'
      this.transferDetail()
    },
    methods: {
      transferDetail() {
        api.assetsDetail({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.transferData = res.data
          }
        }).catch(err => {
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .transfer-detail {
    .transfer-detail-title {
      height: 190px;
      background-color: #fff;
      text-align: center;
      margin: 10px 12px;
      overflow: hidden;
      border-radius: 20px;

      span {
        margin: 30px 0 20px 0;
        display: block;
        font-size: 32px;
        color: #333;
      }

      p {
        font-size: 24px;

        b {
          font-size: 34px;
          color: #c9191d;
          font-weight: 400;
        }
      }
    }
    .transfer-detail-infor {
      margin: 10px 12px;
      .mint-cell-text{
        color:#999;
      }
    }
    .transfer-detail-infor .mint-cell:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .transfer-detail-infor .mint-cell:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .transfer-detail-date{
      margin: 10px 12px;
      .mint-cell-text{
        color:#999;
      }
    }
    .transfer-detail-date .mint-cell:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .transfer-detail-date .mint-cell:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
</style>