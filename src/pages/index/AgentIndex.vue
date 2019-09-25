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
      <div class="memberday-buy-list" v-for="(item,index) in goodsList" v-if="index<3">
        <router-link :to="/product/+item.id">
          <div class="memberday-buy-list-img">
            <img :src="item.default_image" alt="" class="fl">
          </div>
        </router-link>
        <div class="memberday-buy-list-text">
          <!-- <span>ytrse</span> -->
        </div>
      </div>
    </div>
    <!-- 代理商专区 -->
    <div class="agent-area">
      <p>代理商专区 <span class="fr">更多></span></p>
      <div class="agent-area-list" v-for="(item,index) in agent" v-if="index<3">
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
      </div>
      <!-- <p>更多></p> -->
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
        agent: ''
      }
    },
    created() {
      document.title = '千企国际'
      this.list()
      this.agentList()
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
          img {
            width: 90px;
            height: 80px;
            margin-right: 30px;
          }
        }

        .memberday-buy-list-text {
          /* height: 20px; */
        }
      }

    }

    .agent-area {
      margin-top: 10px;
      margin-bottom: 70px;

      p {
        padding-left: 15px;
        font-size: 0.78rem;

        span {
          margin-right: 15px;
        }

        /* border-bottom: 1px solid #f2f2f2; */
      }

      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      .agent-area-list {
        height: 90px;
        margin-left: 15px;
        margin-top: 10px;

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