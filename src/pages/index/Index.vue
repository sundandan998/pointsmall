<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="index-swipe">
      <van-tabs v-model="active" swipeable>
        <div v-for="(item,index) in memberList">
          <van-tab :title="item.name">
            <div class="swipe-img" v-for="(goods, index) in item.goods" :key="index">
              <van-radio-group :key="index" v-model="radio">
                <van-radio :name="goods.id" checked-color="#09BB07">
                  <img :src="goods.vip_image" alt="">
                </van-radio>
              </van-radio-group>
            </div>
          </van-tab>
        </div>
      </van-tabs>
      <!-- 底部按钮 -->
      <div class="bottom-button">
        <router-link :to="{name:'AgentIndex'}">
          <van-button square size="large" type="warning"> 取消</van-button>
        </router-link>
        <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  // import Tabber from '../../assets/tabber/Tabber.vue'
  // 接口请求
  import api from '@/api/user/User.js'
  // import api from '@/api/goods/Goods.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        active: this.$route.params.position,
        // selected: 'index',
        // message: 'index',
        radio: '',
        memberList: '',
        current: '',
      }
    },
    created() {
      document.title = '首页'
      this.goodsList()
    },
    // components: {
    //   Tabber,
    // },
    // 过滤按钮部分文字
    filters: {
      number(value) {
        return value.replace(/[\u4e00-\u9fa5]/g, '')
      }
    },
    methods: {
      // 商品列表
      goodsList() {
        api.goodsList().then(res => {
          this.memberList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      buy() {
        if (this.radio == '') {
          Toast({
            message: '请先选择商品',
            className: 'zZindex'
          })
        } else {
          this.$router.push({
            name: 'Product',
            // , position: this.index + 1 
            params: { id: this.radio, position: this.$route.params.position }
          })
        }
      }
    },
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  body {
    height: 100%;
  }

  .index {
    height: auto;
    width: 100%;
    overflow: hidden;
    border-radius: 5px;

    p {
      margin: 20px 0 20px 15px;
    }

    .index-swipe {
      height: auto;
      width: 90%;
      background-color: #fff;
      margin: 10px auto;

      .van-tab--active {
        font-weight: 500;
        color: #09BB07;
      }

      .van-tabs__line {
        background-color: #09BB07;
      }

      .swipe-img {
        text-align: center;
        margin-top: 20px;
        /* padding-left: 30px; */

        img {
          width: 242px;
          margin: 5px 0;
        }


      }

      .index-button {
        margin-top: 20px;
        text-align: center;
      }

      .index-start {
        /* background: url('../../assets/images/bg.png')no-repeat; */
        height: 550px;
        width: 100%;
        overflow: hidden;
        background-size: 100% 100%;
        background-attachment: fixed;

        .index-logo {
          /* margin: 0px auto;
          display: table; */
          width: 100%;
          height: 100%;
          top: 0;
          z-index: -1;
          position: absolute;

          img {
            display: block;
            outline: none;
            border: 0;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>