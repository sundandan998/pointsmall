<template>
  <div class="set-pwd">
    <!-- 支付密码框 -->
    <div class="set-pwd-input">
      <span>设置6位支付密码</span>
      <van-password-input :value="this.password.pay_pwd1" :mask="true" @focus="passIndex" />
      <span>再次输入支付密码</span>
      <van-password-input :value="this.password.pay_pwd2" :mask="true" @focus="passIndex1" />
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
    <div class="set-pay-pwd">
      <mt-button size="large" class="submit-btn" :disabled="disabled" @click="submit">提交</mt-button>
      <mt-button size="large" class="submit-btn-cancel" @click.native="setPwd">取消</mt-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        index: 0,
        showKeyboard: false,
        disabled: true,
        // 设置支付密码参数
        password: {
          pay_pwd1: '',
          pay_pwd2: ''
        }
      }
    },
    created() {
      document.title = '设置支付密码'
      console.log(this.$route.params.id)
    },
    methods: {
      passIndex() {
        this.showKeyboard = true
        this.index = 0
      },
      passIndex1() {
        this.showKeyboard = true
        this.index = 1
      },
      onInput(key) {
        if (this.index === 0) {
          this.password.pay_pwd1 = (this.password.pay_pwd1 + key).slice(0, 6)
        } else {
          this.password.pay_pwd2 = (this.password.pay_pwd2 + key).slice(0, 6)
        }
      },
      onDelete(key) {
        if (this.index === 0) {
          this.password.pay_pwd1 = this.password.pay_pwd1.slice(0, this.password.pay_pwd1.length - 1)
        } else {
          this.password.pay_pwd2 = this.password.pay_pwd2.slice(0, this.password.pay_pwd2.length - 1)
        }
      },
      // 提交
      submit() {
        api.payPwd(this.password).then(res => {
          if (res.code == 0) {
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex'
            })
            if (this.$route.params.id == 'mine') {
              this.$router.push({
                name: 'Mine'
              })
            } else {
              if (this.$route.params.id == 'result') {
                this.$router.push({
                  name: 'Index'
                })
              } else {
                if (this.$route.params.id == 'reservation') {
                  this.$router.push({
                    name: 'Index'
                  })
                } else {
                  if (this.$route.params.id == 'out') {
                    this.$router.push({
                      name: 'TransferOut'
                    })
                  }
                }
              }
            }
          }
        }).catch(err => {
          if (err.code != 0) {
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        })
      },
      // 取消
      setPwd() {
        if (this.$route.params.id == 'mine') {
          this.$router.push({
            name: 'Mine'
          })
        } else {
          if (this.$route.params.id == 'result') {
            this.$router.push({
              name: 'Index'
            })
          } else {
            if (this.$route.params.id == 'reservation') {
              this.$router.push({
                name: 'Index'
              })
            } else {
              if (this.$route.params.id == 'out') {
                this.$router.push({
                  name: 'TransferOut'
                })
              }
            }
          }
        }
      }
    },
    watch: {
      password: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.pay_pwd1 && val.pay_pwd2 != '' && val.pay_pwd1.length && val.pay_pwd2.length == 6) {
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
  body {
    background-color: #fff;
  }

  .set-pwd-input {
    margin: 100px auto;

    span {
      margin: 20px 0 10px 20px;
      display: block;
    }
  }
  .set-pay-pwd .submit-btn {
      width: 90%;
      margin: 0px auto;
      background-color: #09bb07 !important;
      color: #fff
    }

  .set-pay-pwd .submit-btn-cancel {
      width: 90%;
      margin: 0px auto;
      background-color: #fff;
      color: #09bb07 !important;
      border: 1px solid #09bb07;
      margin-top: 20px;
    }
</style>