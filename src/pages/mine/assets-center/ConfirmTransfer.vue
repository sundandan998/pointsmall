<template>
  <div class="confirm-transfer">
    <div class="confirm-transfer-notice">
      <van-notice-bar :scrollable="false">
        请仔细合适交易信息,交易成功后资产无法撤回
      </van-notice-bar>
    </div>
    <div class="confirm-transfer-content">
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
    </div>
    <div class="confirm-transfer-progress">
      <div class="confirm-transfer-num">
        <p><span>2000</span><span class="fr">还剩30天解冻</span></p>
        <div class="progress">
          <el-slider v-model="value" disabled></el-slider>
        </div>
        <img src="../../../assets/images/r.png" alt="" class="fr">
        <span>到期日 2019-1-12</span>
      </div>
    </div>
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>服务预约</p>
        <p>(积分)</p>
        <van-password-input :value="pay_pwd" @focus="showKeyboard= true" />
      </mt-popup>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" extra-key="." @input="onInput" @delete="onDelete"
      @blur="showKeyboard = false" />
    <div class="bottom-button" v-show="showBtn">
      <van-button square size="large" type="warning"> 返回</van-button>
      <van-button square size="large" type="danger" @click="transfer">确认转让</van-button>
    </div>
  </div>
</template>
<script>
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
      }
    },
    created() {
      document.title = '转让确认'
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
      transfer() {
        this.resevationModelModel = true

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