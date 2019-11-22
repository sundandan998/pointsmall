<template>
  <div class="register">
    <div class="register-title">
      <span>登录</span>
      <p>未注册则将为您自动创建新账号</p>
    </div>
    <div class="register-tel">
      <img src="../../assets/images/register-phone.png" width="14px" height="21px" class="fl">
      <mt-field class="tel-input" @blur.native.capture="sendCode" placeholder="请填写手机号" v-model="registerParams.mobile">
        <img src="../../assets/images/register-delete.png" height="14px" width="14px" class="fr register-delete">
      </mt-field>
      <img src="../../assets/images/register-code.png" width="15px" height="17px" class="fl">
      <mt-field placeholder="请输入验证码" type="number" v-model="registerParams.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
    </div>
    <div class="register-button">
      <!-- <p>如果该手机号未曾注册过,将为您自动注册</p> -->
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
        info: {},
        disabled: true,
        CodeStatus: '',
        is_use: '',
        // 注册参数
        registerParams: {
          mobile: '',
          access_token: '',
          code: '',
        },
        // 发送验证码
        btnCode: {
          btnContent: '发  送',
          mobile: ''
        },
      }
    },
    created() {
      document.title = '千企联盟'
    },
    beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = ""
      next()
    },
    methods: {
      // 注册
      register() {
        this.registerParams.access_token = sessionStorage.getItem('access_token')
        // 判断是否是新用户，如果是新用户，跳转到邀请码页面，如果不是新用户，跳转到首页
        if (this.is_use == true) {
          this.$store.dispatch('loginByCode', this.registerParams).then(res => {
            if (this.$store.getters.token !== '') {
              // window.sessionStorage.setItem('info', info)
              this.$store.commit('detail', res.data)
              this.$router.push({
                name: 'Index'
              })
            }
          }).catch(err => {
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          })
        } else {
          if (this.is_use == false) {
            this.$router.push({
              name: 'Code',
              params: { registerParams: this.registerParams }
            })
          }
        }
      },
      // register() {
      //   this.registerParams.access_token = sessionStorage.getItem('access_token')
      //   this.$store.dispatch('loginByCode', this.registerParams).then(res => {
      //     if (this.$store.getters.token !== '') {
      //       this.$store.commit('detail', res.data)
      //       // window.sessionStorage.setItem('info', info)
      //       if (res.code == 0) {
      //         // 判断是否为新用户 ，如果是新用户，注册成功后跳转到注册结果页，
      //         // 如果不是新用户，注册成功后跳到首页
      //         if (res.info.new_user == true) {
      //           this.$router.push({
      //             name: 'Result'
      //           })
      //         } else {
      //           this.$router.push({
      //             name: 'Index'
      //           })
      //         }
      //       }
      //     }
      //   }).catch(err => {
      //     Toast({
      //       message: err.msg,
      //       position: 'top',
      //       className: 'zZindex'
      //     })
      //   })
      // },
      // 手机号校验
      sendCode() {
        api.username({ mobile: this.registerParams.mobile }).then(res => {
          if (res.code == 0) {
            this.is_use = res.is_use
          }
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'top',
            className: 'zZindex'
          })
        })
        // var tel = /^1[3-9]\d{9}$/
        // if (!tel.test(this.registerParams.mobile)) {
        //   this.CodeStatus = 'error'
        //   this.errTitle = '请输入有效的手机号码'
        // } else {
        //   this.CodeStatus = 'success'
        // }
      },
      // 发送验证码
      sendSmsCode() {
        this.time = 60
        this.timer()
        api.sendCode({ mobile: this.registerParams.mobile }).then(res => {
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
  @import "../../assets/scss/Global.scss";
  .register {
    .register-title {
      margin: 118px 0px 10px 54px;
      span {
        font-size: 60px;
        color: #c9191D;
      }

      p {
        font-size: 26px;
        color: #9999;
        margin-bottom: 152px;
      }
    }
  }

  .send-input {
    border: none;
    float: right;
    width: 120px;
    height: 60px;
    background-color: #999;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    font-size: 26px;
  }

  .register-tel {
    margin: 0 54px 124px 54px;

    .fl {
      position: relative;
      top: 40px;
      z-index: 1;
      left: 30px;
    }

    .register-delete {
      position: relative;
      top: 0px;
      z-index: 1;
    }

    .mint-field .mint-cell-value {
      margin-left: 20px;
    }

    .mint-cell-wrapper {
      border-bottom: 1px solid #d9d9d9;

      .mint-field-clear {
        display: none;
      }
    }
  }

  .register-button {
    margin: 32px 54px 10px 54px;

    p {
      font-size: 20px;
      color: #333;
      margin-bottom: 10px;

      span {
        color: #c9191D;
      }
    }

    .register-btn {
      width: 100%;
      height: 88px;
      border-radius: 44px;
      background-color: #c9191D !important;
      color: #fff;
      margin-bottom: 20px;
    }

    .register-btn-cancel {
      width: 100%;
      border-radius: 44px;
      height: 88px;
      background-color: #fff;
      color: #c9191D !important;
      border: 1px solid #c9191D;

    }
  }
</style>