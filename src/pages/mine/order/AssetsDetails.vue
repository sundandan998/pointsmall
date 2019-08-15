<template>
  <div class="details">
    <div class="details-title">
      <span>{{detailsData.detail_type==1?'转入':detailsData.detail_type==100?'转出':detailsData.detail_type==200?'赠送':detailsData.detail_type==300?'消费':'退款'}}</span>
      <p>{{detailsData.amount}} ({{detailsData.token}})</p>
    </div>
    <div class="details-information">
      <p>流 水 号 <span>{{detailsData.serial_number}}</span></p>
      <p>订单编号 <span>{{detailsData.order_id}}</span></p>
      <p>时 间 <span>{{detailsData.transaction_time}}</span></p>
    </div>
    <router-link to="/detail/+id">
      <div class="details-button">
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
      margin:10px 0;
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

  .details-button {
    button {
      position: fixed;
      bottom: 0;
      border-radius: 20px;
      background-color: #09BB07;
      color: #fff;
    }
  }
</style>