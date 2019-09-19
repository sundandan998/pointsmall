<template>
  <div class="pay">
    <div class="pay-title">
      <mt-cell title="合计" :value="this.$route.params.total"></mt-cell>
      <div v-if="integralToken.token_amount==undefined">
        <mt-cell title="支付通证" value="--"></mt-cell>
      </div>
      <div v-else>
        <mt-cell title="支付通证" :value="integralToken.token_amount+'('+ integralToken.token+')'"></mt-cell>
      </div>
    </div>
    <div class="pay-list">
      <van-radio-group v-model="radio">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
          :error.sync="error" error-text="请求失败，点击重新加载">
          <div v-for="(item,index) in payList" class="pay-list-content">
            <img :src="item.token.icon" alt="" class="fl">
            <span>
              <p>{{item.token.code}}</p>
              <p>{{item.token.subject}}</p>
            </span>
            <van-radio-group v-model="radio" class="fr" @click.native="change(item.token.code)">
              <van-radio :name="item.id"></van-radio>
            </van-radio-group>
          </div>
        </van-list>
      </van-radio-group>
    </div>
    <!-- 底部按钮 -->
    <div class="van-sku-actions">
      <van-button square size="large" type="warning" @click="cancel"> 返回</van-button>
      <van-button square size="large" type="danger" @click="success">支付</van-button>
    </div>
    <!-- 支付弹框 -->
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>{{integralToken.token_amount+'('+ integralToken.token+')'}}</p>
        <van-password-input :value="pay_pwd" @focus="showKeyboard= true" />
      </mt-popup>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" extra-key="." @input="onInput" @delete="onDelete"
      @blur="showKeyboard = false" />
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        radio: '',
        payList: [],
        integralToken: {},
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
        showKeyboard: false,
        resevationModelModel: false,
        pay_pwd: '',
        // 支付参数
        payParams: {
          sku_id: '',
          amount: '',
          address_id: '',
          pay_pwd: '',
          token_code: ''
        },
        // 积分换算
        integral: {
          code: '',
          integral: ''
        }
      }
    },
    created() {
      document.title = '支付'
      this.information()
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.assets({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.payList.push.apply(this.payList, res.data)
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
      // 支付
      success() {
        if (this.radio == '') {
          Toast({
            message: '请先选择支付通证',
            position: 'top',
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
      },
      // 个人信息
      information() {
        api.information().then(res => {
          this.add = res.data
          // if()
          // this.payParams.address_id = this.add.default_address.id
        }).catch(err => {
          console.log(err)
        })
      },
      // 取消
      cancel() {
        this.$router.push({
          name: 'MemberDayOrder'
        })
      },
      // 积分换算
      change(code) {
        this.integral.code = code
        this.payParams.token_code = code
        this.integral.integral = this.$route.params.total
        api.exchange(this.integral).then(res => {
          if (res.code == 0) {
            this.integralToken = res
          }
        }).catch(err => {
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
    },
    watch: {
      pay_pwd() {
        if (this.pay_pwd.length == 6) {
          // 确认支付
          this.payParams.address_id = this.$route.params.address_id
          this.payParams.pay_pwd = this.pay_pwd
          this.payParams.sku_id = this.$route.params.id
          this.payParams.amount = this.$route.params.amount
          api.addOrder(this.payParams).then(res => {
            if (res.code === 0) {
              Toast({
                message: res.msg,
                position: 'top',
                className: 'zZindex'
              })
              this.$router.push({
                name: 'OrderDetail',
                params: { id: res.data.id }

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

  .pay-list-content {
    height: 50px;
    border-bottom: 1px solid #f2f2f2;
    padding-left: 15px;
    img {
      margin-right: 10px;
    }
    p{
      font-size: 0.76rem;
    }
  }

  .mint-cell-wrapper {
    background-image: none !important;
    border-bottom: 1px solid #f2f2f2;
  }
  .pay-list {
    .van-radio {
      position: relative;
      top: -30px;
      right: 10px;
    }
  }
</style>