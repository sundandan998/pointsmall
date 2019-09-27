<template>
  <div class="agent">
    <div class="agent-img">
      <router-link to="/memberstart">
        <img v-if="memberDay.start==true" src="../../assets/images/start.png" alt="">
        <img v-if="memberDay.start==false" src="../../assets/images/agent.png" alt="">
      </router-link>
    </div>
    <!-- 千企会员 -->
    <div class="agent-member">
      <p>会员权益包</p>
      <div class="agent-member-img">
        <van-row>
          <!-- <router-link to="index"> -->
          <router-link :to="{name:'Index',params:{position:1}}">
            <van-col span="8"><img src="../../assets/images/680.png" alt=""></van-col>
          </router-link>
          <router-link :to="{name:'Index',params:{position:2}}">
            <van-col span="8"><img src="../../assets/images/1380.png" alt=""></van-col>
          </router-link>
          <router-link :to="{name:'Index',params:{position:3}}">
            <van-col span="8"><img src="../../assets/images/2580.png" alt=""></van-col>
          </router-link>
        </van-row>
      </div>
      <!-- 会员日特卖 -->
      <router-link to="memberstart">
        <p>会员日特卖
          <span v-if="memberDay.start==false" class="timer">距开始 {{day}} 天 {{hour}} 时 {{min}} 分 {{second}} 秒</span>
          <span v-if="memberDay.start==true" class="timer">距结束 <b>{{hour}}</b>
            <h6>:</h6><b>{{min}}</b>
            <h6>:</h6><b>{{second}}</b>
          </span>
          <span class="fr">更多></span></p>
      </router-link>
    </div>
    <div class="memberday-buy">
      <div class="memberday-buy-list fl " v-for="(item,index) in goodsList" v-if="index<3">
        <!-- <router-link :to="/product/+item.id"> -->
        <router-link to="memberstart">
          <div class="memberday-buy-list-img">
            <img :src="item.default_image" alt="">
          </div>
          <div class="memberday-buy-list-text">
            <span class="memberday-buy-price"><b>{{item.price|keepTwoNum}}</b>超级积分</span>
            <span class="memberday-buy-market">市场价￥{{item.market_price|keepTwoNum}}</span>
          </div>
        </router-link>
      </div>
    </div>
    <!-- 代理商专区 -->
    <div class="agent-area">
      <p>代理商专区 <span class="fr" @click="more">更多></span></p>
      <div class="agent-area-list" v-for="(item,index) in agent" v-if="index<3">
        <div @click="more">
          <!-- <router-link :to="/product/+item.id"> -->
          <div class="member-day-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span>
            <p>{{item.name}}</p>
            <p class="integral"><span>{{item.price|keepTwoNum}}</span>超级积分</p>
            <span>市场价￥{{item.market_price|keepTwoNum}}</span>
          </span>
          <div class="agent-area-btn fr">
            <van-button round size="small" v-if="item.stock!=0">购买</van-button>
            <van-button round size="small" v-if="item.stock==0" class="sold-out">已售罄</van-button>
          </div>
          </router-link>
        </div>
      </div>
      <p class="agent-more" @click="more">更多></p>
    </div>
    <!-- 底部tabber -->
    <div>
      <tabber :message="selected"></tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        selected: 'index',
        message: 'index',
        goodsList: '',
        memberDay: '',
        agent: '',
        info: '',
        // 倒计时
        memberDay: '',
        curStartTime: '',
        day: '0',
        hour: '00',
        min: '00',
        second: '00',
      }
    },
    created() {
      document.title = '千企国际'
      window.setInterval(this.time, 1000)
      this.list()
      this.agentList()
      this.userInfo()
      this.openId()
    },
    components: {
      Tabber,
    },
    methods: {
      // 会员日特卖
      list() {
        api.goods().then(res => {
          this.goodsList = res.data
          this.memberDay = res.info
          // this.memberDay = { start: true, end_time: 1569859200000, now: 1569772800000 }
        }).catch(err => {
          console.log(err)
        })
      },
      // 代理商专区
      agentList() {
        api.agent().then(res => {
          this.agent = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 倒计时
      time() {
        let now = this.memberDay.now
        let end = this.memberDay.end_time
        // 设置截止时间
        let leftTime = end - now
        // let leftTime = this.memberDay.end_time-this.memberDay.now
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
          this.memberDay.now += 1000
        } else {
          this.memberDay.start = !this.memberDay.start
          this.disabled = !this.disabled
        }
      },
      // 个人信息
      userInfo() {
        api.information().then(res => {
          if (res.code == 0) {
            this.info = res.data
          }
        }).catch(err => {

        })
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
            if (err.code === 4003) {
              window.sessionStorage.setItem('access_token', err.access_token)
            }
          })
        }
      },
      // 更多按钮，判断是否是代理商
      more() {
        if (this.info.is_agent == true) {
          this.$router.push({
            name: 'AgentList'
          })
        } else {
          this.$router.push({
            name: 'NonAgent'
          })
        }
      },
      // 购买按钮 判断是否是代理商
      buy(id) {
        if (this.info.is_agent == true) {
          this.$router.push({
            name: 'Product',
            params: { id: id, path: 'index' }
          })
        } else {
          this.$router.push({
            name: 'NonAgent'
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .agent {
    .agent-img {
      img {
        width: 95%;
        margin: 20px auto;
        display: block;
        border-radius: 7px;
      }
    }

    .agent-member {
      p {
        padding-left: 15px;
        font-size: 0.78rem;
        padding-bottom: 10px;
        border-top: 4px solid #f2f2f2;

        span {
          margin-right: 10px;
        }

        .timer {
          color: #E51C23;
          margin-left: 15px;
          font-size: 0.6rem;

          b {
            background-color: #E51C23;
            color: #fff;
            margin-left: 3px;
            padding: 2px;
            border-radius: 3px;
          }

          h6 {
            color: #E51C23;
            font-size: 0.70rem;
            display: inline-block;
          }
        }
      }

      .agent-member-img {
        margin-top: 10px;

        img {
          width: 70%;
          display: block;
          margin: 0px auto 10px auto;
        }
      }
    }

    .memberday-buy {
      height: 135px;
      display: flex;
      border-bottom: 4px solid #f2f2f2;
      padding-bottom: 10px;

      .memberday-buy-list {
        margin-left: 15px;
        width: 30%;
        text-align: center;
        margin: 10px auto 0 auto;

        .memberday-buy-list-img {
          float: left;

          img {
            width: 90px;
            height: 80px;
            margin-left: 12px;
          }
        }

        .memberday-buy-list-text {
          span {
            display: block;
            font-size: 0.70rem;
          }

          .memberday-buy-price {
            color: #E51C23;

            b {
              font-size: 1.0rem;
            }
          }

          .memberday-buy-market {
            font-size: 0.6rem;
            text-decoration: line-through;
            /* color:#ccc; */
          }

          b {
            font-weight: 400;
            font-size: 0.9rem;
            margin-right: 5px;
          }
        }
      }

    }

    .agent-area {
      margin-top: 10px;
      margin-bottom: 70px;

      .agent-more {
        text-align: center;
      }

      p {
        padding-left: 15px;
        font-size: 0.78rem;

        span {
          margin-right: 5px;
        }
      }

      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      .agent-area-list {
        height: 90px;
        padding-left: 15px;
        margin-top: 10px;
        padding-top: 15px;
        border-top: 1px solid #f2f2f2;

        span {
          font-size: 0.76rem;
        }

        .integral {
          margin: 5px 0 5px 0;
          color: #E51C23;

          span {
            font-size: 1.0rem;
          }
        }
      }

      .agent-area-btn {
        .sold-out {
          background-color: #ccc;
        }

        button {
          background-color: #E51C23;
          color: #fff;
          position: relative;
          top: -15px;
          right: 10px;
        }
      }
    }
  }
</style>