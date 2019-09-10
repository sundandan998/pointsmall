<template>
  <div class="product-detail">
    <div class="produce-title">
      <img :src="detail.default_image" alt="" class="fl">
      <span>
        <p>{{detail.name}}</p>
        <!-- <span class="delete-line">120积分</span> -->
        <!-- <p>￥{{detail.price}} </p> -->
      </span>
    </div>
    <!-- <van-card :price="detail.price" :title="detail.name" origin-price="10.00" thumb="../../assets/images/680-80-2.jpg" /> -->
    <div class="detail-img">
      <span v-html="this.detail.desc" id="detail-img"></span>
    </div>
    <div class="bottom-button">
      <!-- @click="cancel" -->
      <router-link :to="{name:'Index',params:{index:this.$route.params.index}}">
        <!-- <router-link :to="///+index"> -->
        <van-button square size="large" type="warning"> 取消</van-button>
      </router-link>
      <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
    </div>
    <!-- <van-goods-action>
      <van-goods-action-button type="warning" text="加入购物车"  />
      <van-goods-action-button type="danger" text="立即购买"  />
    </van-goods-action> -->
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
      // cancel() {
      //   this.$router.push({
      //     name: 'Index',
      //     params:{index:this.$route.params.index}
      //   })
      // },
      buy() {
        if (this.$store.getters.token !== '') {
          this.$router.push({
            name: 'Order',
            params: { price: this.detail.price, }
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