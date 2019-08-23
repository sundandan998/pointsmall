<template>
  <div class="modify">
    <div class="modify-tel">
      <mt-field label="手机号" class="tel-input" @blur.native.capture="sendCode" :state="CodeStatus" placeholder="请输入手机号"
        v-model="tel.mobile"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="tel" v-model="tel.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
    </div>
    <div class="modify-tel">
      <mt-button size="large" class="modify-btn" @click="submit" :disabled="disabled">提交</mt-button>
      <router-link to="safety">
        <mt-button size="large" class="modify-btn-cancel">取消</mt-button>
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

  body {
    background-color: #fff;
  }

  .mint-field-core input {
    width: 0 !important;
  }

  .send-input {
    border: none;
    float: right;
    width: 35%;
  }

  .mint-field-other {
    top: 0;
    right: 25px;
    position: relative;
    width: 100px;
  }

  .modify {
    margin-top: 150px;
  }

  .modify-tel {
    width: 95%;
    margin: 10px auto;
    color: #333;

    .mint-cell-wrapper {
      border-bottom: 1px solid #d9d9d9;
      background-image: none !important;
    }
  }

  .modify-tel {

    .modify-btn {
      width: 95%;
      background-color: #09bb07;
      color: #fff;
      margin: 50px auto;
    }

    .modify-btn-cancel {
      width: 95%;
      margin: 0px auto;
      background-color: #fff;
      color: #09bb07 !important;
      border: 1px solid #09bb07;
      margin-top: 20px;
    }
  }
</style>