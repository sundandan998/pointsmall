<template>
  <div class="order">
    <div class="order-product">
      <van-card :desc="orderData.price+'积分'" :title="orderData.name" :thumb="orderData.default_image" />
    </div>
    <!-- <div class="order-detail">
      <div v-for="item in orderColor">
        <p>{{item.name}}</p>
        <div v-for="items in item.options" class="order-color">
          <p>{{items.value}}</p>
        </div>
      </div>
    </div> -->
    <!-- 数量 -->
    <div class="order-detail">
      <span>数量</span> <span class="fr">
        <van-stepper v-model="value" /></span>
      <p class="order-total"><span>合计</span><span class="fr">{{orderData.price*value}}</span></p>
    </div>
    <!-- 收货地址 -->
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id}}">
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
        <img src="../../assets/images/r.png" alt="" class="fr ">
      </div>
    </router-link>
    <div class="bottom-button">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click="submit" class="submit-btn">提交订单</van-button>
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
        orderData: {},
        orderInformation: '',
        orderAddress: {
          id: '',
          addressDetail: '',
          city: '',
          county: '',
          tel: '',
          name: ''
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
        }).catch(err => {
        })
      },
      cancel() {
        this.$router.push({
          name: 'Product'
        })
      },
      // 个人信息
      information() {
        api.information().then(res => {
          this.orderInformation = res.data.default_address
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
        }
        if (this.orderAddress.id == '') {
          this.address_id = this.orderInformation.id
        } else {
          this.address_id = this.$route.params.item.id
        }
        this.$router.push({
          name: 'ToPay',
          params: {
            total: this.orderData.price * this.value, amount: this.value, id: this.orderData.id,
            address_id: this.address_id
          }
        })
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
  }
  .van-card {
    background-color: #fff;
  }

  .van-overlay {
    position: unset;
  }

  .van-popup--bottom {
    width: 100%;
    top: 24px;
    -webkit-transform: translate3d(-50%, 0, 0);
  }

  .order-detail {
    margin: 10px 10px 10px 15px;
  }

  .order-color {
    display: inline-block;
    margin-right: 20px;
    background-color: #ccc;
    color: #333;
    padding: 3px;
    border-radius: 5px;
    width: 40px;
    text-align: center;
    font-size: 0.86rem;
    margin: 10px 20px 10px 0;
  }

  .order-total {
    margin: 16px 10px 10px 0px;
  }

  .order-address {
    padding-top: 10px;
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

    .detail-address {
      width: 75%;
      height: auto;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden
    }
  }

  .order-address img:last-child {
    position: relative;
    top: -50px;
    right: 10px;
  }

  .order-address img:first-child {
    margin: 10px 10px 0 15px;
    height: 31px;
  }
</style>