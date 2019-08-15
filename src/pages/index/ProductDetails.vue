<template>
  <div class="product-detail">
    <div class="produce-title">
      <p>{{detail.name}}</p>
      <p>{{detail.price}}积分</p>
    </div>
    <div class="detail-img">
      <span v-html="this.detail.desc" id="detail-img"></span>
    </div>
    <div class="van-sku-actions">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
    </div>
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
    mounted() {

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
<!-- <script>
detail_img = function(){
  
        let detailImg = document.getElementsByTagName('img')
        // let img = document.getElementsByName('img')
        // console.log(img)
        console.log(detailImg)
        for (var i = 0; i <= detailImg.length; i++) {
          // debugger
          detailImg[i].src = 'http://111.230.221.200:10001' + detailImg[i].src
        }
}

</script> -->
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .produce-title {
    p {
      margin: 10px 0 10px 15px;
    }
  }
</style>