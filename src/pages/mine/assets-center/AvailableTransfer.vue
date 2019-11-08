<template>
  <div class="transfer">
    <mt-cell title="商城账户">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <div class="transfer-progress-name">
      <mt-cell title="接收人" class="transfer-people"></mt-cell>
      <mt-field placeholder="接收人手机号" type="tel" v-model="transferParams.mobile" class="transfer-tel"></mt-field>
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
        <el-slider v-model="transferParams.amount" :step="this.$route.params.amount/5" :marks="marks" show-input
          :max="this.$route.params.amount|keepTwoNum">
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
  export default {
    data() {
      return {
        value: 0,
        detailData: {},
        marks: {
          0: '0',
          100: ''
        },
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
        transferParams: {
          mobile: '',
          amount: [],
          out: false
        }
      }
    },
    created() {
      document.title = '转让'
      let amount = this.keepTwoNum | this.$route.params.amount
      this.marks[100] = amount + ''
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

      // 转让按钮
      transfer() {
        if (this.transferParams.amount == '' || this.transferParams.mobile == "") {
          Toast({
            message: '接收人和转出数量不能为空',
            className: 'zZindex'
          })
        } else {
          this.$router.push({
            name: 'ConfirmTransfer',
            params: { 'transferParams': this.transferParams, 'token': this.detailData.token, 'code': this.$route.params.code, 'action': this.$route.params.action }
          })
        }
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

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
    .el-input--small .el-input__inner{
      height: 55px;
      font-size: 24px;
    }

    .transfer-code {
      margin-top: 20px;
      margin-right: 40px;
    }
  }
</style>