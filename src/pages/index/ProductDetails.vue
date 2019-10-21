<template>
  <div class="product-detail">
    <div class="produce-title">
      <img :src="detail.default_image" alt="" class="fl">
      <span>
        <p>{{detail.name}}</p>
        <p v-if="detail.is_vip==false">{{detail.price|keepTwoNum}}积分</p>
      </span>
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
      console.log()
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


  .produce-title {
    position: fixed;
    top: 0px;
    background-color: #fff;
    width: 100%;

    img {
      width: 160px;
      height: 160px;
      display: inline-block;
      margin: 10px;
    }

    span {
      margin: 10px 0 10px 15px;
      font-size: 0.078rem;
      line-height: 20px;
    }

    .delete-line {
      text-decoration: line-through;
      color: #ccc;
      font-size: 0.076rem;
      margin-left: 5px;
    }
  }

  .detail-img {
    margin-top: 60px;

    img {
      margin-top: 30px;
    }
  }

  .bottom-button {
    .van-button--default {
      color: #fff !important;
      background-color: #ccc !important;
      border: 1px solid #ccc !important;
      border-top-right-radius: 25px !important;
      border-bottom-right-radius: 25px !important;
      height: 40px !important;
      line-height: 40px !important;
      width: 48% !important;
      position: fixed !important;
      bottom: 10px !important;
      left: 50% !important;
    }
  }
</style>