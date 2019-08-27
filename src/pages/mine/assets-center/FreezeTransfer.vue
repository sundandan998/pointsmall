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
      <mt-field placeholder="请输入转出数量" type="number" v-model="transferParams.amount">{{detailData.token}}</mt-field>
    </div>
    <div class="transfer-progress">
      <div class="block">
        <el-slider v-model="value" :step="25" show-stops :marks.keepTwoNum="marks">
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
        value: 10,
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
          amount: '',
        }
      }
    },
    created() {
      document.title = '转让'
      this.assetDetail()
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
    filters: {
      amount: function (marks) {
        if (marks == 0.00) {
          marks = Number(marks)
          return marks.toFixed(2)
        } else {
          marks = Number(marks)
          return marks
        }
      }
    },
    methods: {
      // 详情接口
      assetDetail() {
        api.assetsDetail({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.detailData = res.data
            this.marks[100] = res.data.amount
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
              'day': this.$route.params.day, 'freezeDay': this.$route.params.freezeDay
            }
          })
        }
      }
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
    height: 60px;
    border-bottom: 2px solid #f2f2f2;

    .block {
      width: 85%;
      margin: 0 auto;
    }
  }

  .transfer-progress-name {
    border-bottom: 2px solid #f2f2f2;

    span {
      margin-top: 10px;
      display: block;
      margin-left: 15px;
    }
  }
</style>