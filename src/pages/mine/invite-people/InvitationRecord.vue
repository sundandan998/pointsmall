<template>
  <div class="invitation-record">
    <div class="search">
      <!--  -->
      <mt-search v-model="number" cancel-text="取消" placeholder="手机号">
      </mt-search> <span class="fr search-btn" @click="search">搜索</span>
    </div>
    <div class="invitation-list">
      <!-- 点击全部时展示小计总数 -->
      <span class="total" v-if="this.invitePeople.inviter==null&&this.$route.params.query==undefined">小计:
        {{total}}</span>
      <!-- 在带有搜索页面，点击电话列表展示的邀请人 -->
      <span class="invite-people" v-if="this.invitePeople.inviter!=null||this.$route.params.query!=undefined"
        @click="invite">
        <img src="../../../assets/images/left.svg" alt="">
        <!-- <i class="mint-cell-allow-left"></i> -->
        邀请人:{{this.people.query||this.$route.params.query}}</span>

      <!-- 在邀请记录页面点击电话列表展示的邀请人 -->
      <!-- <span class="invite-people" v-if="this.invitePeople.inviter!=null">邀请人: {{invitePeople.inviter}}</span> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="invitation-tel" v-for="(item,index) in invitationList">
          <mt-cell v-if="item.count==0" :title="item.invitee" value="" :label="'注册于:'+ item.create_time" class="count">
          </mt-cell>
          <mt-cell v-if="item.count!=0" :title="item.invitee" :value="item.count" @click.native="tel(index)" is-link
            :label="'注册于:'+ item.create_time"></mt-cell>
        </div>
      </van-list>
    </div>
    <!-- <router-link to="invite"> -->
    <div v-show="showBtn">
      <mt-button size="large" class="cancel" v-on:click="$router.go(-1)">返回</mt-button>
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
    .search {
      .mint-searchbar-inner {
        /* background-color: #f2f2f2; */
      }

      .search-btn {
        position: relative;
        right: 27px;
        top: -32px;
        z-index: 1;
      }

      .mint-searchbar {
        background-color: #fff;
      }

      .mint-searchbar-inner .mintui-search {
        position: relative;
        left: 25px;
      }

      .mint-searchbar-core {
        background-color: #f2f2f2;
        width: 83%;
        border-radius: 20px;
        text-indent: 2.5em;
        height: 35px;
      }

      .mint-searchbar-cancel {
        display: none;
      }
    }

    .mint-search {
      height: 100%;
    }

    .invitation-list {
      .total {
        margin-left: 15px;
      }

      img {
        width: 16px;
        position: relative;
        top: 2px;

      }

   

      .invitation-tel {
        .count {
          span {
            margin-right: 20px;
          }

        }

      }

      .invite-people {
        font-size: 0.35rem;
        /* margin-left: 15px; */
        padding: 5px;
        border-radius: 5px;
        color: #333;
        /* background-color: #009688; */
        display: block;
        width: 40%;
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