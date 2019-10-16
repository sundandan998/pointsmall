<template>
  <div class="invitation-record">
    <div class="search"> 
        <!--  -->
      <mt-search  v-model="number"  cancel-text="取消" placeholder="手机号">
      </mt-search> <span class="fr search-btn" @click="search">搜索</span>
    </div>
    <div class="invitation-list">
      <span class="total" v-if="this.invitePeople.inviter==null">小计: {{total}}</span>
      <span class="invite-people" v-if="this.invitePeople.inviter!=null">邀请人: {{this.people.query}}</span>
      <!-- <span class="invite-people" v-if="this.invitePeople.inviter!=null">邀请人: {{invitePeople.inviter}}</span> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="invitation-tel" v-for="(item,index) in invitationList">
          <mt-cell :title="item.invitee" :value="item.count" @click.native="tel(index)" is-link :label="item.create_time"></mt-cell>
        </div>
      </van-list>
    </div>
    <!-- <router-link to="invite"> -->
      <div v-show="showBtn">
      <mt-button size="large" class="cancel" v-on:click="$router.go(-1)" >返回</mt-button>
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
        number:'',
        // 点击搜索文字参数
        list: {
          page: '',
          page_size: '',
          query: ''
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
              // console.log(this.invitationList)
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
      // 搜索时
      search() {
        this.list.query=this.number
        api.codeList(this.list).then(res => {
          if (res.code == 0) {
            this.people.query=res.inviter
            this.invitePeople = res
            this.invitationList = [{"count":res.count,"create_time":res.create_time,"invitee":this.list.query}]
            // this.invitationList.push.apply(this.invitationList, res.data)
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
      },
      // 点击电话时的请求接口
      tel(index) {
        // 点击电话号码时清空搜索框
        this.number =''
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
      }
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
      .invite-people {
        margin-left: 15px;
        padding: 5px;
        border-radius: 5px;
        color: #fff;
        background-color: #009688;
        display: block;
        width: 35%;
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