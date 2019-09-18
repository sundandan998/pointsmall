<template>
  <div class="details">
    <div class="details-title">
      <span>{{detailsData.detail_type}}</span>
      <p>{{detailsData.transaction_type==0?'+':'-'}}{{detailsData.amount|keepTwoNum}} ({{detailsData.token}})</p>
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

  .details-title {
    height: 60px;
    text-align: center;
    margin-top: 10px;
    border-bottom: 1px solid #f2f2f2;

    span {
      margin: 10px 0;
      display: block;
    }
  }

  .details-information {
    margin: 10px 0 10px 15px;

    p {
      margin-bottom: 5px;
      color: #333;

      span {
        color: #333;
        margin-left: 30px;
      }
    }
  }
</style>