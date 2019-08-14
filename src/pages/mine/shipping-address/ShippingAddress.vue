<template>
  <div class="address" >
    <van-address-list :list="list" @edit="onEdit" @add="onAdd" @select="selectAddress" />
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      document.title = '收货地址'
      this.address()
      console.log(this.$route.params.id)
    },
    methods: {
      // 地址列表
      address() {
        api.address().then(res => {
          this.list = res.data
        }).catch(err => {

        })
      },
      onEdit(item, index) {
        this.$router.push({
          name: 'AddressDetail',
          params: { index: index, item: item }
        })
      },
      onAdd(item, index) {
        this.$router.push({
          name: 'NewAddress'
        })
      },
      selectAddress(item,index){
        this.$router.push({
          name: 'Order',
          params: {index: index, item: item,id:this.$route.params.id}
        })
      }
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .address {
    .van-address-item .van-radio__icon {
      display: none;
    }

    .van-button--danger {
      border-radius: 25px;
    }
  }
</style>