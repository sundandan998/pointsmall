<template>
  <div class="member-day">
    <div class="member-day-title">
      <p>会员日,买啥都值</p>
      <span v-if="timeInfo.start==false">距开始 {{day}} 天 {{hour}} 时 {{min}} 分 {{second}} 秒</span>
      <span v-if="timeInfo.start==true">距结束 <b>{{hour}}</b>
        <h6>:</h6><b>{{min}}</b>
        <h6>:</h6><b>{{second}}</b>
      </span>
    </div>
    <div class="member-day-buy">
      <p>会员日特卖<span>白菜价,抢不到,就是亏</span></p>
    </div>
    <div class="index-body">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="member-day-list" v-for="(item,index) in goodsData">
          <!-- <router-link :to="/product/+item.id"> -->
          <div @click="memberBuy(item.id,index)">
            <div class="member-day-list-img fl">
              <img :src="item.default_image" alt="">
            </div>
            <span>
              <p>{{item.name}}</p>
              <p class="member-day-price">{{item.price|keepTwoNum}}超级积分</p>
              <span>市场价￥{{item.market_price|keepTwoNum}}</span>
            </span>
            <div class="member-day-button fr">
              <!-- v-if="item.stock==0" -->
              <van-button round size="small" :disabled="disabled" v-if="item.stock!=0">马上抢</van-button>
              <van-button round size="small" v-if="item.stock==0" class="sold-out">已售罄</van-button>
            </div>
            <div v-if="item.stock<=10">
              <span class="remaining fr">剩余{{item.stock}}件</span>
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
  import { Toast } from 'mint-ui'
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
              this.timeInfo = { start: true, end_time: 1569859200000, now: 1569772800000 }
              if (this.timeInfo.start == true) {
                this.disabled = false
              } else {
                this.disabled = true
              }
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
        }
      },
      // 会员日特卖列表
      memberBuy(id, index) {
        // 判断是否是售罄商品
        if (this.goodsData[index].stock == 0) {
          Toast({
            message: '商品已经卖完啦',
            className: 'zZindex'
          })
        } else {
          // 判断是否是会员日，如果不是会员日，点击不能跳转
          if (this.timeInfo.start == false) {
          } else {
            this.$router.push({
              name: 'Product',
              params: { id: id }
            })
          }
        }

      }
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
        margin-left: 3px;
        padding: 2px;
        border-radius: 3px;
      }

      h6 {
        color: #E51C23;
        font-size: 0.78rem;
        display: inline-block;
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

  .remaining {
    color: #E51C23;
    background-color: #FFF0D9;
    padding: 2px 7px;
    position: relative;
    top: -60px;
    right: -45px;
  }

  .member-day-button {
    .sold-out {
      background-color: #ccc;
    }

    button {
      background-color: #E51C23;
      color: #fff;
      position: relative;
      top: -10px;
      right: 10px;
    }
  }
</style>