<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="index-swipe">
      <van-radio-group v-model="radio">
        <van-swipe>
          <van-swipe-item class="one">
            <div class="swipe-title">
              <p>千企国际联盟商城</p>
            </div>
            <div class="one-introduction">
              <p><span>精选商品</span><span>价格超低</span></p>
              <p><span>会员专享</span><span>坐等收益</span></p>
              <div class="one-token">
                <p>免费赠送生态通证</p>
              </div>
            </div>
          </van-swipe-item>
          <div v-for="item in memberList">
            <van-swipe-item>
              <div class="swipe-title">
                <p>{{item.name}}</p>
              </div>
              <!-- <p class="swipe-img" v-for=" goods in item.goods">
                <van-radio :name="goods.id" :radio="goods.id" checked-color="#09BB07">
                  <img :src="goods.vip_image" alt="">
                </van-radio>
              </p> -->
              <div class="swipe-img" v-for="goods in item.goods">
                <van-radio-group v-model="radio">
                  <van-radio :name="goods.id" :radio="goods.id" checked-color="#09BB07">
                    <img :src="goods.vip_image" alt="">
                  </van-radio>
                </van-radio-group>
              </div>
              <!-- 底部按钮 -->
              <router-link :to="/product/+radio">
                <!-- <router-link :to="{name:'Product',id:this.goods.id}"> -->
                <div class="index-button">
                  <mt-button type="danger">￥ 立即抢购 </mt-button>
                </div>
              </router-link>
            </van-swipe-item>
          </div>
        </van-swipe>
      </van-radio-group>
    </div>
    <!-- 底部tabber -->
    <div>
      <tabber :message="selected"></tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  import api from '@/api/goods/Goods.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        selected: 'index',
        message: 'index',
        radio: '',
        memberList: '',
      }
    },
    created() {
      this.goodsList()
    },
    components: {
      Tabber,
    },
    methods: {
      goodsList() {
        api.goodsList().then(res => {
          this.memberList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .index {
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
    border-radius: 5px;

    .index-swipe {
      height: 100%;
      width: 90%;
      background-color: #fff;
      margin: 10px auto;

      .van-swipe__indicators {
        display: none;
      }

      .swipe-title {
        margin: 20px auto;
        color: #FF7177;
        text-align: center;
      }

      .swipe-img {
        text-align: center;
      }

      .index-button {
        margin: 20px 0;
        text-align: center;
      }
    }

    .one {
      p {
        text-align: center;
      }

      .one-introduction {
        span {
          font-size: 0.76rem;
          margin: 0 10px 0px 10px;
        }
      }

      .one-token {
        p {
          margin-top: 15px;
          margin-bottom: 10px;
          font-size: 0.78rem;
        }
      }
    }
  }
</style>