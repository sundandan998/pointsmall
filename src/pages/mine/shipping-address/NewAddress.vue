<template>
  <div class="newaddress">
    <div>
      <van-address-edit :area-list="areaList" show-set-default show-search-result @save="onSave"/>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import areaList from '@/assets/js/area'
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
  .van-address-edit__buttons {
    padding: 0px 0px;
  }

  .van-button--block {
    width: 100%;
    /* display: block; */
    position: fixed;
    bottom: 0px;
  }
  .van-button--danger{
    color: #fff;
    background-color: #09BB07;
    border: 1px solid #09BB07;
    border-radius: 25px;
    height: 40px;
    line-height: 40px;
  }
  /* @import '../../../assets/scss/Global.scss'; */
  /* .van-sku-actions {
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
  .van-address-edit__buttons {
    position: fixed;
    bottom: 0px;
    width: 90%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.van-button--default {
  color: #09BB07;
    background-color: #fff;
    border: 1px solid #09BB07;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    height: 40px;
    line-height: 40px;
}
  .van-button--danger {
    color: #fff;
    background-color: #09BB07;
    border: 1px solid #09BB07;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    height: 40px;
    line-height: 40px;
  }  */

  /* .van-address-edit__buttons {
    padding: 30px 15px;
    display: none;
  } */
</style>