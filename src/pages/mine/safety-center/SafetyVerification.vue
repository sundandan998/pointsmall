<template>
  <div class="safety-verification">
    <div class="safety-verification-tel">
      <mt-cell title="手机号" :value="infor.mobile"></mt-cell>
    </div>
    <div class="safety-verification-code">
      <mt-field placeholder="请输入验证码" type="number" v-model="verification.code">
        <input class="send-input" v-on:click="sendSmsCode" readonly="readonly" v-model="btnCode.btnContent" />
      </mt-field>
    </div>
    <div class="">
      <van-button square size="large" type="danger" @click="safetyVerification" :disabled="disabled">提交</van-button>
      <router-link to="safety">
        <van-button square size="large" type="warning" @click.native="cancel">取消</van-button>
      </router-link>
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
            } else if (this.$route.params.id == 'safetycenter') {
              this.$router.push({
                name: 'ModifyPwd',
              })
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
      // 发送验证码
      sendSmsCode() {
        // debugger
        this.time = 60
        this.timer()
        // var userInfo = sessionStorage.getItem('userInfo')
        var userInfo = localStorage.getItem('userInfo')
        userInfo = JSON.parse(userInfo)
        api.sendCode({ mobile: userInfo.data.mobile }).then(res => {
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
  @import "../../../assets/scss/Global.scss";

  .safety-verification {

    .safety-verification-code {
      .send-input {
        border: 0.01333rem solid #a9a9a9;
        float: right;
        color: #a9a9a9;
        padding: 2px 0;
        text-align: center;
        border-radius: 7px;
        font-size: 28px;
        width: 100px;
        height: 45px;
      }

      i.mintui.mintui-field-error {
        display: none;
      }
    }

    .safety-verification-tel {
      margin: 10px 0;
    }

    .mint-cell {
      border-radius: 10px;
    }
  }
</style>