<template>
  <div class="product-detail">
    <div class="produce-title">
      <p>{{detail.name}}</p>
      <p>{{detail.price}}积分</p>
    </div>
    <div class="detail-img">
      <span v-html="this.detail.desc" id="detail-img"></span>
    </div>
    <div class="bottom-button">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
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
        detail: ''
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
        this.$router.push({
          name: 'Index' 
        })
      },
      buy() {
        if (this.$store.getters.token !== '') {
          this.$router.push({
            name: 'Order',
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

    p {
      margin: 10px 0 10px 15px;
    }
  }

  .detail-img {
    margin-top: 60px;
  }

</style>