<template>
  <div class="agent">
    <div class="agent-img">
      <router-link to="/memberstart">
        <img src="../../assets/images/agentIndex.png" alt="">
        <!-- <img v-if="memberDay.start==true" src="../../assets/images/start.png" alt=""> -->
        <!-- <img v-if="memberDay.start==false" src="../../assets/images/agent.png" alt=""> -->
      </router-link>
    </div>
    <!-- 千企会员 -->
    <div class="agent-member">
      <p>会员权益包</p>
      <div class="agent-member-img">
        <van-row>
          <router-link :to="{name:'Index',params:{position:0}}">
            <van-col span="8"><img src="../../assets/images/redbag4@2x.png" alt=""></van-col>
          </router-link>
          <router-link :to="{name:'Index',params:{position:1}}">
            <van-col span="8"><img src="../../assets/images/redbag2@2x.png" alt=""></van-col>
          </router-link>
          <router-link :to="{name:'Index',params:{position:2}}">
            <van-col span="8"><img src="../../assets/images/redbag3@2x.png" alt=""></van-col>
          </router-link>
        </van-row>
      </div>
    </div>
    <!-- 会员日特卖 -->
    <div class="member-timer">
      <router-link to="memberstart">
        <p class="member-buy">会员日特卖
          <span v-if="memberDay.start==false" class="timer">距开始 <b>{{day}}</b> : <b>{{hour}}</b> : <b>{{min}}</b> :
            <b>{{second}}</b></span>
          <span v-if="memberDay.start==true" class="timer">距结束 <b>{{hour}}</b>:<b>{{min}}</b>:<b>{{second}}</b></span>
          <span class="fr">更多></span></p>
      </router-link>
      <div class="memberday-buy">
        <div class="memberday-buy-list  " v-for="(item,index) in goodsList" v-if="index<3">
          <!-- <router-link :to="/product/+item.id"> -->
          <router-link to="memberstart">
            <p class="super-points"><b>{{item.price|keepTwoNum}}</b> 超级积分</p>
            <span class="memberday-buy-market">市场价￥{{item.market_price|keepTwoNum}}</span>
            <div class="memberday-buy-list-img">
              <img :src="item.default_image" alt="" class="fl">
              <!-- <img src="../../assets/images/Memberimg.png" alt="" class="fl"> -->
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 代理商专区 -->
    <div class="agent-area">
      <p>代理商专区 <span class="fr more" @click="more">更多></span></p>
      <div class="agent-area-list" v-for="(item,index) in agent" v-if="index<3">
        <div @click="more">
          <!-- <router-link :to="/product/+item.id"> -->
          <div class="member-day-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span>
            <p>{{item.name}}</p>
            <b><span>{{item.price|keepTwoNum}}</span> 超级积分</b>
            <span class="market-price">市场价￥{{item.market_price|keepTwoNum}}</span>
          </span>
          <div class="agent-area-btn fr">
            <van-button round size="small" v-if="item.stock!=0">购 买</van-button>
            <van-button round size="small" v-if="item.stock==0" class="sold-out">已 售 罄</van-button>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
      <!-- <p class="agent-more" @click="more">更多></p> -->
    </div>
    <!-- 弹框部分 -->
    <div class="agent-modal">
      <van-popup v-model="show" position="top" @click.native="showPopup">
        <div class="non-agent-img">
          <img src="../../assets/images/close@2x.png" alt="" class="close fr">
          <img src="../../assets/images/noagent.png" alt="">
          <img src="../../assets/images/erweima@2x.png" alt="" class="qrcode">
          <img src="../../assets/images/money.png" alt="" class="money">
        </div>
      </van-popup>
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
        show: false,
        selected: 'index',
        message: 'index',
        goodsList: '',
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
      document.title = '千企联盟'
      window.setInterval(this.time, 1000)
      this.list()
      this.agentList()
      // this.userInfo()
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
        api.information().then(res => {
          if (res.code == 0) {
            this.info = res.data
            if (this.info.is_agent == true) {
              this.$router.push({
                name: 'AgentList'
              })
            } else {
              this.show=true
              // this.$router.push({
              //   name: 'NonAgent'
              // })
            }
          }
        }).catch(err => {

        })
      },
      // 购买按钮 判断是否是代理商
      buy(id) {
        if (this.info.is_agent == true) {
          this.$router.push({
            name: 'Product',
            params: { id: id, path: 'index' }
          })
        } else {
          this.show = false
          // this.$router.push({
          //   name: 'NonAgent'
          // })
        }
      },
      showPopup() {
      this.show = !this.show;
    }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .agent {
    background-color: #f2f2f2;

    .agent-img {
      width: 100%;
      background: url("../../assets/images/index-bg.png") no-repeat center center;
      background-size: 100% 100%;
      background-position: center center;

      img {
        width: 95%;
        margin: 0px auto 28px auto;
        display: block;
        border-radius: 7px;
      }
    }

    /* 会员权益包 */
    .agent-member {
      height: 300px;

      p {
        font-size: 32px;
        color: #333;
        margin: 10px 0 20px 24px;
      }

      .agent-member-img {
        overflow: hidden;
        /* width: 100%; */
        height: 100%;
        margin: 0 24px;
        background: url("../../assets/images/index-member(2).png")no-repeat center center;
        background-size: 100% 100%;
        background-position: center center;
        /* background: url("../../assets/images/index-member(2).png")no-repeat center top; */

        img {
          width: 80%;
          display: block;
          margin: 36px auto 0px auto;
        }
      }
    }

    /* 会员日特卖 */
    .member-timer {
      margin-top: 90px;

      .member-buy {
        font-size: 32px;
        color: #333;
        margin: 10px 24px 20px 24px;
        display: inline;

        span {
          font-size: 20px;
          color: #c9191d;
          margin-left: 30px;

          b {
            font-weight: 400;
            width: 30px;
            height: 30px;
            border-radius: 4px;
            background-color: #c9191d;
            color: #fff;
            padding-left: 2px;
            margin: 0 4px;
          }

        }
      }
    }

    .member-timer span:last-child {
      font-size: 22px;
      color: #333;
      margin-right: 24px;
    }

    .memberday-buy {
      margin: 0 24px;
      width: 100%;
      display: flex;

      .memberday-buy-list {
        width: 31%;
        margin-top: -70px;

        .super-points {
          height: 40px;
          background-color: #ce0101;
          color: #fff;
          border-radius: 20px;
          line-height: 40px;
          font-size: 22px;
          text-align: center;
          position: relative;
          top: 90px;
          width: 88%;
          margin: 0 auto;
          padding: 2px;

          b {
            font-size: 36px;
            font-weight: 400;
          }
        }

        .memberday-buy-market {
          font-size: 20px;
          color: #342f2c;
          position: relative;
          top: 100px;
          left: 50px;
        }

        .memberday-buy-list-img {
          img {
            width: 100%;
          }
        }

      }
    }

    /* 设置第一个图片和最后一个图片边框圆角 */
    .memberday-buy .memberday-buy-list:first-child img {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .memberday-buy .memberday-buy-list:last-child img {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    /* 代理商专区 */
    .agent-area {
      margin: 30px 24px 0 24px;
      height: auto;
      padding-bottom: 120px;

      /* 最底部更多文字 */
      .agent-more {
        text-align: center;
      }



      .more {
        font-size: 22px;
        /* margin-right: 24px; */
      }

      /* 代理商专区/更多文字 */
      p {
        font-size: 32px;

        span {
          font-size: 24px;
        }
      }

      /* 列表图片 */
      img {
        width: 160px;
        height: 160px;
        margin: 0 10px;
      }

      .agent-area-list {
        margin: 20px 0;
        padding: 20px 0px;
        background-color: #fff;
        border: 1px solid #DEDEDE;
        border-radius: 20px;
        height: 160px;

        /* 列表标题 */
        b {
          display: block;
          font-weight: 400;
          font-size: 24px;
          color: #342f2c;
          margin-bottom: 12px;

          span {
            font-size: 32px;
            color: #ce0101;
          }
        }

        /* 超级积分文字 */
        p {
          margin-top: 30px;
          font-size: 28px;
          color: #333;
          display: inline-block;
        }

        /* 市场价文字 */
        .market-price {
          font-size: 22px;
          color: #999;
        }
      }

      /* 按钮 */
      .agent-area-btn {
        .sold-out {
          background-color: #ccc;
        }

        button {
          width: 178px;
          font-size: 30px;
          background-color: #E51C23;
          color: #fff;
          position: relative;
          top: -30px;
          right: 10px;
        }
      }
    }

    .agent-modal {
      .non-agent-img {
        width: 100%;
        top: 0;
        z-index: -1;

        img {
          display: block;
          border: 0;
          width: 100%;
        }

        .close {
          width: 50px;
          margin: 30px 30px 60px 0;
        }

        .qrcode {
          height: 200px;
          width: 165px;
          margin: -165px auto 60px auto;
        }

        .money {
          margin-top: 120px;
        }
      }

      .van-popup {
        width: 100%;
        background-color: unset;
      }

    }
  }
</style>