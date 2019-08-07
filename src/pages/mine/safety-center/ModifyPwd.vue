<template>
  <div class="modify-pwd">
    <!-- 支付密码框 -->
    <div class="modify-pwd-input">
      <span>原支付密码</span>
      <van-password-input :value="this.password.old_pay_pwd" :mask="true" @focus="passIndex1" />
      <span>新支付密码</span>
      <van-password-input :value="this.password.new_pay_pwd1" :mask="true" @focus="passIndex2" />
      <span>确认支付密码</span>
      <van-password-input :value="this.password.new_pay_pwd2" :mask="true" @focus="passIndex3" />
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
    <div class="modify-pwd-btn">
      <mt-button size="large" class="submit-btn" :disabled="disabled" @click.native=edit>提交</mt-button>
      <router-link to="safety">
        <mt-button size="large" class="submit-btn-cancel">取消</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        index: 1,
        disabled: true,
        showKeyboard: false,
        password: {
          old_pay_pwd: '',
          new_pay_pwd1: '',
          new_pay_pwd2: ''
        }
      }
    },
    created() {
      document.title = '修改支付密码'
      
    },
    methods: {
      passIndex1() {
        this.showKeyboard = true
        this.index = 1
      },
      passIndex2() {
        this.showKeyboard = true
        this.index = 2
      },
      passIndex3() {
        this.showKeyboard = true
        this.index = 3
      },
      onInput(key) {
        if (this.index === 1) {
          this.password.old_pay_pwd = (this.password.old_pay_pwd + key).slice(0, 6)
        } else {
          if (this.index === 2) {
            this.password.new_pay_pwd1 = (this.password.new_pay_pwd1 + key).slice(0, 6)
          } else {
            if(this.index ===3){
              this.password.new_pay_pwd2 = (this.password.new_pay_pwd2 + key).slice(0, 6)
            }
          }
        }
      },
      onDelete(key) {
        if (this.index === 1) {
          this.password.old_pay_pwd = this.password.old_pay_pwd.slice(0, this.password.old_pay_pwd.length - 1)
        } else {
          if (this.index == 2) {
            this.password.new_pay_pwd1 = this.password.new_pay_pwd1.slice(0, this.password.new_pay_pwd1.length - 1)
          }else{
            if(this.index==3){
              this.password.new_pay_pwd2 = this.password.new_pay_pwd2.slice(0, this.password.new_pay_pwd2.length - 1)
            }
          }
        }
      },
      // 修改密码
      edit() {
        api.editPwd(this.password).then(res => {
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
          if (err.code != 0) {
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        })
      },
    },
    watch: {
      password: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.old_pay_pwd && val.new_pay_pwd1 && val.new_pay_pwd2 !== '') {
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
  body{
    background-color: #fff;
  }
  /* .modify-pwd {
    background-color: #fff;
  } */

  .modify-pwd-input {
    margin: 0px auto;

    span {
      margin: 20px 0 10px 20px;
      display: block;
    }
  }

  .modify-pwd-btn {
    .submit-btn {
      width: 90%;
      margin: 20px auto;
      background-color: #09bb07;
      color: #fff;
    }

    .submit-btn-cancel {
      width: 90%;
      margin: 0px auto;
      background-color: #fff;
      color: #09bb07 !important;
      border: 1px solid #09bb07;
      margin-top: 20px;
    }
  }
</style>