<template>
  <div class="register">
    <div class="register-title">
      <span>注册 / 登录</span>
    </div>
    <div class="register-tel">
      <!-- type="number" -->
      <!-- :state="CodeStatus"  -->
      <mt-field label="手机号" class="tel-input" @blur.native.capture="sendCode" placeholder="请输入手机号"
        v-model="registerParams.mobile">
      </mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="registerParams.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
      <!-- <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="registerParams.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field> -->
    </div>
    <div class="register-button">
      <p>如果该手机号未曾注册过,将为您自动注册</p>
      <p>点击注册即表示同意 <span>《用户协议》</span> </p>
      <!-- <router-link to=""> -->
      <mt-button size="large" class="register-btn" @click.native="register" :disabled="disabled">登录</mt-button>
      <!-- </router-link> -->
      <router-link to="/">
        <mt-button size="large" class="register-btn-cancel">取消</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        disabled: true,
        CodeStatus: '',
        // 注册参数
        registerParams: {
          mobile: '',
          access_token: '',
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
      document.title = '千企商城'
    },
    methods: {
      // 注册
      register() {
        // debugger
        this.registerParams.access_token = sessionStorage.getItem('access_token')
        this.$store.dispatch('loginByCode', this.registerParams).then(res => {
          console.log(this.$store.getters.token)
          // debugger
          if (this.$store.getters.token !== '') {
            this.$store.commit('detail', res.data)
            // window.sessionStorage.setItem('info', info)
            if (res.code === 0) {
              this.$router.push({
                name: 'Result'
              })
            }
          }

        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'top',
            className: 'zZindex'
          })
        })
      },
      // 手机号校验
      sendCode() {
        var tel = /^1[3-9]\d{9}$/
        if (!tel.test(this.registerParams.mobile)) {
          this.CodeStatus = 'error'
          this.errTitle = '请输入有效的手机号码'
        } else {
          this.CodeStatus = 'success'
        }
      },
      // 发送验证码
      sendSmsCode() {
        api.sendCode({ mobile: this.registerParams.mobile }).then(res => {
          if (res.code === 0) {
            this.time = 60
            this.timer()
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
      registerParams: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.mobile && val.code != '') {
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
      width: 170px !important;
    }
  }

  body {
    background-color: #fff;
  }

  .mint-field-other {
    top: 0;
    right: 25px;
    position: relative;
    width: 100px;
  }

  .mint-field-core input {
    width: 0 !important;
  }

  .send-input {
    border: none;
    float: right;
    width: 35%;
  }

  .register {
    margin-top: 100px;
  }

  .register-title {
    margin: 20px 0px 20px 20px;

    span {
      font-size: 1.2rem;
    }
  }

  .register-tel {
    width: 95%;
    margin: 10px auto;
    color: #333;

    .mint-cell-wrapper {
      border-bottom: 1px solid #d9d9d9;
      background-image: none !important;
    }
  }

  .register-button {
    p {
      margin-top: 10px;
      margin-left: 20px;
      font-size: 0.78rem;
      margin-bottom: 10px;
      span {
        color: red;
      }
    }

    .register-btn {
      width: 95%;
      background-color: #09bb07 !important;
      color: #fff;
      margin: 5px auto;
    }

    .register-btn-cancel {
      width: 95%;
      margin: 0px auto;
      background-color: #fff;
      color: #09bb07 !important;
      border: 1px solid #09bb07;
      margin-top: 20px;

    }
  }
</style>