<template>
  <div class="address">
    <div class="address-list" v-for="item in addressData">
      <div class="address-content fl">
        <p>{{item.receiver}} {{item.mobile}}</p>
        <p>{{item.province}}{{item.city}}{{item.district}}{{item.address}}</p>
      </div>
      <div class="line"></div>
      <div class="address-edit fr">
        <img src="../../../assets/images/edit.svg" alt="">
      </div>
    </div>
    <!-- 按钮部分 -->
    <div class="van-sku-actions">
      <van-button square size="large" type="warning" @click="cancel"> 返回</van-button>
      <van-button square size="large" type="danger" @click="newAddress">新建地址</van-button>
    </div>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        addressData: [],
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
          this.addressData = res.data
        }).catch(err => {

        })
      },
      cancel() {
        this.$router.push({
          name: 'Mine'
        })
      },
      // // 新建地址
      newAddress() {
        this.$router.push({
          name: 'NewAddress'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .address-list {
    height: 50px;
    padding: 10px 15px 5px 15px;
    border-bottom: 2px solid #f2f2f2;

    .line {
      width: 1px;
      height: 30px;
      position: absolute;
      right: 60px;
      background-color: #ccc;
    }
  }
</style>