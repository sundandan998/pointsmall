<template>
  <div class="member-day">
    <div class="member-day-title">
      <span v-if="timeInfo.start==false">距开始 <b>{{day}}</b>天 <b>{{hour}}</b> 时 <b>{{min}}</b> 分 <b>{{second}}</b> 秒</span>
      <span v-if="timeInfo.start==true">距结束 <b>{{hour}}</b>
        <h6>:</h6><b>{{min}}</b>
        <h6>:</h6><b>{{second}}</b>
      </span>
    </div>
    <div class="index-body">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="member-day-list" v-for="(item,index) in goodsData">
          <!-- <router-link :to="/product/+item.id"> -->
          <div @click="memberBuy(item.id,index)">
            <div class="member-day-list-img">
              <img :src="item.default_image" alt="" class="fl">
            </div>
            <span class="member-day-text">
              <p>{{item.name}}</p>
              <p class="member-day-price"><span>{{item.price|keepTwoNum}}</span>超级积分</p>
              <span class="market-price">市场价￥{{item.market_price|keepTwoNum}}</span>
            </span>
            <div class="member-day-button fr">
              <img src="../../assets/images/member-btn.png" alt="" class="fr" v-if="item.stock!=0&&timeInfo.start==true">
              <img src="../../assets/images/member-btn (2).png" alt="" class="fr" v-if="item.stock==0&&timeInfo.start==true">
              <img src="../../assets/images/member-btn3.png" alt=""  class="fr" v-if="timeInfo.start==false">
            </div>
          </div>
          <div v-if="item.stock<=10&&item.stock!=0">
            <span class="remaining fr">| 剩 余{{item.stock}} 件 |</span>
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
              // console.log(this.timeInfo)
              // this.timeInfo = { start: true, end_time: 1569859200000, now: 1569772800000 }
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
        this.$router.push({
          name: 'Product',
          params: { id: id, path: 'memberDay', start: this.timeInfo.start }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';

  .member-day {

    /* 背景图片 */
    .member-day-title {
      background: url('../../assets/images/member-banner.png')center;
      height: 474px;
      width: 100%;
      overflow: hidden;
      background-size: cover;
      margin-top: 10px;
      text-align: center;

      span {
        font-size: 24px;
        position: relative;
        top: 212px;
        color: #292929;

        b {
          background-color: #000;
          color: #fff;
          width: 34px;
          height: 34px;
          padding: 0 3px;
          border-radius: 4px;
        }

        h6 {
          color: #000;
          font-size: 28px;
          margin-right: 10px;
          display: inline-block;
        }
      }
    }

    /* 商品部分 */
    .member-day-list {
      background-color: #fff;
      height: 290px;
      margin: 10px 24px;
      border: 1px solid #DEDEDE;
      border-radius: 20px;

      /* 商品图片 */
      .member-day-list-img {
        img {
          height: 290px;
          width: 290px;
          margin-right: 10px;
        }
      }

      /* 商品介绍 */
      .member-day-text {
        margin-top: 58px;
        display: inline-block;

        p {
          font-size: 28px;
          overflow: hidden;
          white-space: nowrap;
          width: 400px;
          text-overflow: ellipsis;
        }

        .member-day-price {
          font-size: 24px;
          margin: 20px 0 0px 0;

          span {
            font-size: 32px;
            color: #ce0101;
          }
        }

        .market-price {
          font-size: 22px;
          color: #999;
        }
      }
    }
    .remaining {
      color: #7c4117;
      position: relative;
      top: -120px;
      right: 10px;
    }

    .member-day-button {
      img {
        width: 60%;
        margin-right: 10px;
      }
    }
  }
</style>