<template>
  <div class="transfer">
<<<<<<< HEAD
    <mt-cell title="柏拉图兰账号">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <div class="transfer-progress-name">
      <span>接收人</span>
      <mt-field placeholder="接收人账号" type="tel" v-model="transferParams.mobile" @blur.native.capture="check"></mt-field>
=======
    <mt-cell title="商城账户">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <div class="transfer-progress-name">
      <mt-cell title="接收人" class="transfer-people"></mt-cell>
      <mt-field placeholder="接收人手机号" type="tel" v-model="transferParams.mobile" class="transfer-tel"></mt-field>
>>>>>>> style
    </div>
    <div class="transfer-title">
      <p>数量 <span class="fee">(暂免手续费)</span></p>
    </div>
    <div class="transfer-num">
      <span class=" transfer-code fr">{{this.$route.params.code}}</span>
    </div>
    <div class="transfer-progress">
      <div class="block">
        <!-- v-model=""  -->
<<<<<<< HEAD
        <el-slider  v-model="transferParams.amount" :step="this.$route.params.amount/5" :marks="marks" show-input
=======
        <el-slider v-model="transferParams.amount" :step="this.$route.params.amount/5" :marks="marks" show-input
>>>>>>> style
          :max="this.$route.params.amount|keepTwoNum">
        </el-slider>
        <!-- <el-slider  v-if="transferParams.amount!=NaN" v-model="transferParams.amount" :step="this.deail.available_amount/5" :marks="marks" show-input
        :max="this.$route.params.amount|keepTwoNum"> -->
      </el-slider>
      </div>
    </div>
    <div class="bottom-button" v-show="showBtn">
      <van-button square size="large" type="warning" v-on:click="$router.go(-1)"> 返回</van-button>
      <van-button square size="large" type="danger" @click="transfer">转让</van-button>
    </div>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/order/order.js'
  import { Toast } from 'mint-ui'
  import {mapActions,mapGetters } from 'vuex'
  export default {
    data() {
      return {
        value: 0,
<<<<<<< HEAD
=======
        detailData: {},
>>>>>>> style
        marks: {
          0: '0',
          100: ''
        },
        availableCode:'',
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
        transferParams: {
          mobile: '',
          amount: [],
          out: false
<<<<<<< HEAD
        },
        verifyParams: {
          username: '',
          code: ''
=======
>>>>>>> style
        }
      }
    },
    created() {
      document.title = '转让'
      // 从vuex中取数据
      this.$route.params.code= this.detail.token.code
      this.$route.params.amount=this.detail.available_amount
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
    },
    methods: {
<<<<<<< HEAD
=======

>>>>>>> style
      // 转让按钮
      transfer() {
        if (this.transferParams.amount == '' || this.transferParams.mobile == "") {
          Toast({
            message: '接收人和转出数量不能为空',
            className: 'zZindex'
          })
        } else {
          // 判断是不是往外部转账
          if (this.transferParams.out == true) {
            // / 检测是否是第三方账号和通证是否合法
            this.verifyParams.code = this.$route.params.code
            this.verifyParams.username = this.transferParams.mobile
            api.verify(this.verifyParams).then(res => {
              if (res.code == 0) {
                this.$router.push({
                  name: 'ConfirmTransfer',
                  params: { 'transferParams': this.transferParams,  'code': this.$route.params.code, 'action': this.$route.params.action || 'available' }
                })
              }
            }).catch(err => {
              if (err.code == 4001) {
                Toast({
                  message: err.msg,
                  className: 'zZindex'
                })
              }
            })
          } else {
            // 内部转让
            api.internal({ mobile: this.transferParams.mobile }).then(res => {
              if (res.is_use == true) {
                this.$router.push({
                  name: 'ConfirmTransfer',
                  params: { 'transferParams': this.transferParams, 'code': this.$route.params.code, 'action': this.$route.params.action || 'available' }
                })
              } else {
                Toast({
                  message: res.msg,
                  className: 'zZindex'
                })
              }
            }).catch(err => {
              if (err.code == 4001) {
                Toast({
                  message: err.msg,
                  className: 'zZindex'
                })
              }
            })
          }
        }
      },
      // 邮箱手机号校验
      check() {
        let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        let tel = /^1[23456789]\d{9}$/
        if (this.transferParams.out == true) {
          if (!email.test(this.transferParams.mobile) && !tel.test(this.transferParams.mobile)) {
            // this.status = 'error'
            Toast({
              message: '请填写正确的手机号或邮箱地址',
              className: 'zZindex'
            })
          }
        } else {
          if (!tel.test(this.transferParams.mobile)) {
            Toast({
              message: '请填写正确的手机号',
              className: 'zZindex'
            })
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

<<<<<<< HEAD
  .transfer-title {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid #f2f2f2;

    .fee {
      font-size: 0.076rem;
      color: #409EFF;
=======
  .transfer {
    .transfer-title {
      margin: 0px 24px;
      height: 90px;
      background-color: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      line-height: 90px;
      padding-left: 20px;
      font-size: 30px;
      .fee {
        font-size: 24px;
        color: #c9191d;
      }
>>>>>>> style
    }

    .transfer-progress-name {
      margin: 10px 24px;
      .transfer-people {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .transfer-tel {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    .transfer-progress {
      height: 160px;
      margin: 0px 24px;
      background-color: #fff;
      border-bottom-left-radius:10px;
      border-bottom-right-radius:10px;

      .block {
        margin: 0 20px;
      }

      .el-slider__runway.show-input {
        margin-right: 0;
      }

      .el-slider__input {
        float: unset;
        margin-top: 16px;
        margin-bottom: 10px;
        width: 200px;
      }

      .el-slider__marks .el-slider__marks-text:last-child {
        left: 100% !important;
      }

      .el-slider__stop.el-slider__marks-stop {
        left: 100% !important;
      }
    }

    .el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase{
      height: 55px;
      line-height: 55px;
      font-size: 32px;
      width: 50px;
    }
<<<<<<< HEAD

    .el-slider__stop.el-slider__marks-stop {
      left: 100% !important;
=======
    .el-input--small .el-input__inner{
      height: 55px;
      font-size: 24px;
>>>>>>> style
    }

    .transfer-code {
      margin-top: 20px;
      margin-right: 40px;
    }
  }
</style>