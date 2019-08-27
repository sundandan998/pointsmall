<template>
  <div class="transfer-detail">
    <div class="transfer-detail-title">
      <span>{{transferData.transaction_type}}</span>
      <p>{{transferData.amount|keepTwoNum}}({{transferData.token}})</p>
    </div>
    <div class="transfer-detail-infor">
      <mt-cell title="订单号" :value="transferData.order_id"></mt-cell>
      <mt-cell title="接收方" :value="transferData.other_user"></mt-cell>
      <mt-cell title="状态" :value="transferData.status"></mt-cell>
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
        transferData:{}
      }
    },
    created() {
      document.title = '订单详情'
      this.transferDetail()
    },
    methods: {
      transferDetail() {
        api.assetsDetail({ order_id: this.$route.params.order_id }).then(res=>{
         if(res.code==0){
           this.transferData=res.data
         }
        }).catch(err=>{
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .transfer-detail-title {
    border-bottom: 2px solid #f2f2f2;
    padding: 10px 0 10px 15px;

    p {
      padding-top: 10px;
    }
  }

  .transfer-detail-infor {
    .mint-cell {
      margin-bottom: 0px;
      min-height: 40px;
    }
  }
</style>