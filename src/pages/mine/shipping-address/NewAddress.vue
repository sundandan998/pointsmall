<template>
  <div class="newaddress">
    <div>
      <van-address-edit :area-list="areaList" show-set-default show-search-result @save="onSave" />
    </div>
    <router-link to="/address">
      <div class="address-btn">
        <van-button square size="large" type="info">返回</van-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  import areaList from '@/assets/js/area.js'
  import { Toast } from 'mint-ui'
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        areaList,
        searchResult: [],
      }
    },
    created() {
      document.title = '新建地址'
    },
    methods: {
      // 增加地址
      onSave(val) {
        api.addAddress(val).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'ShippingAddress'
            })
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        }).catch(err => {
          if (err.code != 0) {
            Toast({
              message: err.msg,
              position: 'top',
              className: 'zZindex'
            })
          }
        })
      },
    }
  }
</script>
<style>
  @import '../../../assets/scss/Global.scss';

  .van-address-edit__buttons .van-button {
    margin-bottom: 0 !important;
  }

  .van-button--info {
    background-color: #fff !important;
    color: #4ECD4D !important;
    border: 1px solid #4ECD4D !important;
    position: fixed !important;
    bottom: 0px !important;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    width: 50%!important;
    height: 40px !important;
    line-height: 40px !important;
  }
  .van-button--danger {
      color: #fff !important;
      background-color: #09BB07 !important;
      border: 1px solid #09BB07 !important;
      border-top-right-radius: 25px !important;
      border-bottom-right-radius: 25px !important;
      height: 40px !important;
      line-height: 40px !important;
      width: 50% !important;
      position: fixed !important;
      left: 50% !important;
      bottom: 0px !important;
    }
</style>