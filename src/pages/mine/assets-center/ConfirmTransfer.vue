<template>
  <div class="confirm-transfer">
    <div class="confirm-transfer-notice">
      <van-notice-bar :scrollable="false">
        请仔细核实交易信息,交易成功后资产无法撤回
      </van-notice-bar>
    </div>
    <div class="confirm-transfer-content">
      <mt-cell title="接收方" :value="this.$route.params.transferParams.mobile" class="confirm-tel"></mt-cell>
      <mt-cell title="数量" :value="this.$route.params.transferParams.amount"></mt-cell>
<<<<<<< HEAD
      <mt-cell title="手续费" :value="this.$route.params.token">退换期暂免手续费</mt-cell>
=======
      <mt-cell title="手续费" :value="this.$route.params.token" class="confirm-free">0</mt-cell>
>>>>>>> style
    </div>
    <div class="confirm-transfer-progress">
      <div class="confirm-transfer-num" v-if="this.$route.params.action=='freeze'">
        <p><span>{{this.$route.params.detailData.amount||keepTwoNum}}</span><span
            v-if="this.$route.params.day!=undefined" class="fr">还剩{{this.$route.params.day}}天解冻</span></p>
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
        detailData: [],
        listData: '',
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
      // 检查是否设置支付密码
<<<<<<< HEAD
      setPwd() {
=======
      setPwd(){
>>>>>>> style
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
      },
      //转让
      transfer() {
<<<<<<< HEAD
        if (this.$route.params.transferParams.out == true) {
=======
        if(this.$route.params.transferParams.out==true){
>>>>>>> style
          this.$messagebox({
            title: '提示',
            message: `将转让至收款人柏拉图兰账号是否继续?`,
            cancelButtonText: '取消',
            confirmButtonText: '继续',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              // 调用
              this.setPwd()
            }
          })
<<<<<<< HEAD
        } else {
=======
        }else{
>>>>>>> style
          this.setPwd()
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
          this.transferParams.order_id = this.$route.params.order_id,
<<<<<<< HEAD
            this.transferParams.out = this.$route.params.transferParams.out
=======
          this.transferParams.out = this.$route.params.transferParams.out
>>>>>>> style
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
    margin:10px 12px;
    .confirm-tel{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .confirm-free{
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  /* 冻结部分 */
  .confirm-transfer-progress {
    background-color: #fff;
    margin:10px 12px;
    border-radius:10px;
    span {
<<<<<<< HEAD
      margin: 0 30px 0 15px;
      font-size: 0.078rem;
=======
      margin:20px;
      display: inline-block;
      font-size: 26px;
      padding-bottom: 20px;
>>>>>>> style
    }
    img{
      position: relative;
      top:-30px;
      right:20px;
    }
    .progress {
      width: 85%;
      margin-left: 25px;
      .el-slider__runway {
        background-color: #409EFF;
      }
    }
  }
</style>