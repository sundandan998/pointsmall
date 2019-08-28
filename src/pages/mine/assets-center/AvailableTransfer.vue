<template>
  <div class="transfer">
    <div class="transfer-progress-name">
      <span>接收人</span>
      <mt-field placeholder="接收人手机号" type="tel" v-model="transferParams.mobile"></mt-field>
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
        <el-slider v-model="transferParams.amount" :step="this.$route.params.amount/5"  :marks="marks" show-input
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
        value:0,
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

  .transfer-title {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid #f2f2f2;

    .fee {
      font-size: 0.76rem;
      color: #409EFF;
    }
  }

  .transfer-progress {
    height: 120px;
    border-bottom: 2px solid #f2f2f2;

    .block {
      width: 85%;
      margin: 0 auto;
    }

    .el-slider__runway.show-input {
      margin-right: 0;
    }

    .el-slider__input {
      float: unset;
      margin-top: 16px;
      margin-bottom: 10px;
      width: 130px;
    }

    .el-slider__marks .el-slider__marks-text:last-child {
      left: 100% !important;
    }
    .el-slider__stop.el-slider__marks-stop {
      left: 100% !important;
    }
  }

  .transfer-progress-name {
    span {
      margin-top: 10px;
      display: block;
      margin-left: 15px;
    }
  }

  .transfer-code {
    margin-top: 20px;
    margin-right: 10px;
  }
</style>