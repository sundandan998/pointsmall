<template>
  <div class="invitation-record">
    <div class="search">
      <mt-search v-model="number" placeholder="被邀请人手机号" @click.native="search"></mt-search>
    </div>
    <div class="invitation-list">
      <!-- 点击全部时展示小计总数 -->
      <mt-cell title="" :value="'小计:'+total+'人'"
        v-if="this.invitePeople.inviter==null&&this.$route.params.query==undefined" class="invitation-record-num">
      </mt-cell>
      <!-- 在带有搜索页面，点击电话列表展示的邀请人 -->
      <mt-cell class="invite" v-if="this.invitePeople.inviter!=null||this.$route.params.query!=undefined">
        <p class="invite-people"
          @click="invite">
          &nbsp;&nbsp;&lt;&nbsp;邀请人 | {{this.people.query||this.$route.params.query}}
      </p>
      </mt-cell>
      <!-- 在邀请记录页面点击电话列表展示的邀请人 -->
      <!-- <span class="invite-people" v-if="this.invitePeople.inviter!=null">邀请人: {{invitePeople.inviter}}</span> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="invitation-tel" v-for="(item,index) in invitationList">
          <mt-cell v-if="item.count==0" :title="item.invitee" value="" :label="'注册于22:'+ item.create_time"
            class="count">
          </mt-cell>
          <mt-cell v-if="item.count!=0" :title="item.invitee" :value="item.count" @click.native="tel(index)" is-link
            :label="'注册于:'+ item.create_time"></mt-cell>
        </div>
      </van-list>
    </div>
    <!-- <router-link to="invite"> -->
    <div v-show="showBtn" class="order-button">
      <mt-button size="large" v-on:click="$router.go(-1)">返回</mt-button>
    </div>
    <!-- </router-link> -->
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
        invitationList: [],
        total: '',
        invitePeople: '',
        number: '',
        // 点击搜索文字参数
        list: {
          page: '',
          page_size: '',
          query: this.$route.params.query
        },
        // 点击列表中电话号码参数
        people: {
          page: '',
          page_size: '',
          query: ''
        },
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
      }
    },
    created() {
      document.title = '邀请记录'
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          this.list.page = this.pageNum
          api.codeList(this.list).then(res => {
            if (res.code == 0) {
              this.total = res.count
              this.invitationList.push.apply(this.invitationList, res.data)
              this.loading = false
              if (res.has_next == true) {
                this.pageNum++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
      inviteList() {
        api.codeList(this.list).then(res => {
          if (res.code == 0) {
            this.people.query = res.inviter
            this.invitePeople = res
            this.invitationList = [{ "count": res.count, "create_time": res.create_time, "invitee": this.list.query }]
          }
        }).catch(err => {
          if (err.code == 404) {
            this.$router.push({
              name: 'InvitePeople'
            })
          }
        })
      },
      invite() {
        if (this.people.query == '') {
          this.list.query = this.$route.params.query
          this.inviteList()
        } else {
          this.list.query = this.people.query
          this.inviteList()
        }
      },
      // 搜索时
      search() {
        if (this.number == '') {
          Toast({
            message: '请输入手机号',
            position: 'top',
            className: 'zZindex'
          })
        } else {
          this.list.query = this.number
          api.codeList(this.list).then(res => {
            if (res.code == 0) {
              this.people.query = res.inviter
              this.invitePeople = res
              this.invitationList = [{ "count": res.count, "create_time": res.create_time, "invitee": this.list.query }]
            }
          }).catch(err => {
            if (err.code == 404) {
              this.$messagebox({
                title: '提示',
                message: '未查询到该用户',
                showCancelButton: false
              })
            }
          })
        }
      },
      // 点击电话时的请求接口
      tel(index) {
        // 点击电话号码时清空搜索框
        this.number = ''
        this.list.page = this.pageNum
        this.list.query = this.invitationList[index].invitee
        this.people.query = this.invitationList[index].invitee
        api.codeList(this.list).then(res => {
          if (res.code == 0) {
            this.invitePeople = res
            this.invitationList = []
            this.invitationList.push.apply(this.invitationList, res.data)
          }
        }).catch(err => { })
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .invitation-record {

    /* 搜索部分 */
    .mint-search {
      height: 55px;

      .mint-searchbar {
        background-color: #f2f2f2;
      }

      .mint-searchbar-inner {
        border-radius: 10px;
      }

      .mint-searchbar-inner .mintui-search {
        position: absolute;
        right: 30px;
        font-size: 20px;
        color: #5d5a59;
      }

      .mint-searchbar-core {
        text-indent: 10px;
      }

      .mint-searchbar-cancel {
        display: none;
      }
    }

    img {
      width: 30px;
      position: relative;
      right: 0px;
    }

    .invitation-list {
      margin: 0 24px;

      .mint-cell-value {
        span {
          color: #c9191d;
        }
      }

      .invitation-record-num:first-child {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;

        span {
          color: #333;
        }
      }
      .invite:first-child{
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
      }
      .invite-people {
        width: 330px;
        height: 44px;
        position: absolute;
        left: 10px;
        background-color: #f74347;
        color: #fff;
        border-radius: 10px;
        font-size: 26px;
        line-height: 44px;
        margin-bottom: 10px;
      }
    }
  }
</style>