<template>
  <div class="safety-verification">
    <div class="safety-verification-infomation">
      <span>{{infor.mobile}}</span>
      <mt-field placeholder="请输入验证码" type="number" v-model="verification.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
    </div>
    <div class="safety-verification-protocol">
      <mt-button size="large" class="submit-btn" :disabled="disabled" @click="safetyVerification">提交</mt-button>
      <mt-button size="large" class="submit-btn-cancel" @click.native="cancel">取消</mt-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  // import { sendCode } from '@/assets/js/common.js'
  export default {
    data() {
      return {
        infor: {},
        dataList: [],
        disabled: true,
        // 提交参数
        verification: {
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
      document.title = '安全验证'
      this.information()
    },
    methods: {
      // 个人信息
      information() {
        api.information().then(res => {
          this.infor = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 安全验证
      safetyVerification() {
        this.verification.mobile = this.infor.mobile
        api.verification(this.verification).then(res => {
          if (res.code == 0) {
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex'
            })
            if (this.$route.params.id == 'mine') {
              this.$router.push({
                name: 'SetPwd',
                params: { id: 'mine' }
              })
            } else if (this.$route.params.id == 'result') {
              this.$router.push({
                name: 'SetPwd',
                params: { id: 'result' }
              })
            } else if (this.$route.params.id == 'reservation') {
              this.$router.push({
                name: 'SetPwd',
                params: { id: 'reservation' }
              })
            }else if(this.$route.params.id == 'safetycenter'){
              this.$router.push({
                name: 'ModifyPwd',
              })
            }
          }
        }).catch(err => {
          if(err.code!=0){
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        })

      },
      // 发送验证码
      sendSmsCode() {
        // debugger
        this.time = 60
        this.timer()
        // var userInfo = sessionStorage.getItem('userInfo')
        var userInfo = localStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)
        api.sendCode({ mobile: userInfo.data.mobile}).then(res => {
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
      // 取消按钮
      cancel() {
        if (this.$route.params.id == 'mine') {
          this.$router.push({
            name: 'Mine'
          })
        } else {
          if (this.$route.params.id == 'result') {
            this.$router.push({
              name: 'Index'
            })
          }
          else {
            if (this.$route.params.id == 'reservation') {
              this.$router.push({
                name: 'Index',
              })
            } else {
              if (this.$route.params.id == 'safetycenter') {
                this.$router.push({
                  name: 'SafetyCenter',
                })
              } else {
                if (this.$route.params.id == 'out') {
                  this.$router.push({
                    name: 'TransferOut',
                  })
                }
              }
            }
          }
        }
      }
    },
    watch: {
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.code != '') {
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

  .safety-verification-infomation {
    margin: 100px 20px 10px 20px;

    span {
      display: block;
      margin: 20px 0 20px 10px;
    }

    .mint-cell-wrapper {
      background-image: none !important;
    }
  }

  .safety-verification-protocol {
    .submit-btn {
      width: 90%;
      margin: 0px auto;
      background-color: #09bb07 !important;
      color: #fff
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