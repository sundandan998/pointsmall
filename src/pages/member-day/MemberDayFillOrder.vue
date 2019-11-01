<template>
  <div class="order">
    <div class="order-product">
      <img :src="orderData.default_image" alt="" class="fl">
      <span>
        <p>{{orderData.name}}</p>
        <p><b class="order-product-price">{{orderData.price|keepTwoNum}}</b>超级积分</p>
      </span>
      <!-- <van-card :desc="orderData.price+'积分'" :title="orderData.name" :thumb="orderData.default_image" /> -->
    </div>
    <!-- 商品信息 -->
    <div class="product-model">
      <div class="product-model-title" v-for="(item,index) in orderModel">
        <p>{{item.name}}</p>
        <!-- :class="{disabled:goods.sku_id ===null}" -->
        <span v-for="(goods,index) in item.options" @click="selectGoods(goods.sku_id)"
          :class="{select:goods.sku_id ===orderData.id,disabled:goods.sku_id ===null}">{{goods.value}}</span>
      </div>
    </div>
    <!-- 数量 -->
    <div class="order-detail">
      <div class="order-detail-num">
        <span>数量</span> <span class="fr">
          <van-stepper v-model="value" /></span>
      </div>
      <p class="order-total"><span>合计</span><span class="fr"><b>{{orderData.price*value}} </b>超级积分 </span></p>
    </div>
    <!-- 收货地址 -->
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id,path:'memberday'}}">
      <div class="order-address-member">
        <img src="../../assets/images/map.png" alt="" class="fl">
        <img src="../../assets/images/r.png" alt="" class="fr right-arrow">
        <div v-if="orderInformation==null" class="select-address">
          <p>请选择收货地址</p>
        </div>
        <div v-else>
          <p><span>{{orderInformation.name}}</span> <span>{{orderInformation.tel}}</span></p>
          <p class="detail-address">
            {{orderInformation.province}}{{orderInformation.city}}{{orderInformation.county}}{{orderInformation.addressDetail}}
          </p>
        </div>
      </div>
    </router-link>
    <div class="bottom-button">
      <!-- v-on:click="$router.go(-1)" -->
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click.native="submit" class="submit-btn">提交订单</van-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/goods/Goods.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        value: 1,
        options: [],
        popupVisible: false,
        orderData: {},
        orderModel: {},
        orderInformation: '',
        add: {},
        orderAddress: {
          id: '',
          addressDetail: '',
          city: '',
          county: '',
          tel: '',
          name: ''
        },
        pay_pwd: '',
        // 支付参数
        payParams: {
          amount: 1,
          sku_id: '',
          address_id: '',
          pay_pwd: '',
          token_code: '',
        },
      }
    },
    created() {
      document.title = '填写订单'
      // this.detailId = this.$route.params
      this.order()
      this.information()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        window.sessionStorage.setItem('refpath', from.path)
      })
    },
    methods: {
      // 商品信息
      order() {
        api.orderDetail(this.$route.params).then(res => {
          this.orderData = res.data.sku
          this.orderModel = res.data.specs
        }).catch(err => {
        })
      },
      // 选择商品
      selectGoods(sku_id) {
        // console.log(sku_id)
        // if (sku_id != null) {
        // this.order()
        if (sku_id == this.orderData.id) {
          this.order()
          console.log(sku_id + '选中的商品')
        } else {
          console.log(sku_id + '未选中的商品')
          api.orderDetail({ id: sku_id }).then(res => {
            this.orderData = res.data.sku
            this.orderModel = res.data.specs
          }).catch(err => {
          })
          // this.orderData.id = sku_id
          // this.order(sku_id)
        }
        // }
      },
      cancel() {
        this.$router.push({
          name: 'Product',
          params: { path: 'member' }
        })
      },
      // 个人信息
      information() {
        api.information().then(res => {
          this.add = res.data
          this.orderInformation = res.data.default_address
          // console.log(this.orderInformation)
        }).catch(err => {
          console.log(err)
        })
      },
      // 提交订单
      submit() {
        // 判断是否选择收货地址
        if (this.orderInformation == null) {
          Toast({
            message: '请选择收货地址',
            className: 'zZindex'
          })
        } else {
          if (this.orderAddress.id == '') {
            this.address_id = this.orderInformation.id
          } else {
            this.address_id = this.$route.params.item.id
          }
          // 跳转到支付页面
          this.$router.push({
            name: 'ToPay',
            params: {
              total: this.orderData.price * this.value, amount: this.value, id: this.orderData.id,
              address_id: this.address_id
            }
          })
        }
      }
    },
    watch: {
      // 监听来的路径，并且替换内容
      orderInformation(val) {
        let refpath = window.sessionStorage.getItem('refpath')
        if (refpath == '/address') {
          if (this.orderInformation == null && this.$route.params.item.id != undefined) {
            this.orderInformation = {
              city: '',
              county: '',
              tel: '',
              name: '',
              addressDetail: '',
              id: ''
            }
            this.orderInformation.id = this.$route.params.item.id,
              this.orderInformation.addressDetail = this.$route.params.item.addressDetail,
              this.orderInformation.city = this.$route.params.item.city,
              this.orderInformation.county = this.$route.params.item.county,
              this.orderInformation.tel = this.$route.params.item.tel,
              this.orderInformation.name = this.$route.params.item.name
          }
        }
      },
      pay_pwd() {
        if (this.pay_pwd.length == 6) {
          // 确认支付
          this.payParams.address_id = this.orderInformation.id
          this.payParams.pay_pwd = this.pay_pwd
          this.payParams.sku_id = this.$route.params.id
          var token = (this.value1.split(' ')[1])
          this.payParams.token_code = token
          api.addOrder(this.payParams).then(res => {
            if (res.code === 0) {
              this.$router.push({
                name: 'BuyResult',
              })
            }
          }).catch(err => {
            if (err.code !== 0) {
              Toast({
                message: err.msg,
                position: 'top',
                className: 'zZindex'
              })
            }
            this.pay_pwd = ''
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .order {

    /* 商品名称/图片 */
    .order-product {
      overflow: hidden;
      border-radius: 20px;
      margin: 10px 24px;
      background-color: #fff;

      img {
        width: 50%;
        height: 100%;
        margin-right: 30px;
      }

      span {
        display: block;
        margin-top: 80px;
        font-size: 28px;

        .order-product-price {
          font-weight: normal;
          font-size: 36px;
          color: #ce0101;
          margin-right: 10px;
        }
      }
    }

    .van-address-item .van-radio__icon {
      display: none !important;
    }

    .mint-popup.token-list-model.mint-popup-bottom {
      width: 100%;
      border-radius: 5px;
      height: 250px;
    }
  }

  .van-card {
    background-color: #fff;
  }

  /* 数量 */
  .order-detail {
    background-color: #fff;
    margin: 0px 24px 10px 24px;
    border-radius: 20px;
    overflow: hidden;

    .order-detail-num {
      margin: 30px 20px 40px 22px;

      span {
        font-size: 28px;
      }
    }

  }

  /* 合计 */
  .order-total {
    margin-top: 50px;

    span {
      font-size: 28px;
      margin: 0px 20px 40px 22px;
    }

    b {
      font-size: 28px;
      font-weight: 400;
      color: #c9191d;
    }
  }

  /* 地址 */
  .order-address-member {
    height: 190px;
    background-color: #fff;
    margin: 10px 24px;
    border-radius: 20px;

    img {
      width: 40px;
      margin-left: 32px;
      margin-right: 32px;
      margin-top: 68px;
    }

    .select-address {
      overflow: hidden;
      p {
        margin-top: 83px;
        font-size: 32px;
      }
    }
    span {
      display: inline-block;
      margin-top: 58px;
      color: #333;
    }

    .right-arrow {
      position: relative;
      right: 10px;
    }
  }

  /* 颜色 */
  .product-model {
    background-color: #fff;
    margin: 0 24px 10px 24px;
    border-radius: 20px;
    overflow: hidden;

    .product-model-title {
      span {
        display: inline-block;
        height: 44px;
        width: 100px;
        font-size: 26px;
        line-height: 44px;
        text-align: center;
        border-radius: 10px;
        background-color: #dcdcdc;
        color: #333;
        margin: 0 30px 30px 22px;
      }

      p {
        margin: 30px 0 22px 22px;
        font-size: 28px;
        color: #333;
      }

      .select {
        color: #c9191d;
        background-color: #f4d1d2;
        border: 1px solid #c9191d;
      }
    }


  }
</style>