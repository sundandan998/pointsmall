<template>
  <div class="agent-list">
    <div class="agent-list-img">
      <router-link to="/memberstart">
        <img v-if="memberDay.start==true" src="../../assets/images/start.png" alt="">
        <img v-if="memberDay.start==false" src="../../assets/images/agent.png" alt="">
      </router-link>
    </div>
    <div class="agent-pro-list">
      <p>商品列表</p>
      <div v-for="(item,index) in agent" class="agent-pro-list-text">
        <router-link :to="/product/+item.id">
          <div class="agent-pro-line"></div>
          <div class="agent-pro-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span>
            <p>{{item.name}}</p>
            <p class="integral"><span>{{item.price|keepTwoNum}}</span>超级积分</p>
            <span>会员价￥{{item.member_price}} | 市场价￥{{item.market_price}}</span>
          </span>
          <div class="agent-pro-list-btn fr">
            <van-button round size="small">购买></van-button>
          </div>
        </router-link>
      </div>
    </div>
    <router-link to="/">
      <div class="order-button">
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
        agent: '',
        memberDay: ''
      }
    },
    created() {
      document.title = '代理商专区'
      this.agentList()
      this.list()
    },
    methods: {
      // 商品列表
      agentList() {
        api.agent().then(res => {
          this.agent = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 是否是会员日
      list() {
        api.goods().then(res => {
          this.memberDay = res.info
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .agent-list {
    .agent-list-img {
      img {
        width: 95%;
        margin: 20px auto;
        display: block;
        border-radius: 7px;
      }
    }

    .agent-pro-list {
      p {
        margin-left: 15px;
      }

      .agent-pro-list-img {
        padding-left: 15px;

        img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
      }

      .agent-pro-line {
        border-bottom: 1px solid #f2f2f2;
        margin: 10px 0;
      }

      .agent-pro-list-text {
        height: 90px;

        span {
          font-size: 0.78rem;
        }
      }

      .integral {
        margin: 5px 0 5px 0;

        span {
          font-size: 1.0rem;
          color: #E51C23;
        }
      }

      /* span {
        font-size: 0.78rem;
      } */

      .agent-pro-list-btn {
        button {
          background-color: #E51C23;
          color: #fff;
          position: relative;
          top: -25px;
          right: 10px;
        }
      }
    }
  }
</style>