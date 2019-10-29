<template>
  <div class="transfer">
    <mt-cell title="柏拉图兰账号">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <p class="transfer-prompt">
        <img src="../../../assets/images/alert.svg" alt="" >
        请确认收款人账号已在柏拉图兰注册
      </p>
    <div class="transfer-progress-name">
      <span>接收人</span>
      <mt-field placeholder="接收人手机号" type="tel" v-model="transferParams.mobile"></mt-field>
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
          out:false,
        }
      }
    },
    created() {
      document.title = '转让'
      this.assetDetail()
      // console.log(this.$route.params.amount)
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
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';
  .transfer-prompt{
    background-color: #FFFBE6;
      width: 90%;
      color:#5A5951;
      border-radius: 5px;
      height: 30px;
      line-height: 30px;
      border:1px solid #FFE58F;
      margin-left: 20px;
      margin-bottom: 10px;
      img{
        width: 20px;
        margin-left: 10px;
        position: relative;
        top:5px;
      }
  }
  .transfer-title {
    padding: 10px 0 10px 15px;
    border-bottom: 1px solid #f2f2f2;

    .fee {
      font-size: 0.076rem;
      color: #409EFF;
    }
  }

  .transfer-progress {
    height: 110px;
    border-bottom: 2px solid #f2f2f2;

    .block {
      width: 85%;
      margin: 0 auto;
    }
  }

  .transfer-progress-name {
    span {
      margin-top: 10px;
      display: block;
      margin-left: 15px;
    }
  }

  .transfer-progress {
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

  .transfer-num {
    margin-top: 20px;
    margin-right: 10px;
  }
</style>