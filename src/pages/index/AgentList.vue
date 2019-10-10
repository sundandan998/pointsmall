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
        <!-- <router-link :to="/product/+item.id"> -->
        <div @click="agentBtn(item.id,index)">
          <div class="agent-pro-line"></div>
          <div class="agent-pro-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span>
            <p>{{item.name}}</p>
            <p class="integral"><span>{{item.price|keepTwoNum}}</span>超级积分</p>
            <span>市场价￥{{item.market_price|keepTwoNum}}</span>
          </span>
          <div class="agent-pro-list-btn fr">
            <van-button round size="small" v-if="item.stock!=0">马上抢</van-button>
            <van-button round size="small" v-if="item.stock==0" class="sold-out">已售罄
            </van-button>
          </div>
        </div>
        <div v-if="item.stock<=10&&item.stock!=0">
          <span class="remaining fr">剩余{{item.stock}}件</span>
        </div>
        <!-- </div> -->
        <!-- </router-link> -->
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
  import { Toast } from 'mint-ui'
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
      // 购买
      agentBtn(id, index) {
        // 判断是否是售罄商品
        if (this.agent[index].stock == 0) {
          Toast({
            message: '商品已经卖完啦',
            className: 'zZindex'
          })
        } else {
          this.$router.push({
            name: 'Product',
            params: { id: id, path: 'agentList' }
          })
        }
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
          font-size: 0.078rem;
        }
      }

      .integral {
        margin: 5px 0 5px 0;

        span {
          font-size: 0.1rem;
          color: #E51C23;
        }
      }

      /* span {
        font-size: 0.78rem;
      } */
      .remaining {
        color: #E51C23;
        background-color: #FFF0D9;
        padding: 2px 7px;
        position: relative;
        top: -50px;
        right: -45px;
      }

      .agent-pro-list-btn {
        .sold-out {
          background-color: #ccc;
        }

        button {
          background-color: #E51C23;
          color: #fff;
          position: relative;
          top: 0px;
          right: 10px;
        }
      }
    }
  }
</style>