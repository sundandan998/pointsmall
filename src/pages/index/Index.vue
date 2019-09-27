<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="index-swipe">
      <!-- <van-radio-group v-model="radio"> -->
      <van-swipe class="swipe" :initial-swipe=this.$route.params.position>
        <van-swipe-item>
          <div class="index-start">
            <div class="index-logo">
              <img src="../../assets/images/logo.png" alt="">
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item v-for="(item,index) in memberList" :key="index">
          <div class="swipe-title">
            <p>{{item.name}}</p>
          </div>
          <div class="swipe-img" v-for="(goods, index) in item.goods">
            <van-radio-group v-model="radio" :key="index">
              <van-radio :name="goods.id" checked-color="#09BB07">
                <img :src="goods.vip_image" alt="">
              </van-radio>
            </van-radio-group>
          </div>
          <!-- 底部按钮 -->
          <router-link :to="{name:'Product',params:{id:radio,position:index+1}}">
            <div class="index-button">
              <mt-button type="danger">￥{{item.name|number}} 立即抢购 </mt-button>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- </van-radio-group> -->
      <!-- <img src="../../assets/images/l.svg" alt="" class=" fl swipe-arrow-left"> -->
      <!-- <img src="../../assets/images/r.svg" alt="" class=" fr swipe-arrow-right" @click="next"> -->
    </div>
    <!-- 底部tabber -->
    <router-link to="/">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
    <!-- <div>
      <tabber :message="selected"></tabber>
    </div> -->
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
        selected: 'index',
        message: 'index',
        radio: '',
        memberList: '',
        current: '',
      }
    },
    created() {
      document.title = '首页'
      this.goodsList()
      // swipeTo(this.$route.params.index)
      console.log(this.$route.params.index)
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
          this.radio = (this.memberList[0].goods[0].id)
        }).catch(err => {
          console.log(err)
        })
      },
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
    background-color: #f2f2f2;
    overflow: hidden;
    border-radius: 5px;

    .index-swipe {
      height: auto;
      width: 90%;
      background-color: #fff;
      margin: 10px auto;

      /* .swipe {
          height: 500px;
        } */

      .swipe-arrow-right {
        width: 18px;
        position: relative;
        top: -260px;
        right: -20px;
      }

      .swipe-arrow-left {
        width: 18px;
        position: relative;
        top: -260px;
        left: -20px;
      }

      .van-swipe__indicators {
        position: absolute;
        top: 10px;
      }

      .van-swipe__indicator {
        background-color: #1989FA;
      }

      .swipe-title {
        margin: 20px auto 0 auto;
        color: #FF7177;
        text-align: center;
      }

      .swipe-img {
        text-align: center;

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
        background: url('../../assets/images/bg.png')no-repeat;
        height: 550px;
        width: 100%;
        overflow: hidden;
        background-size: 100% 100%;
        background-attachment: fixed;

        .index-logo {
          margin: 50px auto;
          display: table;
        }
      }
    }
  }
</style>