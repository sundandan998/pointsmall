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
              </router-link>
              <button class="fr status"
                :data-clipboard-text="'订单编号:'+item.order_id+'价格:'+item.currency+'手机号:'+item.user+'商品名称:'+item.sku_name+'创建时间:'+item.transaction_time"
                @click="copy">复制
              </button>
            </div>
          </van-tab>
          <van-tab title="待付款">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
              </router-link>
              <button class="fr status"
                :data-clipboard-text="'订单编号:'+item.order_id+'价格:'+item.currency+'手机号:'+item.user+'商品名称:'+item.sku_name+'创建时间:'+item.transaction_time"
                @click="copy">复制
              </button>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
              </router-link>
              <button class="fr status"
                :data-clipboard-text="'订单编号:'+item.order_id+'价格:'+item.currency+'手机号:'+item.user+'商品名称:'+item.sku_name+'创建时间:'+item.transaction_time"
                @click="copy">复制
              </button>
            </div>
          </van-tab>
          <van-tab title="待收货">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
              </router-link>
              <button class="fr status"
                :data-clipboard-text="'订单编号:'+item.order_id+'价格:'+item.currency+'手机号:'+item.user+'商品名称:'+item.sku_name+'创建时间:'+item.transaction_time"
                @click="copy">复制
              </button>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="product" v-for="(item,index) in orderList">
              <router-link :to="/agentdetail/+item.id">
                <p>{{item.transaction_time}}</p>
                <img :src="item.sku_image" alt="" class="fl">
                <div class="product-text">
                  <p>{{item.sku_name}}</p>
                  <p>{{item.user}}</p>
                </div>
              </router-link>
              <button class="fr status"
                :data-clipboard-text="'订单编号:'+item.order_id+'价格:'+item.currency+'手机号:'+item.user+'商品名称:'+item.sku_name+'创建时间:'+item.transaction_time"
                @click="copy">复制
              </button>
            </div>
          </van-tab>
        </van-tabs>
      </van-list>
    </div>
    <router-link to="mine">
      <div class="order-button" v-if="shops.status!=9">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
    <div class="bottom-button" v-if="shops.status==9">
      <router-link to="mine">
        <van-button square size="large" type="warning"> 返回</van-button>
      </router-link>
      <a id="a_id"></a>
      <van-button square size="large" type="danger" @click.native="downloadFile">导出</van-button>
    </div>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/order/order.js'
  import Clipboard from 'clipboard'
  import { Toast } from 'mint-ui'
  import axios from 'axios'
  import qs from 'qs'
  import baseURL from '../../../utils/baseURL'
  import store from '@/store/index'
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
      document.title = '供货商中心'
      // this.downloadFile()
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
      // 复制内容
      copy() {
        var clipboard = new Clipboard('.status')
        clipboard.on('success', e => {
          Toast({
            message: '复制成功',
            className: 'zZindex'
          })
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      // 导出excel
      // operateFile(file) {
      //   let fileName = '' + "-" + new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + ".xls";
      //   let blobObject = new Blob([file], { type: "application/octet-stream;charset=utf-8" })
      //   let link = document.getElementById('a_id')
      //   link.href = URL.createObjectURL(blobObject)
      //   link.download = fileName
      //   link.click();
      // },
      // 导出excel
      downloadFile() {
        // debugger
        api.export().then(res => {
          if (res.code == 0) {
            var url = res.url
            var iframe = document.createElement("iframe")
            iframe.style.display = "none"
            iframe.src = url
            document.body.appendChild(iframe)
            // this.operateFile(res)
          }
        }).catch(err => {})
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
              this.shops.status = 1
              this.onLoad()
            } else {
              if (index == 3) {
                this.shops.status = 2
                this.onLoad()
              } else {
                if (index == 4) {
                  this.shops.status = 3
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
      top: -16px;
      border: 1px solid #7ECAC3;
      padding: 2px 15px;
      color: #7ECAC3;
      font-size: 0.78rem;
      background-color: #fff;
    }
  }

  .van-tabs__wrap--scrollable .van-tab {
    flex: unset;
  }
</style>