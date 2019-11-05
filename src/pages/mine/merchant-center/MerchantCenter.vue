<template>
  <div class="my-order">
    <div class="my-order-tabs">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <van-tabs v-model="active" color="#1890FF" title-active-color="#1890FF" @click="index">
          <van-tab title="全部">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/merchantdetail/+item.id">
                <p class="product-time">{{item.transaction_time}}</p>
                <span class="fr status">{{item.status|orderStatus}}</span>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>￥{{item.currency|keepTwoNum}}</p>
                </div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/merchantdetail/+item.id">
                <p class="product-time">{{item.transaction_time}}</p>
                <span class="fr status">{{item.status|orderStatus}}</span>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>￥{{item.currency|keepTwoNum}}</p>
                </div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待收货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/merchantdetail/+item.id">
                <p class="product-time">{{item.transaction_time}}</p>
                <span class="fr status">{{item.status|orderStatus}}</span>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <!-- <p>{{item.total_amount|keepTwoNum}} ({{item.token}})</p> -->
                  <p>￥{{item.currency|keepTwoNum}}</p>
                </div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/merchantdetail/+item.id">
                <p class="product-time">{{item.transaction_time}}</p>
                <span class="fr status">{{item.status|orderStatus}}</span>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>￥{{item.currency|keepTwoNum}}</p>
                </div>
              </router-link>
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
        shops: {
          page: '',
          is_shops: '1'
        }
      }
    },
    created() {
      document.title = '用户订单'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          this.shops.page = this.pageNum
          api.merchantOrder(this.shops).then(res => {
            if (res.code == 0) {
              this.orderList.push.apply(this.orderList, res.data)
              this.loading = false
              if (res.has_next == true) {
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
      // tab栏展示列表
      index(index, title) {
        this.pageNum = 1
        this.orderList = []
        if (index == 0) {
          if (this.shops.status != undefined) {
            delete this.shops.status
          }
          this.onLoad()
        } else {
          this.shops.status = index
          if (index == 1) {
            this.onLoad()
          } else {
            if (index == 2) {
              this.onLoad()
            } else {
              if (index == 3) {
                this.onLoad()
              }
            }
          }
        }
      },
    }

  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .product {
    margin: 10px 24px;
    height: 310px;
    background-color: #fff;
    border-radius:20px;
    .product-time{
      width: 94%;
      font-size: 28px;
      color: #333;
      height: 90px;
      line-height:90px;
      margin-left: 20px;
      border-bottom:1px solid #f2f2f2;
    }
    img {
      width: 180px;
      height: 180px;
      margin:10px 20px 0 20px;
      border-radius:20px;
    }
    .product-text{
      margin-top: 70px;
      font-size: 28px;
      color:#c9191d;
    }
    .product-text p:last-child {
      position: relative;
      top: 16px;
      color: #333;
      float: right;
      right:20px;
    }

    .status {
      position: relative;
      top: -60px;
      font-size: 30px;
      color:#c9191d;
      right:20px;
    }
  }
  .van-tabs__wrap--scrollable .van-tab {
    flex: unset;
  }
</style>