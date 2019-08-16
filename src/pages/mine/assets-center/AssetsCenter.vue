<template>
  <div class="assets-center">
    <div class="assets-center-title">
      <mt-cell title="资产详情" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="assets-center-list" v-for="item in assetsData">
          <span class="assets-center-list-right fr">{{item.balance|keepTwoNum}}</span>

        <div class="assets-center-list-left fl">
          <img :src="item.token.icon" alt="">
          <span>{{item.token.code}}</span>
          <p>{{item.token.subject}}</p>
        </div>
        <!-- <span class="assets-center-list-right fr">{{item.balance}}</span> -->
        <div class=" fr integral"><img src="../../../assets/images/wait.png" alt=""> {{item.integral|keepTwoNum}}(超级积分)
        </div>
      </div>
    </van-list>
    <router-link to="mine">
      <div class="assets-center-button">
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
                // this.loading = true
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

  .assets-center-list {
    height: 100px;
    padding: 5px 10px 5px 15px;
    /* border-top: 1px solid #f2f2f2; */
    border-bottom: 1px solid #f2f2f2;
    .integral {
      margin-top: 10px;
      position: relative;
      /* left: 80px; */
      margin-right: 10px;
    }
  }

  .assets-center-list-left {
    /* border-bottom: 1px solid #f2f2f2; */
    width: 100%;

    img {
      float: left;
      margin-right: 15px;
    }

    span {
      display: block;
    }
  }
  .assets-center-button {
    button {
      position: fixed;
      bottom: 0;
      border-radius: 20px;
      background-color: #09BB07;
      color: #fff;
    }

  }
</style>