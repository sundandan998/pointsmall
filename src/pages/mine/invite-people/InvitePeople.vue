<template>
  <div class="invite-people">
    <div class="invitation-code">
      <img src="../../../assets/images/logo-red.png" alt="">
      <span class="text">您的邀请码</span>
      <p class="code">{{invite_code}}</p>
      <van-button class="inviteCode" size="small" :data-clipboard-text="invite_code" @click="copy">复 制
      </van-button>
    </div>
    <!-- 邀请记录列表 -->
    <div class="invitation-list-title">
      <mt-cell title="邀请历史"></mt-cell>
    </div>
    <div class="invitation-list">
      <div v-for="(item,index) in recentlyList" class="invitation-list-tel">
        <mt-cell v-if="item.count==0" :title="item.invitee" value="" :label="'注册于:'+item.create_time" class="count">
        </mt-cell>
        <router-link :to="{name:'InvitationRecord',params:{query:item.invitee}}">
          <mt-cell v-if="item.count!=0" :title="item.invitee" :value="item.count" is-link
            :label="'注册于:'+item.create_time"></mt-cell>
        </router-link>
      </div>
    </div>
    <div class="all">
      <router-link to="record">
        <span class="all">全部 >></span>
      </router-link>
    </div>
    <div class="order-button">
      <router-link to="mine">
        <mt-button size="large">返回</mt-button>
      </router-link>
    </div>
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
      height: 400px;
      margin: 10px 24px;
      background-color: #fff;
      border-radius: 20px;
      text-align: center;
      color: #333;

      img {
        width: 90px;
        margin: 40px 0 10px 0;
      }

      .text {
        display: block;
        font-size: 24px;
      }

      .code {
        font-size: 70px;
        margin-top: 25px;
      }

      .van-button--default {
        border: none;
      }

      .inviteCode {
        width: 100px;
        height: 50px;
        border: 1px solid #ce0101;
        color: #ce0101;
        line-height: 50px;
        margin-top: 25px;
        border-radius: 8px;
        font-size: 28px;
      }
    }

    /* 邀请记录列表 */
    .invitation-list-title {
      margin: 10px 24px;

      .mint-cell {
        border-radius: 10px;
      }
    }

    .invitation-list {
      margin: 10px 24px;
      .mint-cell-value{
        span{
          color:#ce0101;
        }
      }
    }

    .invitation-list .invitation-list-tel:first-child .mint-cell {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .mint-cell:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    /* 全部 */
    .all{
      text-align: center;
      font-size: 24px;
    }
  }
</style>