<template>
  <div class="product-detail">
    <!-- <div class="produce-title">
      <img :src="detail.default_image" alt="" class="fl">
      <span>
        <p>{{detail.name}}</p>
        <p v-if="detail.is_vip==false">{{detail.price|keepTwoNum}}积分</p>
      </span>
    </div> -->
    <div class="produce-img">
      <img :src="detail.default_image" alt="">
    </div>
    <div class="produce-title">
      <p>{{detail.name}} <span>超级会员</span></p>
      <!-- <img src="../../assets/images/equitypackage.png" alt=""> -->
      <!-- <img src="../../assets/images/equitypackage2.png" alt=""> -->
      <img src="../../assets/images/equitypackage3.png" alt="">
      <p v-if="detail.is_vip==false">{{detail.price|keepTwoNum}}积分</p>
    </div>
    <!-- <van-card :price="detail.price" :title="detail.name" origin-price="10.00" thumb="../../assets/images/680-80-2.jpg" /> -->
    <div class="detail-img">
      <span v-html="this.detail.desc" id="detail-img"></span>
    </div>
    <div class="bottom-button">
      <!-- v-on:click="$router.go(-1)" -->
      <router-link :to="{name:'Index',params:{position:this.$route.params.position}}">
        <van-button square size="large" type="warning"> 取消</van-button>
      </router-link>
      <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
    </div>
    <div class="bottom-button" v-if="detail.is_vip==false">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <!-- <router-link :to="{name:'MemberDayOrder',params:{path:'member'}}"> -->
      <van-button square size="large" type="danger" @click="memberBuy" class="buyBtn">立即购买</van-button>
      <van-button square size="large" type="default" @click="memberBuy" class="buyBtn"
        v-if="this.detail.stock == 0||this.$route.params.start==false">
        立即购买</van-button>
      <!-- </router-link> -->
    </div>
  </div>

</template>
<script>
  import api from '@/api/goods/Goods.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        detail: '',
      }
    },
    created() {
      document.title = '商品详情'
      this.detailId = this.$route.params
      this.goods()
    },
    methods: {
      // 商品详情
      goods() {
        api.goodsDetail(this.$route.params).then(res => {
          if (res.code == 0) {
            this.detail = res.data
            // console.log(this.detail)
            // if (this.detail.stock == 0) {
            // }
            for (var i = 0; i < this.singers.length; i++) {
              this.singers[i].Fsinger_mid = '//y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singers[i].Fsinger_mid + '.jpg?max_age=2592000'
            }
          }
        }).catch(err => {
        })
      },
      cancel() {
        if (this.$route.params.path == 'memberDay') {
          this.$router.push({
            name: 'MemberDayStart'
          })
        } else {
          this.$router.push({
            name: 'AgentList'
          })
        }
        // if (this.$route.params.path == 'agentList') {
        //   this.$router.push({
        //     name: 'AgentList'
        //   })
        // } else if (this.$route.params.path == 'memberDay') {
        //   this.$router.push({
        //     name: 'MemberDayStart'
        //   })
        // } else {
        //   this.$router.push({
        //     name: 'AgentIndex'
        //   })
        // }
      },
      buy(id, index) {
        if (this.$store.getters.token !== '') {
          this.$router.push({
            name: 'Order',
            params: { price: this.detail.price }
          })
        } else {
          this.$router.push({
            name: 'Register'
          })
        }
      },
      memberBuy() {
        // 判断是否是售罄商品
        if (this.detail.stock == 0) {
          Toast({
            message: '商品已经卖完啦',
            className: 'zZindex'
          })
          // 判断是否是会员日
        } else if (this.$route.params.start == false) {
          Toast({
            message: '活动尚未开始',
            className: 'zZindex'
          })
        } else {
          this.$router.push({
            name: 'MemberDayOrder',
            params: { path: 'member' }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .product-detail {
    .produce-img {
      img {
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }

    .produce-title {
      height: 120px;
      line-height: 120px;

      p {
        display: inline-block;
        font-size: 30px;
        color: #ce0101;
        font-weight: 700;

        span {
          font-size: 24px;
          color: #333;
          font-weight: 400;
        }
      }

    }
    .bottom-button {
      .van-button--default {
        color: #fff !important;
        background-color: #ccc!important;
        border: 1px solid #ccc !important;
        height: 48px !important;
        line-height: 48px !important;
        width: 50% !important;
        position: fixed !important;
        bottom: 10px !important;
        left: 50% !important;
      }
    }
  }
</style>