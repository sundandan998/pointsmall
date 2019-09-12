<template>
  <div class="token-list">
    <div class="list" v-for="(item,index) in orderData.vip_info">
      <mt-radio v-model="value" :options="[item.amount+item.token]" @click.native="token(item)">
      </mt-radio>
      <!-- <span>{{item.amount}}{{item.token}}</span> -->
    </div>
  </div>
</template>
<script>
  import api from '@/api/goods/Goods.js'
  export default {
    data() {
      return {
        orderData: {},
        value:'',
      }
    },
    created() {
      this.order()
    },
    methods: {
      // 商品信息
      order() {
        api.orderDetail(this.$route.params).then(res => {
          this.orderData = res.data.sku
        }).catch(err => {
        })
      },
      token(item) {
        // debugger
        this.$router.push({
          name: 'Order',
          params: {item:item,url:'tokenlist',price:this.$route.params.price}
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";
</style>