<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="index-swipe">
      <!-- <van-radio-group v-model="radio"> -->
      <van-swipe class="swipe">
        <van-swipe-item>
          <div class="index-start">
            <div class="index-logo">
              <img src="../../assets/images/logo.png" alt="" >
            </div>
          </div>
        </van-swipe-item>
        <div v-for="(item,index) in memberList">
          <van-swipe-item>
            <div class="swipe-title">
              <p>{{item.name}}</p>
            </div>
            <van-radio-group v-model="radio">
              <div class="swipe-img" v-for="(goods,index) in item.goods">
                <van-radio :name="goods.id" checked-color="#09BB07">
                  <img :src="goods.vip_image" alt="" v-lazy="goods.vip_image">
                </van-radio>
              </div>
            </van-radio-group>
            <!-- 底部按钮 -->
            <!-- <router-link :to="/product/+radio"> -->
            <router-link :to="{name:'Product',params:{id:radio,index:index}}">
              <div class="index-button">
                <mt-button type="danger">￥{{item.name|number}} 立即抢购 </mt-button>
              </div>
            </router-link>
          </van-swipe-item>
        </div>
      </van-swipe>
      <img src="../../assets/images/l.svg" alt="" class=" fl swipe-arrow-left" >
      <img src="../../assets/images/r.svg" alt="" class=" fr swipe-arrow-right" @click="next">
    </div>
    <!-- 底部tabber -->
    <div>
      <tabber :message="selected"></tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
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
      }
    },
    created() {
      this.goodsList()
      this.openId()
    },
    components: {
      Tabber,
    },
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
          this.index = this.$route.params.index
        }).catch(err => {
          console.log(err)
        })
      },
      // 下一步
      next(){
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
      .swipe{
        height: 500px;
      }
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

      img {
        width: 242px;
        height: 100%;
      }

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

      .index-start {
        background: url('../../assets/images/bg.png')no-repeat;
        height: 510px;
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