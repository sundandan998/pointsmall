<template>
  <div class="index">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="index-body">
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
          :error.sync="error" error-text="请求失败，点击重新加载"> -->
        <div class="line">
          <router-link to="product">
            <div class="index-title">
              <div class="index-img fl">
                <img src="../../assets/images/1.jpg" alt="">
              </div>
              <div class="index-text">
                <p>生物质石墨烯乳胶健康枕</p>
                <p>120 积分</p>
              </div>
              <div class="index-right fr">
                <img src="../../assets/images/r.png" alt="">
              </div>
            </div>
          </router-link>
        </div>
        <!-- </van-list> -->
      </div>
    </van-pull-refresh>
    <!-- 底部tabber -->
    <div>
      <tabber :message="selected"></tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  // 接口请求
  import api from '@/api/goods/Goods.js'
  export default {
    data() {
      return {
        selected: 'index',
        message: 'index',
        readonly: true,
        show: false,
        submitBtnDisabled: true,
        dataList: [],
        info: {
          'id_card': null
        },
        // openId参数
        code: {
          code: ''
        },
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
        // 下拉刷新
        isLoading: false
      }
    },
    created() {
      document.title = '首页'
      // this.information()
      this.openId()
      this.goods()
    },
    components: {
      Tabber,
    },
    methods: {
      // 商品列表
      goods(){
        api.goods().then(res=>{
          console.log(res)
        }).catch(err=>{})
      },
      openId() {
        var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)', 'i')
        var r = window.location.href.split('?')
        if (r.length === 1) {
          return null
        }
        r = r[1]
        r = r.match(reg)
        if (r == null) {
          return null
        }
        var code = unescape(r[2])
        if (code !== '' && this.$store.getters.token === '') {
          api.openId({ code: code }).then(res => {
            if (res.code === 0) {
              this.$store.dispatch('setUserInfo', { data: res.info })
              this.$store.dispatch('setToken', res.token)
              this.information()
            }
          }).catch(err => {
            console.log(err)
            // debugger
            if (err.code === 4003) {
              window.sessionStorage.setItem('access_token', err.access_token)
            }
          })
        }
      },
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.goods({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.dataList.push.apply(this.dataList, res.data)
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
      // 下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
        }, 500)
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .line {
    border-bottom: 2px solid #f2f2f2;
  }

  .index-title {
    height: 90px;
    margin: 10px 10px 0 15px;

    .index-img img {
      height: 80px;
      width: 60px;
    }

    .index-img {
      margin-right: 10px;
    }

    .index-text {
      position: relative;
      top: 8px;
      color: #333;
    }

    .index-text p:last-child {
      position: relative;
      top: 18px;
      color: #E51C23;
    }
  }
</style>