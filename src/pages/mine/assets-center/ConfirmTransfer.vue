<template>
  <div class="confirm-transfer">
    <div class="confirm-transfer-notice">
      <van-notice-bar :scrollable="false">
        请仔细核实交易信息,交易成功后资产无法撤回
      </van-notice-bar>
    </div>
    <div class="confirm-transfer-content">
      <mt-cell title="接收方" :value="this.$route.params.transferParams.mobile"></mt-cell>
      <mt-cell title="数量" :value="this.$route.params.transferParams.amount"></mt-cell>
      <mt-cell title="手续费" :value="this.$route.params.token"></mt-cell>
    </div>
    <div class="confirm-transfer-progress">
      <div class="confirm-transfer-num" v-if="this.$route.params.action=='freeze'">
        <p><span>{{this.$route.params.detailData.amount||keepTwoNum}}</span><span
            class="fr">还剩{{this.$route.params.day}}天解冻</span></p>
        <div class="progress">
          <el-slider :value="this.$route.params.freezeDay-this.$route.params.day" disabled></el-slider>
        </div>
        <img src="../../../assets/images/r.png" alt="" class="fr">
        <span>到期日 {{this.$route.params.detailData.unfreeze_date}}</span>
      </div>
    </div>
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>转让</p>
        <p>{{this.$route.params.transferParams.amount}}({{this.$route.params.code}})</p>
        <van-password-input :value="pay_pwd" @focus="showKeyboard= true" />
      </mt-popup>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" extra-key="." @input="onInput" @delete="onDelete"
      @blur="showKeyboard = false" />
    <div class="bottom-button" v-show="showBtn">
      <van-button square size="large" type="warning" v-on:click="$router.go(-1)"> 返回</van-button>
      <van-button square size="large" type="danger" @click="transfer">确认转让</van-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/order/order.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        value: 5,
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
        pay_pwd: '',
        showKeyboard: false,
        resevationModelModel: false,
        // 转让参数
        transferParams: {
          action: '',
          mobile: '',
          amount: '',
          code: '',
          pay_pwd: '',
          order_id: ''
        }
      }
    },
    created() {
      document.title = '转让确认'
      this.information()
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
        }).catch(err => {
          console.log(err)
        })
      },
      //转让
      transfer() {
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
      pay_pwd() {
        if (this.pay_pwd.length == 6) {
          this.transferParams.action = this.$route.params.action
          this.transferParams.mobile = this.$route.params.transferParams.mobile
          this.transferParams.amount = this.$route.params.transferParams.amount
          this.transferParams.code = this.$route.params.code
          this.transferParams.pay_pwd = this.pay_pwd
          this.transferParams.order_id = this.$route.params.order_id
          api.transfer(this.transferParams).then(res => {
            if (res.code === 0) {
              Toast({
                message: res.msg,
                position: 'top',
                className: 'zZindex'
              })
              this.$router.push({
                name: 'TransferDetail',
                params: { order_id: res.order_id }
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
  @import '../../../assets/scss/Global.scss';

  .confirm-transfer-notice {
    .van-notice-bar {
      background-color: #FF9800;
      color: #fff;
    }
  }

  .confirm-transfer-content {
    .mint-cell {
      margin-bottom: 0px;
      min-height: 40px;
    }
  }

  /* 冻结部分 */
  .confirm-transfer-progress {
    border-bottom: 1px solid #f2f2f2;
    margin-top: 10px;

    span {
      margin: 0 30px 0 15px;
      font-size: 0.78rem;
    }

    .confirm-transfer-nums {
      border-top: 1px solid #f2f2f2;
      margin-top: 5px;

      p {
        margin-top: 5px;
      }

      img {
        margin: -30px 10px 0 0;
      }
    }

    .confirm-transfer-num span:last-child {
      display: block;
      margin-bottom: 5px;
    }

    .progress {
      width: 85%;
      margin-left: 15px;

      .el-slider__runway {
        background-color: #409EFF;
      }

    }
  }
</style>