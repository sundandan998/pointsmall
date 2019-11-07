<template>
  <div class="details">
    <div class="details-title">
      <img src="../../../assets/images/shourang@2x.png" alt="">
      <span class="detail-type">{{detailsData.detail_type}}</span>
      <p>{{detailsData.transaction_type==0?'+':'-'}}{{detailsData.amount|keepTwoNum}} <span>({{detailsData.token}})</span> </p>
    </div>
    <div class="details-information">
      <mt-cell title="流 水 号" :value="detailsData.serial_number"></mt-cell>
      <mt-cell title="订单编号" :value="detailsData.order_id"></mt-cell>
      <mt-cell title="时 间" :value="detailsData.transaction_time"></mt-cell>
    </div>
    <router-link to="/assetsdetail">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        detailsData: {}
      }
    },
    created() {
      document.title = '明细详情'
      this.detail()
    },
    methods: {
      detail() {
        api.details(this.$route.params).then(res => {
          this.detailsData = res.data
        }).catch(err => {
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .details {
    .details-title {
      height: 400px;
      margin: 10px 24px;
      background-color: #fff;
      border-radius: 20px;
      overflow: hidden;

      .detail-type {
        display: block;
        text-align: center;
      }

      p {
        text-align: center;
        font-size: 50px;
        color: #333;
        margin-top: 40px;
        span{
        font-size: 26px;
        }
      }

      img {
        margin: 60px auto 10px auto;
        display: block;
      }
    }

    .details-information {
      height: auto;
      margin: 10px 24px;
      background-color: #fff;
      border-radius: 20px;

      .mint-cell-text {
        color: #999;
      }
    }

    .details-information .mint-cell:first-child {
      border-radius: 20px;
    }

    .details-information .mint-cell:last-child {
      border-radius: 20px;
    }
  }
</style>