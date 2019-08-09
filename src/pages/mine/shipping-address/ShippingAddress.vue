<template>
  <div class="address">
    <van-address-list :list="list" @edit="onEdit" @add="onAdd" />
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: [

        ]
      }
    },
    created() {
      document.title = '收货地址'
      this.address()
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
          params:{index:index,item:item}
        })
      },
      onAdd() {
        this.$router.push({
          name: 'NewAddress'
        })
      },
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .van-address-item .van-radio__icon {
    display: none;
  }

  .van-button--danger {
    border-radius: 25px;
  }
</style>