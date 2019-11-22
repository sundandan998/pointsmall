<template>
  <div class="transfer">
    <mt-cell title="柏拉图兰账号" class="transfer-switch">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <p class="transfer-prompt">
      <img src="../../../assets/images/alert.svg" alt="">
      请确认收款人账号已在柏拉图兰注册
    </p>
    <div class="transfer-progress-name">
      <mt-cell title="收款人" class="transfer-people"></mt-cell>
      <mt-field placeholder="接收人手机号" type="tel" v-model="transferParams.mobile" class="transfer-tel"></mt-field>
    </div>
    <div class="transfer-title">
      <p>数量 <span class="fee">(暂免手续费)</span></p>
    </div>
    <span class=" transfer-num fr">{{detailData.token}}</span>
    <!-- <mt-field placeholder="请输入转出数量" type="number">{{detailData.token}}</mt-field> -->
    <div class="transfer-progress">
      <div class="block">
        <el-slider v-model="transferParams.amount" :step="detailData.amount/4" :marks="marks" show-input
          :max="detailData.amount|keepTwoNum">
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
          out: false,
        }
      }
    },
    created() {
      document.title = '转让'
      this.assetDetail()
      console.log()
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
      // 详情接口
      assetDetail() {
        api.assetsDetail({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.detailData = res.data
            this.amount = this.keepTwoNum | res.data.amount
            this.marks[100] = this.amount + ''
          }
        }).catch(err => {
        })
      },
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
            params: {
              'transferParams': this.transferParams, 'order_id': this.detailData.order_id,
              'action': this.$route.params.action, 'detailData': this.detailData,
              'code': this.detailData.token, 'date': this.detailData.unfreeze_date,
              'day': this.$route.params.day, 'freezeDay': this.$route.params.freezeDay,
            }
          })
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
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .transfer {

    /* 开关部分 */
    .transfer-switch {
      margin: 10px 24px;
      border-radius: 10px;
    }

    .transfer-prompt {
      background-color: #FFFBE6;
      color: #5A5951;
      border-radius: 10px;
      height: 60px;
      line-height: 60px;
      border: 1px solid #FFE58F;
      margin: 20px 24px;

      img {
        width: 30px;
        margin-left: 10px;
        position: relative;
        top: 5px;
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

    .transfer-title {
      margin: 10px 24px 0 24px;
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

    .transfer-num {
      margin: 20px 40px;
    }

    .transfer-progress {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      margin: 0px 24px 0 24px;
      background-color: #fff;
      height: 150px;

      .el-slider__runway.show-input {
        margin: 20px;
      }

      .el-slider__input {
        float: unset;
        width: 250px;
        margin: 20px 0 20px 20px;
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
  }
</style>