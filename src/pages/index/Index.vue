<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="index-swipe">
      <van-tabs v-model="active" swipeable>
        <div v-for="(item,index) in memberList">
          <van-tab :title="item.name">
            <div class="swipe-img" v-for="(goods, index) in item.goods" :key="index">
              <img src="../../assets/images/680sign.png" alt="" class="exclusive" v-if="item.name=='680超级会员'">
              <img src="../../assets/images/1380sign.png" alt="" class="exclusive" v-if="item.name=='1380超级会员'">
              <img src="../../assets/images/2580sign.png" alt="" class="exclusive" v-if="item.name=='2580超级会员'">
              <van-radio-group :key="index" v-model="radio">
                <van-radio :name="goods.id" checked-color="#c9191d">
                  <img :src="goods.vip_image" alt="" class="commodity">
                </van-radio>
              </van-radio-group>
            </div>
          </van-tab>
        </div>
      </van-tabs>
      <!-- 底部按钮 -->
      <div class="bottom-button">
        <router-link :to="{name:'AgentIndex'}">
          <van-button square size="large" type="warning"> 返回</van-button>
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
      goodsList(index) {
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
    background-color: #f2f2f2;
  }

  .index {

    /* 改变顶部标题背景颜色 */
    .van-tabs__nav {
      background-color: #f2f2f2;
    }

    .index-swipe {
      height: auto;
      width: 100%;

      .van-tab {
        color: #333;
      }

      .van-tab--active {
        color: #c9191d;
      }

      .van-tabs__line {
        background-color: #c9191d;
      }

      .swipe-img {
        margin: 30px 24px 20px 24px;
        background-color: #fff;
        border-radius: 15px;
        text-align: center;
        position: relative;

        .commodity {
          width: 100%;
          margin: 12px auto;
        }

        .exclusive {
          position: absolute;
          top: 112px;
          right: 1px;
          z-index: 1;
        }

        /* 修改radio样式 */
        .van-radio__icon .van-icon {
          font-size: 26px;
          line-height: 26px;
          width: 26px;
          height: 26px;
          position: relative;
          left: -25px;
        }

      }

      .index-button {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
</style>