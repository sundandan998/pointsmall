<template>
  <div class="detail">
    <div class="detail-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载" >
        <div class="detail-list-text" v-for="item in detailData">
          <router-link :to="/assetsdetails/+item.id">
            <mt-cell v-if="item.detail_type!='冻结'&&item.detail_type!='解冻'" :title="item.detail_type" :label="item.transaction_time" is-link>
              <span>{{item.transaction_type==0?'+':'-'}}{{item.amount|keepTwoNum}}</span><b>({{item.token}})</b> 
              <img v-if="item.detail_type=='转让'" slot="icon" src="../../../assets/images/zhuanrang@2x.png" width="20" height="20">
              <img v-if="item.detail_type=='赠送'" slot="icon" src="../../../assets/images/zengsong@2x.png" width="20" height="20">
              <img v-if="item.detail_type=='受让'" slot="icon" src="../../../assets/images/shourang@2x.png" width="20" height="20" >
              <img v-if="item.detail_type=='消费'"slot="icon" src="../../../assets/images/xiaofei@2x.png" width="20" height="20">
            </mt-cell>
          </router-link>
        </div>
      </van-list>
    </div>
    <router-link to="/assets">
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
        detailData: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,

      }
    },
    created() {
      document.title = '明细'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.detail({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.detailData.push.apply(this.detailData, res.data)
              this.loading = false
              if (res.has_next == true) {
                // this.loading = true
                this.pageNum++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';
  .detail-list {
    margin:10px 24px 70px 24px;
    .mint-cell-label{
      color:#999;
    }
    .mint-cell-value{
      span{
        color:#c9191d;
        margin-right: 10px;
      }
      b{
        font-weight: normal;
        color:#333;
      }
    }
  }
  .detail-list .detail-list-text:first-child .mint-cell{
    border-top-right-radius:20px !important;
    border-top-left-radius:20px !important;
  }
  .detail-list-text:last-child .detail-list-text{
    border-bottom-right-radius:20px;
    border-bottom-left-radius:20px;
  }
</style>