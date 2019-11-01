<template>
  <div class="agent-list">
    <div class="agent-list-img">
      <router-link to="/memberstart">
        <img v-if="memberDay.start==true" src="../../assets/images/start.png" alt="">
        <img v-if="memberDay.start==false" src="../../assets/images/agent.png" alt="">
      </router-link>
    </div>
    <div class="agent-pro-list">
      <p class="pro-list">商品列表</p>
      <div v-for="(item,index) in agent" class="agent-pro-list-text">
        <!-- <router-link :to="/product/+item.id"> -->
        <div @click="agentBtn(item.id,index)">
          <div class="agent-pro-list-img fl">
            <img :src="item.default_image" alt="">
          </div>
          <span class="agent-pro-list-text-introduction">
            <p>{{item.name}}</p>
            <p class="integral"><span>{{item.price|keepTwoNum}}</span> 超级积分</p>
            <span class="maeket-price">市场价￥{{item.market_price|keepTwoNum}}</span>
          </span>
          <div class="agent-pro-list-btn fr">
            <van-button round size="small" v-if="item.stock!=0">马 上 抢</van-button>
            <van-button round size="small" v-if="item.stock==0" class="sold-out">已 售 罄
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
        this.$router.push({
          name: 'Product',
          params: { id: id, path: 'agentList' }
        })
        // 判断是否是售罄商品
        // if (this.agent[index].stock == 0) {
        //   Toast({
        //     message: '商品已经卖完啦',
        //     className: 'zZindex'
        //   })
        // } else {
        //   this.$router.push({
        //     name: 'Product',
        //     params: { id: id, path: 'agentList' }
        //   })
        // }
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .agent-list {
    .agent-list-img {
      img {
        width: 100%;
        margin: 10px auto;
        display: block;
        border-radius: 20px;
      }
    }

    /* 商品列表 */
    .agent-pro-list {
      height: auto;
      background-color: #fff;
      border-radius: 20px;
      margin-bottom: 100px;
      .pro-list {
        height: 80px;
        line-height: 80px;
        margin-left: 24px;
        font-size: 32px;
        color: #333;
      }

      /* 商品列表文字 */
      .agent-pro-list-text {
        margin: 0 24px 10px 24px;
        border: 1px solid #eaeaea;
        border-radius: 20px;
        height: 290px;

        .agent-pro-list-text-introduction {
          font-size: 28px;
          margin-top: 30px;
          display: inline-block;

          p {
            overflow: hidden;
            white-space: nowrap;
            width: 400px;
            text-overflow: ellipsis;
          }

          /* 超级积分 */
          .integral {
            margin: 30px 0;
            font-size: 24px;

            span {
              font-size: 32px;
              color: #ce0101;
            }
          }

          /* 市场价 */
          .maeket-price {
            font-size: 22px;
            color: #999;
          }
        }

        img {
          width: 290px;
          height: 290px;
          margin-right: 10px;
        }
      }

      /* 显示剩余件数 */
      .remaining {
        color: #E51C23;
        background-color: #FFF0D9;
        padding: 2px 7px;
        position: relative;
        top: -50px;
        right: -45px;
      }

      /* 按钮 */
      .agent-pro-list-btn {
        .sold-out {
          background-color: #ccc;
        }

        button {
          background-color: #ca1b1e;
          color: #fff;
          position: relative;
          top: 0px;
          right: 10px;
        }
      }
    }
  }
</style>