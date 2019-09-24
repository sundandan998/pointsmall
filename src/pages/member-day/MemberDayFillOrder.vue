<template>
  <div class="order">
    <div class="order-product">
      <van-card :desc="orderData.price+'积分'" :title="orderData.name" :thumb="orderData.default_image" />
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
      <span>数量</span> <span class="fr">
        <van-stepper v-model="value" /></span>
      <p class="order-total"><span>合计</span><span class="fr">{{orderData.price*value}}</span></p>
    </div>
    <!-- 收货地址 -->
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id,path:'memberday'}}">
      <div class="order-address">
        <img src="../../assets/images/address.svg" alt="" class="fl">
        <div v-if="orderInformation==null" class="select-address">
          <p>请选择收货地址</p>
        </div>
        <div v-else>
          <p><span>{{orderInformation.name}}</span> <span>{{orderInformation.tel}}</span></p>
          <p class="detail-address">
            {{orderInformation.province}}{{orderInformation.city}}{{orderInformation.county}}{{orderInformation.addressDetail}}
          </p>
        </div>
        <img src="../../assets/images/r.png" alt="" class="fr right-arrow">
      </div>
    </router-link>
    <div class="bottom-button">
      <van-button square size="large" type="warning" @click.native="cancel"> 取消</van-button>
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
          api.orderDetail({ id: sku_id}).then(res => {
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
          name: 'Product'
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
          if (this.orderInformation == null) {
            this.orderInformation = {
              city: '',
              county: '',
              tel: '',
              name: '',
              addressDetail: '',
              id: ''
            }
          }
          this.orderInformation.id = this.$route.params.item.id,
            this.orderInformation.addressDetail = this.$route.params.item.addressDetail,
            this.orderInformation.city = this.$route.params.item.city,
            this.orderInformation.county = this.$route.params.item.county,
            this.orderInformation.tel = this.$route.params.item.tel,
            this.orderInformation.name = this.$route.params.item.name
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

  .order-product {
    margin: 10px 0 5px 0px;
  }

  .order-detail {
    margin: 20px 10px 0 15px;
  }

  .order-total {
    margin: 16px 10px 10px 0px;
  }

  .order-address {
    padding-top: 10px;
    padding-left: 15px;
    border-top: 2px solid #f2f2f2;
    height: auto;
    border-bottom: 2px solid #f2f2f2;

    .select-address {
      height: 60px;

      p {
        margin-top: 15px;
      }
    }

    p {
      color: #333;
      line-height: 30px;
    }

    span {
      color: #333;
    }

    .right-arrow {
      position: relative;
      top: -40px;
      right: 10px;
    }
  }

  .product-model {
    margin-left: 15px;

    .product-model-title {
      span {
        font-size: 0.76rem;
        /* color: #fff;
        background-color: #8BC34A; */
        color: #000;
        background-color: #f2f2f2;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 7px;
      }

      p {
        margin: 10px 0 10px 0;
      }

      .disabled {
        color: #C8C9CC;
        background-color: #F7F8FA;
      }

      .select {
        color: #fff;
        background-color: #8BC34A;
      }
    }


  }
</style>