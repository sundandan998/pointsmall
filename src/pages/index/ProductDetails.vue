<template>


  <div class="product-detail">

    <p>{{detail.name}}</p>
    <p>{{detail.price}}积分</p>
    <div class="detail-img">
      <iframe src="http://111.230.221.200:10001" frameborder="0">
        <span v-html="this.detail.desc"></span>
      </iframe>
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
        this.$router.push({
          name: 'Order',
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
</style>