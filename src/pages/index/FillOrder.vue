<template>
  <div class="order">
    <div class="order-product">
      <p>{{orderData.name}}</p>
      <img :src="orderData.default_image" alt="">
      <!-- <van-card :desc="orderData.price+'积分'" :title="orderData.name" :thumb="orderData.default_image" /> -->
    </div>
    <!-- 选择通证部分 -->
    <div class="select-token">
      <router-link :to="{name:'TokenList',params:{id:this.$route.params.id,price:orderData.price}}">
        <p v-if="this.$route.params.url!='tokenlist'">选择通证</p>
        <p
          v-if="this.$route.params.url==='tokenlist'">{{this.$route.params.item.amount|keepTwoNum}}{{this.$route.params.item.token}}</p>
        </router-link">
        <img src="../../assets/images/r.png" alt="" class="fr">
    </div>

    <!-- 选择通证部分 -->
    <!-- <div class="page-actionsheet-wrapper select-token">
      <button @click="actionSheet" class="mint-button mint-button--default mint-button--large">
        <span>赠送</span>
        <img src="../../assets/images/r.png" alt="" class="fr ">
      </button>
      <div v-for="item in orderData.vip_info">
        cancelText="" 
        :actions="
        <mt-actionsheet v-model="sheetVisible" :actions="[{name:item.token+item.amount}]">
          <mt-radio title="选择受赠通证" v-model="value" :options="[item.token+item.amount]">
            </mt-radio>
        </mt-actionsheet>
      </div> -->
    <!-- </div> -->
    <!-- 数量 -->
    <!-- <div class="order-detail">
      <span>数量</span> <span class="fr">
        <van-stepper v-model="value" /></span>
      <p class="order-total"><span>合计</span><span class="fr">{{orderData.price*value}}</span></p>
    </div> -->
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
      <van-button square size="large" type="warning" @click.native="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click.native="submit" class="submit-btn">提交订单</van-button>
    </div>
    <!-- 支付弹框 -->
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>￥{{this.$route.params.price}}</p>
        <van-password-input :value="pay_pwd" @focus="showKeyboard= true" />
      </mt-popup>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" extra-key="." @input="onInput" @delete="onDelete"
      @blur="showKeyboard = false" />
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
        add: {},
        orderAddress: {
          id: '',
          addressDetail: '',
          city: '',
          county: '',
          tel: '',
          name: ''
        },
        showKeyboard: false,
        resevationModelModel: false,
        pay_pwd: '',
        // 支付参数
        payParams: {
          amount: 1,
          sku_id: '',
          address_id: '',
          pay_pwd: '',
          token_code: '',
        },
        actions: [{
          name: '',
          amount: ''
        }],
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
          this.actions = res.data.sku.vip_info
        }).catch(err => {
        })
      },
      cancel() {
        this.$router.push({
          name: 'Product'
        })
      },
      onInput(key) {
        this.pay_pwd = (this.pay_pwd + key).slice(0, 6)
      },
      onDelete() {
        this.pay_pwd = this.pay_pwd.slice(0, this.pay_pwd.length - 1)
      },
      modalHide() {
        this.resevationModelModel = false
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
        }
        if (this.orderAddress.id == '') {
          this.address_id = this.orderInformation.id
        } else {
          this.address_id = this.$route.params.item.id
        }
        // 跳转到支付页面
        // this.$router.push({
        //   name: 'ToPay',
        //   params: {
        //     total: this.orderData.price * this.value, amount: this.value, id: this.orderData.id,
        //     address_id: this.address_id
        //   }
        // })
        // 弹起支付密码框
        if (this.add.pay_pwd_active == true) {
          this.resevationModelModel = true
        } else {
          this.$messagebox({
            title: '提示',
            message: `请先设置支付密码再进行操作`,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({
                name: 'SafetyVerification',
                params: { id: 'reservation' }
              })
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
          this.payParams.token_code = this.$route.params.item.token
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
            this.resevationModelModel = false
            this.showKeyboard = false
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

    .select-token {
      width: 100%;
      height: 40px;
      .mint-button--default {
        color: #333 !important;
        text-align: left;
        padding-left: 15px;
        background-color: #fff;
      }

      p {
        margin-left: 15px;
      }
      img {
        margin-right: 10px;
        margin-top: -15px;
      }
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

  .order-product {
    margin: 10px 0 5px 15px;

    p {
      margin-bottom: 10px;
    }
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