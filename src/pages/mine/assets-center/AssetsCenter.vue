<template>
  <div class="assets-center">
    <div class="assets-center-title">
      <mt-cell title="资产列表" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="assets-center-list" v-for="item in assetsData">
        <router-link to="/assetdetail">
          <div class="assets-center-list-top">
            <div class="assets-center-list-token fl">
              <img :src="item.token.icon" alt="">
              <p>{{item.token.code}}</p>
              <p>{{item.token.subject}}</p>
            </div>
            <div class="assets-center-list-num fr">
              <span>{{item.balance|keepTwoNum}}</span>
            </div>
          </div>
          <div class="assets-center-list-bot">
            <p><img src="../../../assets/images/wait.png" alt="">{{item.integral|keepTwoNum}}(超级积分)</p>
          </div>
        </router-link>
      </div>
    </van-list>
    <router-link to="mine">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  // 接口请求
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        BScroll: '',
        assetsData: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      document.title = '资产中心'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.assets({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.assetsData.push.apply(this.assetsData, res.data)
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
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .assets-center-list-top {
    height: 40px;
    margin: 10px 10px 10px 15px;
  }

  .assets-center-list-bot {
    margin: 10px 10px;
    height: 20px;
    float: right;
  }

  .assets-center-list {
    height: 90px;
    border-bottom: 1px solid #f2f2f2;
    a{
      color:#333;
    }
    .assets-center-list-token {
      display: -webkit-box;

      p {
        display: table-row;
      }

      img {
        margin-right: 15px;
      }

      .integral {
        height: 50px;
      }
    }
  }
</style>