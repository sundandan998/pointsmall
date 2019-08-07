<template>
  <div class="address">
    <div class="address-list">
      <!-- <van-address-list :list="list" /> -->
    </div>
    <div>
     
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ],
      }
    },
    created() {
      document.title = '收货地址'
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .van-button--danger {
    background-color: #09BB07;
    border: 1px solid #09BB07;
  }
</style>