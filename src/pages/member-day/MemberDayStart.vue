<template>
  <div class="member-day">
    <div class="member-day-title">
      <p>会员日,买啥都值</p>
      <span>距结束</span>
    </div>
    <div class="member-day-buy">
      <p>会员日特卖<span>白菜价,抢不到,就是亏</span></p>
    </div>
    <div class="index-body">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="member-day-list" v-for="item in goodsData">
          <router-link :to="/product/+item.id">
            <div class="member-day-list-img fl">
              <img :src="item.default_image" alt="">
            </div>
            <span>
              <p>{{item.name}}</p>
              <p class="member-day-price">{{item.price|keepTwoNum}}超级积分</p>
              <span>会员价￥{{item.member_price}}</span>|<span>市场价￥{{item.market_price}}</span>
            </span>
            <div class="member-day-button fr">
              <van-button round size="small">马上抢></van-button>
            </div>
          </router-link>
        </div>
      </van-list>
    </div>
    <!-- 底部 -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        selected: 'member',
        message: 'member',
        goodsData: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      document.title = '会员日'
    },
    components: {
      'app-tabber': Tabber
    },
    methods: {
      // 商品列表
      onLoad() {
        setTimeout(() => {
          api.goods({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.goodsData.push.apply(this.goodsData, res.data)
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
  @import '../../assets/scss/Global.scss';

  .member-day-title {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 10px;
    border-bottom: 2px solid #f2f2f2;

    p {
      color: #E51C23;
      font-size: 1.1rem;
    }

    span {
      font-size: 0.76rem;
    }
  }

  .member-day-buy {
    border-bottom: 1px solid #f2f2f2;

    p {
      font-size: 0.78rem;
      margin-left: 15px;
      margin-bottom: 10px;

      span {
        margin-left: 5px;
        font-size: 0.70rem;
        color: #ccc;
      }
    }
  }

  .member-day-list {
    margin-top: 16px;
    padding-left: 15px;
    height: 95px;
    border-bottom: 1px solid #f2f2f2;

    p {
      font-size: 0.76rem;
      padding-top: 5px;
    }

    span {
      font-size: 0.70rem;
    }

    img {
      margin-right: 10px;
      width: 80px;
      height: 80px;
    }

    .member-day-price {
      color: #E51C23;
    }
  }

  .member-day-button {
    button {
      background-color: #E51C23;
      color: #fff;
      position: relative;
      top: -20px;
      right: 10px;
    }
  }
</style>