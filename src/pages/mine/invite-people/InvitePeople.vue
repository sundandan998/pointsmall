<template>
  <div class="invite-people">
    <div class="invitation-code">
      <p>千企国际联盟商城</p>
      <span class="text">您的邀请码</span>
      <p class="code">{{invite_code}}</p>
      <van-button class="inviteCode" type="primary" size="small" :data-clipboard-text="invite_code" @click="copy">复制
      </van-button>
    </div>
    <!-- 邀请记录列表 -->
    <div class="invitation-list">
      <mt-cell title="邀请历史"></mt-cell>
      <div v-for="(item,index) in recentlyList ">
        <mt-cell  v-if="item.count==0" :title="item.invitee" :value="item.count"
          :label="'注册于:'+item.create_time" class="count">
        </mt-cell>
        <router-link :to="{name:'InvitationRecord',params:{query:item.invitee}}">
          <mt-cell v-if="item.count!=0" :title="item.invitee" :value="item.count" is-link
            :label="'注册于:'+item.create_time"></mt-cell>
        </router-link>
      </div>
      <router-link to="record">
        <span class="all">全部 >></span>
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
        invite_code: '',
        recentlyList: [],
      }
    },
    created() {
      document.title = '邀请新人'
      this.code()
      this.list()
    },
    methods: {
      // 获取验证码
      code() {
        api.code().then(res => {
          this.invite_code = res.invite_code
        }).catch(err => {

        })
      },
      // 获取列表
      list() {
        api.recentlyList().then(res => {
          if (res.code == 0) {
            this.recentlyList = res.data
          }
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

      .van-button--primary {
        background-color: #009688;
      }
    }

    .invitation-list {
      .all {
        display: block;
        text-align: center;
      }
      .count{
        span{
          margin-right: 20px;
        }
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