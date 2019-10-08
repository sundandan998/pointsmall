<template>
  <div class="invite-people">
    <div class="invitation-code">
      <p>千企国际联盟商城</p>
      <span class="text">您的邀请码</span>
      <p class="code">{{invite_code}}</p>
      <van-button type="primary" size="small">复制</van-button>
    </div>
    <div class="invitation-list">
      <div class="line"></div>
      <a href="">邀请记录</a>
    </div>
    <router-link to="mine">
      <mt-button size="large" class="cancel">返回</mt-button>
    </router-link>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        invite_code: ''
      }
    },
    created() {
      document.title = '邀请新人'
      this.code()
    },
    methods: {
      code() {
        api.code().then(res => {
          this.invite_code = res.invite_code
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .invite-people {
    .invitation-code {
      width: 95%;
      height: auto;
      background-color: #fff;
      margin: 30px auto;
      text-align: center;

      p {
        color: #FF686E;
      }

      .code {
        font-size: 2.0rem;
        margin-bottom: 20px;
      }

      .text {
        display: block;
        margin: 20px 0px;
      }
    }

    .invitation-list {
      .line {
        margin: 0 auto;
        height: 2px;
        width: 90%;
        background-color: #f2f2f2;
      }

      a {
        display: block;
        margin: 20px auto;
        text-align: center;
      }
    }

    .cancel {
      position: absolute;
      bottom: 10px;
      background-color: #fff !important;
      color: #09bb07 !important;
      border-radius: 20px;
      border: 1px solid #09bb07;
    }
  }
</style>