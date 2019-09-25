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
      <p>千企会员</p>
      <div class="agent-member-img">
        <van-row>
          <router-link to="/index">
            <van-col span="8"><img src="../../assets/images/680.png" alt=""></van-col>
            <van-col span="8"><img src="../../assets/images/1380.png" alt=""></van-col>
            <van-col span="8"><img src="../../assets/images/2580.png" alt=""></van-col>
          </router-link>
        </van-row>
      </div>
    </div>
    <!-- 会员日特卖 -->
    <div class="memberday-buy">
      <router-link to="memberstart">
        <p>会员日特卖 <span></span> <span class="fr">更多></span></p>
      </router-link>
      <div class="memberday-buy-list fl " v-for="(item,index) in goodsList" v-if="index<3">
        <!-- <div @click="memberBuy(item.id)"> -->
        <router-link :to="/product/+item.id">
          <div class="memberday-buy-list-img">
            <img :src="item.default_image" alt="">
          </div>
        </router-link>
        <div class="memberday-buy-list-text">
          <span class="memberday-buy-price"><b>{{item.price|keepTwoNum}}</b>超级积分</span>
          <span class="memberday-buy-market">市场价￥{{item.market_price}}</span>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- 代理商专区 -->
    <div class="agent-area">
      <p>代理商专区 <span class="fr" @click="more">更多></span></p>
      <div class="agent-area-list" v-for="(item,index) in agent" v-if="index<3">
        <!-- <div @click="buy(item.id)"> -->
        <router-link :to="/product/+item.id">
          <div class="member-day-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span>
            <p>{{item.name}}</p>
            <p class="integral"><span>{{item.price|keepTwoNum}}</span>超级积分</p>
            <span>市场价￥{{item.market_price}}</span>
          </span>
          <div class="agent-area-btn fr">
            <van-button round size="small">购买></van-button>
          </div>
        </router-link>
        <!-- </div> -->
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
        info: ''
      }
    },
    created() {
      document.title = '千企国际'
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
      }

      .agent-member-img {
        margin-top: 10px;
        border-top: 1px solid #f2f2f2;

        img {
          width: 70%;
          display: block;
          margin: 10px auto;
        }
      }
    }

    .memberday-buy {
      height: 170px;

      p {
        padding-left: 15px;
        padding-bottom: 10px;
        font-size: 0.78rem;
        border-bottom: 1px solid #f2f2f2;

        span {
          margin-right: 15px;
        }
      }

      .memberday-buy-list {
        margin-left: 15px;
        margin-top: 15px;

        .memberday-buy-list-img {
          float: left;

          img {
            width: 90px;
            height: 80px;
            margin-right: 20px;
          }
        }

        .memberday-buy-list-text {
          span {
            display: block;
            font-size: 0.70rem;
          }
          .memberday-buy-price{
            color:#E51C23;
          }
          .memberday-buy-market{
            text-decoration:line-through;
            /* color:#ccc; */
          }
          b{
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
          margin-right: 15px;
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