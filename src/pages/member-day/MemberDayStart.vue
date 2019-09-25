<template>
  <div class="member-day">
    <div class="member-day-title">
      <p>会员日,买啥都值</p>
      <span v-if="timeInfo.start==false">距开始 {{day}} 天 {{hour}} 时 {{min}} 分 {{second}} 秒</span>
      <span v-if="timeInfo.start==true">距结束 <b>{{hour}}</b><b>{{min}}</b> <b>{{second}}</b></span>
    </div>
    <div class="member-day-buy">
      <p>会员日特卖<span>白菜价,抢不到,就是亏</span></p>
    </div>
    <div class="index-body">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="member-day-list" v-for="item in goodsData">
          <!-- <router-link :to="/product/+item.id"> -->
          <div @click="memberBuy(item.id)">
            <div class="member-day-list-img fl">
              <img :src="item.default_image" alt="">
            </div>
            <span>
              <p>{{item.name}}</p>
              <p class="member-day-price">{{item.price|keepTwoNum}}超级积分</p>
              <span>会员价￥{{item.member_price}}</span>|<span>市场价￥{{item.market_price}}</span>
            </span>
            <div class="member-day-button fr">
              <van-button round size="small" :disabled="disabled">马上抢></van-button>
            </div>
          </div>
          <!-- </router-link> -->
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
        disabled: true,
        // 倒计时
        timeInfo: '',
        curStartTime: '',
        day: '0',
        hour: '00',
        min: '00',
        second: '00',
        // now: '1568822408000',
        // end: '1568908800000'
      }
    },
    created() {
      document.title = '会员日'
      window.setInterval(this.time, 1000)
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
              this.timeInfo = res.info
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
      // 倒计时
      time() {
        let now = this.timeInfo.now
        let end = this.timeInfo.end_time
        // 设置截止时间
        let leftTime = end - now
        // let leftTime = this.timeInfo.end_time-this.timeInfo.now
        // 定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          // 天
          let d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          this.day = d < 10 ? '0' + d : d
          // 时
          let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          this.hour = h < 10 ? '0' + h : h
          // 分
          let m = Math.floor(leftTime / 1000 / 60 % 60)
          this.min = m < 10 ? '0' + m : m
          // 秒
          let s = Math.floor(leftTime / 1000 % 60)
          this.second = s < 10 ? '0' + s : s
          // 倒计时实时变动
          this.timeInfo.now += 1000
        } else {
          this.timeInfo.start = !this.timeInfo.start
          this.disabled = !this.disabled
        }
      },
      // 会员日特卖列表
      memberBuy(id) {
        this.$router.push({
          name: 'Product',
          params: { id: id, path: 'member' }
        })
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
      display: block;
      margin: 10px 0;

      b {
        background-color: #E51C23;
        color: #fff;
        width: 10px;
        height: 10px;
        margin-left: 7px;
        padding: 2px;
      }
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