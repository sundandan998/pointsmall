<template>
  <div class="my-order">
    <div class="my-order-tabs">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <van-tabs v-model="active" color="#1890FF" title-active-color="#1890FF">
          <van-tab title="全部">
            <div class="product"  v-for="item in orderList">
              <router-link :to="/merchantdetail/+item.id">
              <p>{{item.transaction_time}}</p>
              <img :src="item.sku_image" alt="" class="fl">
              <div class="product-text">
                <p>{{item.sku_name}}</p>
                <p>{{item.total_amount|keepTwoNum}} ({{item.token}})</p>
              </div>
              <span class="fr status">{{item.status==1?'待发货':item.status==2?'待收货':'已完成'}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="product" v-for="item in orderList">
              <router-link :to="/merchantdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.total_amount|keepTwoNum}} ({{item.token}})</p>
                </div>
                <span class="fr status">{{item.status==1?'待发货':item.status==2?'待收货':'已完成'}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待收货">
            <div class="product">
              <p>2019-07-06 12:09</p>
              <img src="../../../assets/images/1.jpg" alt="" class="fl">
              <div class="product-text">
                <p>华为运动智能手环</p>
                <p>1(LIFE+)</p>
              </div>
              <span class="fr status">待发货</span>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="product">
              <p>2019-07-06 12:09</p>
              <img src="../../../assets/images/1.jpg" alt="" class="fl">
              <div class="product-text">
                <p>华为运动智能手环</p>
                <p>1(LIFE+)</p>
              </div>
              <span class="fr status">待发货</span>
            </div>
          </van-tab>
        </van-tabs>
      </van-list>
    </div>
    <router-link to="mine">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/order/order.js'
  export default {
    data() {
      return {
        active: 0,
        orderList: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      document.title = '用户订单'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.merchantOrder({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.orderList.push.apply(this.orderList, res.data)
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

  .product {
    margin: 10px 15px 0 15px;
    height: 106px;

    p {
      color: #333;
    }

    span {
      color: #333;
    }

    img {
      width: 60px;
      height: 80px;
      margin-right: 10px;
    }

    .product-text {
      margin-top: 8px;
    }

    .product-text p:last-child {
      position: relative;
      top: 16px;
      color: #E51C23;
    }

    .status {
      position: relative;
      top: -24px;
    }
  }

  .order-button {
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