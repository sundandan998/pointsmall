<template>
  <div class="product-detail">
    <div class="van-sku-actions">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <van-button square size="large" type="danger" @click="buy">立即购买</van-button>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
      }
    },
    created() {
      document.title = '商品详情'
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'Index'
        })
      },
      buy() {
        this.$router.push({
          name: 'Index'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
</style>