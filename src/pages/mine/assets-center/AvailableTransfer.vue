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
        <el-slider v-model="value" :step="25" show-stops :marks="marks">
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
  export default {
    data() {
      return {
        value: 20,
        detailData: {},
        marks: {
          0: '0',
          100: this.$route.params.amount
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
        this.$router.push({
          name: 'ConfirmTransfer',
          params: { 'transferParams': this.transferParams, 'token': this.detailData.token, 'code':this.$route.params.code,'action':this.$route.params.action}
        })
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