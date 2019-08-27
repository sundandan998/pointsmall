<template>
  <div class="assets-center">
    <div class="assets-center-title">
      <mt-cell title="资产列表" value="明细" to="assetsdetail" is-link></mt-cell>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="assets-center-list" v-for="item in assetsData">
        <router-link :to="{name:'AssetDetail',params:{code:item.token.code}}">
          <div class="assets-center-list-left fl">
            <img :src="item.token.icon" alt="">
            <div class="assets-center-name">
              <span>{{item.token.code}}</span>
              <p>{{item.token.subject}}</p>
            </div>
          </div>
          <div class="assets-center-list-right fr">
            <span>{{item.balance|keepTwoNum}}</span>
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

  .assets-center-name {
    display: inline-block;
  }

  .assets-center-list {
    height: 50px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 0.80rem;

    a {
      color: #000;
    }
  }

  .assets-center-list-left {
    margin-left: 15px;

    img {
      margin-right: 10px;
    }
  }

  .assets-center-list-right {
    margin-right: 10px;

    span {
      margin-left: 80px;
    }

    img {
      width: 10px;
    }
  }
</style>