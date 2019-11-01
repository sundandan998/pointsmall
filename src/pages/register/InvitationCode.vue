<template>
  <div class="code">
    <div class="code-title">
      <span>填写邀请码</span>
    </div>
    <div class="invite-code">
      <mt-field label="邀请码" placeholder="请输入邀请码" v-model="registerParams.invite_code"></mt-field>
      <p>*邀请码可向代理商索取</p>
    </div>
    <div class="code-btn">
      <van-button square size="large" @click.native="submitCode">提交</van-button>
      <router-link to="/register">
        <van-button square size="large">取消</van-button>
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
        // 注册参数
        registerParams: {
          mobile: this.$route.params.registerParams.mobile,
          access_token: '',
          code: this.$route.params.registerParams.code,
          invite_code: ''
        },
      }
    },
    created() {
      document.title = '千企联盟'
      // console.log(this.$route.params.registerParams)
    },
    methods: {
      submitCode() {
        this.registerParams.access_token = sessionStorage.getItem('access_token')
        // 判断是否是新用户，如果是新用户，跳转到邀请码页面，如果不是新用户，跳转到首页
        this.$store.dispatch('loginByCode', this.registerParams).then(res => {
          if (this.$store.getters.token !== '') {
            // window.sessionStorage.setItem('info', info)
            this.$store.commit('detail', res.data)
            this.$router.push({
              name: 'Result'
            })
          }
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'top',
            className: 'zZindex'
          })
        })
      },
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';
  body{
    background-color: #fff;
  }
  .code {
    .code-title {
      margin: 180px 0 100px 54px;
      font-size: 36px;
      color: #333;
    }

    .invite-code {
      margin: 0 54px 20px 54px;

      p {
        font-size: 24px;
        color: #333;
      }
    }

    .code-btn {
      margin: 200px 54px 10px 54px;
      button {
        width: 100%;
        height: 88px;
        line-height:88px;
        border-radius: 44px;
        background-color: #c9191D;
        color: #fff;
        margin-bottom: 20px;
      }
    }
    .code-btn button:last-child {
      background-color: #fff;
      border: 1px solid #c9191D;
      color: #c9191D;
    }
  }
</style>