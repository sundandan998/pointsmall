<template>
  <div class="product-detail">
    <div class="produce-title">
      <img :src="detail.default_image" alt="" class="fl">
      <span>
        <p>{{detail.name}}</p>
        <p v-if="detail.is_vip==false">{{detail.price|keepTwoNum}}积分 <span class="delete-line">市场价
            ￥{{detail.market_price}}</span></p>
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
      <router-link :to="{name:'MemberDayOrder'}">
        <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
      </router-link>
    </div>
  </div>

</template>
<script>
  import api from '@/api/goods/Goods.js'
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
            for (var i = 0; i < this.singers.length; i++) {
              this.singers[i].Fsinger_mid = '//y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singers[i].Fsinger_mid + '.jpg?max_age=2592000'
            }
          }
        }).catch(err => {
        })
      },
      cancel() {
        if (this.$route.params.path == 'member') {
          this.$router.push({
            name: 'MemberDayStart'
          })
        } else if (this.$route.params.path == 'agentList') {
          this.$router.push({
            name: 'AgentList'
          })
        } else {
          this.$router.push({
            name: 'AgentIndex'
          })
        }

      },
      buy() {
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
      width: 80px;
      height: 80px;
      display: inline-block;
      margin: 10px;
    }

    span {
      margin: 10px 0 10px 15px;
      font-size: 0.78rem;
      line-height: 20px;
    }

    .delete-line {
      text-decoration: line-through;
      color: #ccc;
      font-size: 0.76rem;
      margin-left: 5px;
    }
  }

  .detail-img {
    margin-top: 60px;

    img {
      margin-top: 30px;
    }
  }
</style>