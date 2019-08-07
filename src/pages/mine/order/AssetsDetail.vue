<template>
  <div class="detail">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <!-- v-for="item in detailData" -->
      <div class="detail-list">
        <mt-cell title="购物" label="描述信息" to="assetsdetails" is-link>
          <span>-1(LIFE+)</span>
        </mt-cell>
      </div>
    </van-list>
    <router-link to="/assets">
      <div class="assets-center-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        detailData:[],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
        
      }
    },
    created() {
      document.title = '明细'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.detail({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.detailData.push.apply(this.detailData, res.data)
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