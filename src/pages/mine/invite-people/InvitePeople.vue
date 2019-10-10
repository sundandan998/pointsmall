<template>
  <div class="invite-people">
    <div class="invitation-code">
      <p>千企国际联盟商城</p>
      <span class="text">您的邀请码</span>
      <p class="code">{{invite_code}}</p>
      <van-button class="inviteCode" type="primary" size="small" :data-clipboard-text="invite_code" @click="copy" >复制</van-button>
    </div>

    <div class="invitation-list">
      <div class="line"></div>
      <mt-progress class="invitation-description">
        <div slot="start"><span></span></div>
        <div slot="end"><span></span></div>
      </mt-progress>
      <div class="invitation-text">
        <span class=" fl">发送邀请码 <p>给新人</p> </span>
        <span class="fr">新人填写邀请码 <p>完成注册</p> </span>
      </div>
      <router-link to="record">
        <span>邀请记录</span>
      </router-link>
    </div>
    <router-link to="mine">
      <mt-button size="large" class="cancel">返回</mt-button>
    </router-link>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import Clipboard from 'clipboard'
  import { Toast } from 'mint-ui'
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
      },
      // 复制
      copy() {
        var clipboard = new Clipboard('.inviteCode')
        clipboard.on('success', e => {
          Toast({
            message: '复制成功',
            className: 'zZindex'
          })
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
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
        font-size: 0.78rem;
        margin-bottom: 20px;
      }

      .text {
        display: block;
        margin: 20px 0px;
      }
      .van-button--primary{
        background-color: #009688;
      }
    }



    .invitation-list {
      .invitation-description {
        width: 70%;
        margin: 30px auto;

        .mt-progress-runway {
          background-color: #009688;
        }

        span {
          width: 10px;
          height: 10px;
          display: block;
          border: 1px solid #009688;
          border-radius: 50%;
          margin-top: 8px;
        }
      }

      .invitation-text {
        height: 50px;
        margin: -27px 18px 0 20px;

        span {
          text-align: center;
        }
      }

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