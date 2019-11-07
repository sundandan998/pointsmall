<template>
  <div class="modify">
    <div class="modify-tel">
      <mt-field label="+86" class="tel-input" @blur.native.capture="sendCode" :state="CodeStatus" placeholder="请输入手机号"
        v-model="tel.mobile"></mt-field>
    </div>
    <div class="modify-code">
      <mt-field label="验证码" placeholder="请输入验证码" type="tel" v-model="tel.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-button">
      <van-button square size="large" type="danger" @click="submit" :disabled="disabled">提交</van-button>
      <router-link to="safety">
        <van-button square size="large" type="warning">取消</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        disabled: true,
        CodeStatus: '',
        tel: {
          mobile: '',
          code: ''
        },
        // 发送验证码
        btnCode: {
          btnContent: '发送',
          mobile: ''
        },
      }
    },
    created() {
      document.title = 'HV'

    },
    methods: {
      // 提交
      submit() {
        api.replacePhone(this.tel).then(res => {
          if (res.code == 0) {
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex'
            })
            let userInfo = localStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            userInfo.data.mobile = this.tel.mobile
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.$router.push({
              name: 'SafetyCenter'
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
        })
      },
      // 手机号校验
      sendCode() {
        var tel = /^[\+]?\d+(\.\d+)?$/
        if (!tel.test(this.tel.mobile)) {
          this.CodeStatus = 'error'
          this.errTitle = '请输入有效的手机号码'
        } else {
          this.CodeStatus = 'success'
        }
      },
      // 发送验证码
      sendSmsCode() {
        this.time = 60
        this.timer()
        api.sendCode({ mobile: this.tel.mobile }).then(res => {
          if (res.code === 0) {
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex'
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
        })
      },
      // 60s倒计时
      timer() {
        if (this.time > 0) {
          this.time--
          this.btnCode.btnContent = this.time + 's'
          var timer = setTimeout(this.timer, 1000)
        } else if (this.time === 0) {
          this.btnCode.btnContent = '发送'
          clearTimeout(timer)
        }
      },
    },
    watch: {
      tel: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.mobile && val.code !== '') {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../assets/scss/Global.scss";

  .modify {
    .modify-tel {
      margin: 10px 0;
    }

    .mint-field {
      border-radius: 10px;
    }
    .modify-code {
      .send-input {
        border: 0.01333rem solid #a9a9a9;
        float: right;
        color: #a9a9a9;
        padding: 2px 0;
        text-align: center;
        border-radius: 7px;
        font-size: 28px;
      }
    }
  }

  .tel-input {
    input.mint-field-core {
      width: 180px !important;
    }
  }

  .mint-field-other {
    top: 0;
    right: 0;
    position: relative;
    width: 130px;
  }

  .mint-field-core input {
    width: 0 !important;
  }



  .mint-field-other {
    top: 0;
    right: 25px;
    position: relative;
    width: 100px;
  }
</style>