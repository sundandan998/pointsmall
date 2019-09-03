<template>
  <div class="code">
    <div class="code-title">
      <span>填写邀请码</span>
    </div>
    <mt-field label="邀请码" placeholder="请输入邀请码" v-model="registerParams.invite_code"></mt-field>
    <div class="code-description">
      <p class="fr">邀请码可向代理商索取</p>
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
      document.title = '千企商城'
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
        // api.loginByCode(this.registerParams).then(res => {
        //   if (res.code == 0) {
        //     window.localStorage.setItem('token', res.token)
        //     window.sessionStorage.setItem('userInfo', JSON.stringify(res.info)) 
        //     this.$router.push({
        //       name: 'Result'
        //     })
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';

  .code {
    .code-title {
      margin: 20px 0 20px 10px;
    }

    .code-description {
      p {
        margin-right: 10px;
        font-size: 0.76rem;
        color: #ccc;
      }
    }

    .code-btn {
      width: 85%;
      margin: 10px auto;
      margin-top: 250px;

      button {
        background-color: #09bb07;
        border-radius: 25px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        margin-bottom: 20px;
      }
    }

    .code-btn button:last-child {
      background-color: #fff;
      border: 1px solid #09bb07;
      color: #09bb07;
    }
  }
</style>