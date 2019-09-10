<template>
  <div class="my-order">
    <div class="my-order-tabs">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <van-tabs v-model="active" color="#1890FF" title-active-color="#1890FF" @click="index">
          <van-tab title="全部">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
                <span class="fr status">{{item.status|orderStatus}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待付款">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail /+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
                <span class="fr status">{{item.status|orderStatus}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail /+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
                <span class="fr status">{{item.status|orderStatus}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="待收货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail /+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
                <span class="fr status">{{item.status|orderStatus}}</span>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail /+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
                <span class="fr status">{{item.status|orderStatus}}</span>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </van-list>
    </div>
    <div class="bottom-button">
      <van-button square size="large" type="warning"> 返回</van-button>
      <van-button square size="large" type="danger">导出</van-button>
    </div>
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
          // is_shops: '1',
          status: ''
        }
      }
    },
    created() {
      document.title = '商家中心'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          this.shops.page = this.pageNum
          api.agent(this.shops).then(res => {
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
            this.shops.status = 9
            this.onLoad()
          } else {
            if (index == 2) {
              this.onLoad()
            } else {
              if (index == 3) {
                this.onLoad()
              }else{
                if(index == 4){
                  this.onLoad()
                }
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
    }

    .status {
      position: relative;
      top: -24px;
    }
  }

  .van-tabs__wrap--scrollable .van-tab {
    flex: unset;
  }
</style>