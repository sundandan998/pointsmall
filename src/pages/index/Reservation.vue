<template>
  <div class="reservation">
    <!-- 主体部分 -->
    <div class="reservation-body">
      <mt-cell title="预约人" :value="add.name" v-model="add.name"></mt-cell>
      <mt-cell title="联系电话" :value="add.mobile" v-model="add.mobile"></mt-cell>
    </div>
    <div class="reservation-body-price">
      <mt-cell title="服务名称" :value="detail.title" class="reservation-title"></mt-cell>
      <mt-cell title="价格" :value="parseInt(detail.integral)"></mt-cell>
    </div>
    <!-- <div class="reservation-body-time">
      <mt-field label="预约时间" type="date" v-model="add.appointment_date" ></mt-field>
    </div> -->
    <div class="reservation-btn">
      <mt-button size="large" @click="success" class="sure">确认</mt-button>
      <router-link to="/">
        <mt-button size="large" class="cancel">取消</mt-button>
      </router-link>
    </div>
    <div>
      <mt-popup v-model="resevationModelModel" class="resevation-modal">
        <img class="fr" @click="modalHide" src="../../assets/images/cancel.svg" alt="" />
        <span>输入支付密码</span>
        <p>服务预约</p>
        <p>{{parseInt(detail.integral)}}(积分)</p>
        <van-password-input :value="pay_pwd" @focus="showKeyboard= true" />
      </mt-popup>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" extra-key="." @input="onInput" @delete="onDelete"
      @blur="showKeyboard = false" />
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  // 接口请求
  import api from '@/api/order/order.js'
  export default {
    data() {
      return {
        detail: {},
        value: '',
        pay_pwd: '',
        showKeyboard: false,
        resevationModelModel: false,
        search: {
          page: 1,
          page_size: 6
        },
        date: {
          pickerVisible: '',
          startDate: new Date(),
          time: ''
        },
        add: {
          name: '',
          mobile: '',
          service_id: '',
          appointment_date: '',
          pay_pwd: ''
        }
      }
    },
    created() {
      document.title = '预约信息'
      this.rowData()
      this.information()
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
      success() {
        // debugger
        if (this.add.pay_pwd_active == true) {
          this.resevationModelModel = true
        } else {
          this.$messagebox({
            title: '提示',
            message: `请先设置支付密码再进行操作`,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({
                name: 'SafetyVerification',
                params:{id:'reservation'}
              })
            }
          })
        }
      },
      // 返回上一页
      rowData() {
        if (JSON.stringify(this.$route.params) !== '{}') {
          this.$route.params.list.map(item => {
            if (item.id === this.$route.params.id) {
              this.detail = item
            }
          })
        }
        // } else {
        //   this.$router.go(-1)
        // }
      },
      // 个人信息
      information() {
        api.information().then(res => {
          this.add = res.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    watch: {
      pay_pwd() {
        if (this.pay_pwd.length == 6) {
          // 确认支付
          this.add.pay_pwd = this.pay_pwd
          this.add.service_id = this.$route.params.id
          api.addOrder(this.add).then(res => {
            if (res.code === 0) {
              Toast({
                message: res.msg,
                position: 'top',
                className: 'zZindex'
              })
              this.$router.push({
                name: 'Myappointment'
              })
            }
          }).catch(err => {
            if (err.code !== 0) {
              console.log(err.msg)
              Toast({
                message: err.msg,
                position: 'top',
                className: 'zZindex'
              })
            }
            this.pay_pwd = ''
            this.resevationModelModel = false
            this.showKeyboard = false
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss'
</style>