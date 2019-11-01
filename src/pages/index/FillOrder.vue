<template>
  <div class="order">
    <div class="order-product-img">
      <img :src="orderData.middle_image" alt="" class="fl">
      <span>{{orderData.name}} <img src="../../assets/images/quanyibag.png" alt=""> </span>
      <!-- <van-card :desc="orderData.price+'积分'" :title="orderData.name" :thumb="orderData.default_image" /> -->
    </div>
    <!-- 收货地址 -->
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id,path:'is_vip'}}">
      <div class="order-address">
        <img src="../../assets/images/map.png" alt="" class="fl">
        <img src="../../assets/images/r.png" alt="" class="fr order-address-arrow">
        <div v-if="orderInformation==null" class="select-address">
          <p>请选择收货地址</p>
        </div>
        <div v-else class="detail-address">
          <p><span>{{orderInformation.name}}</span> <span>{{orderInformation.tel}}</span></p>
          <p>
            {{orderInformation.province}}{{orderInformation.city}}{{orderInformation.county}}{{orderInformation.addressDetail}}
          </p>
        </div>
      </div>
    </router-link>
    <!-- 选择通证部分 -->
    <div class="select-token">
      <img src="../../assets/images/present.png" alt="" class="fl">
      <img src="../../assets/images/r.png" alt="" class="fr select-token-arrow ">
      <p @click="handlelick">{{value1}}</p>
      <mt-popup v-model="popupVisible" position="bottom" class="token-list-model">
        <div class="token-list">
          <div v-model="popupVisible" @click="hide">
            <mt-radio v-model="value1" :options="options" title="选择受赠通证">
            </mt-radio>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="bottom-button">
      <van-button square size="large" type="warning" @click.native="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click.native="submit" class="submit-btn">提交订单</van-button>
    </div>
    <!-- 支付弹框 -->
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>￥{{orderData.price}}</p>
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
        value1: '请选择通证',
        options: [],
        popupVisible: false,
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
      handlelick() {
        this.popupVisible = true
      },
      hide() {
        this.popupVisible = false
      },
      // 商品信息
      order() {
        api.orderDetail(this.$route.params).then(res => {
          this.orderData = res.data.sku
          if (this.options != null) {
            this.options = []
            for (var i = 0; i < res.data.sku.vip_info.length; i++) {
              var tokenList = {
                value: Number(res.data.sku.vip_info[i].amount).toFixed(0) + ' ' + res.data.sku.vip_info[i].token,
                label: Number(res.data.sku.vip_info[i].amount).toFixed(0) + '(' + res.data.sku.vip_info[i].token + ')'
              }
              this.options.push(tokenList)
            }
          }
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
          if (this.value1 == '请选择通证') {
            Toast({
              message: '请选择通证',
              className: 'zZindex'
            })
          } else {
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
        }
        if (this.orderAddress.id == '') {
          this.address_id = this.orderInformation.id
        } else {
          this.address_id = this.$route.params.item.id
        }
      }
    },
    watch: {
      // 监听来的路径，并且替换内容
      orderInformation(val) {
        // debugger
        let refpath = window.sessionStorage.getItem('refpath')
        if (refpath == '/address') {
          if (this.orderInformation == null && this.$route.params.item.id != undefined) {
            // this.orderInformation.id = this.$route.params.item.id,
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

    .mint-popup.token-list-model.mint-popup-bottom {
      width: 100%;
      border-radius: 5px;
      height: 250px;
    }

    .select-token {
      background-color: #fff;
      height: 100px;
      margin: 10px 24px;
      border-radius: 20px;

      p {
        font-size: 28px;
        line-height: 100px;
      }

      .select-token-arrow {
        position: relative;
        top: 30px;
        right: 20px;
      }

    }

    .select-token img:first-child {
      margin: 25px 20px 0 20px;
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

    /* 头部图片部分 */
    .order-product-img {
      background-color: #fff;
      height: 230px;
      margin: 10px 24px;
      border-radius: 20px;
      overflow: hidden;

      img {
        width: 50%;
        height: 100%;
      }

      span {
        text-align: center;
        display: block;
        margin-top: 80px;
        font-size: 28px;

        img {
          height: 50px;
          width: 160px;
          margin-top: 20px;
        }
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

    /* 地址 */
    .order-address {
      height: 190px;
      background-color: #fff;
      margin: 20px 24px;
      border-radius: 20px;
      overflow: hidden;

      .select-address {
        p {
          font-size: 32px;
          line-height: 190px;
        }
      }

      .order-address-arrow {
        position: relative;
        top: 80px;
        right: 20px;
      }

      .detail-address {
        margin-top: 50px;
        font-size: 26px;
      }

      .detail-address p:first-child {
        font-size: 32px;
      }
    }

    .order-address img:first-child {
      width: 40px;
      margin: 58px 20px 0 20px;
    }
  }
</style>