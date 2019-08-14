<template>
  <div class="newaddress">
    <div class="edit-address">
      <van-address-edit :address-info="this.AddressInfo" :area-list="areaList" show-delete show-set-default
        @save="onSave" @delete="onDelete" />
    </div>
  </div>
</template>
<script>
  import areaList from '@/assets/js/area'
  import api from '@/api/user/User.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        areaList,
        searchResult: [],
        AddressInfo: {
          id: this.$route.params.item.id,
          name: this.$route.params.item.name,
          tel: this.$route.params.item.tel,
          province: this.$route.params.item.province,
          city: this.$route.params.item.city,
          county: this.$route.params.item.county,
          addressDetail: this.$route.params.item.addressDetail,
        }
      }
    },
    created() {
      document.title = '地址详情'
    },
    methods: {
      // 保存地址
      onSave(val) {
        api.editAddress(val).then(res => {
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
      // 删除地址
      onDelete(val) {
        api.delAddress(val).then(res => {
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
      }
    }
  }
</script>
<style lang="scss">
  /* @import '../../../assets/scss/Global.scss'; */
  .edit-address {
    .van-sku-actions {
      position: absolute;
      bottom: 0px;
      width: 100%;
    }

    .save-address {
      position: fixed;
      bottom: 50px;
      border-radius: 25px;
      background-color: #09BB07;
      color: #fff;
    }

    .van-button--warning {
      color: #09BB07;
      background-color: #fff;
      border: 1px solid #09BB07;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      height: 40px;
      line-height: 40px;
    }

    .van-button--default {
      color: #fff;
      background-color: #E51C23;
      border: 1px solid #E51C23;
      border-radius: 25px;
    }

    .van-button--danger {
      color: #fff;
      background-color: #09BB07;
      border: 1px solid #09BB07;
      border-radius: 25px;
      height: 40px;
      line-height: 40px;
    }
  }
</style>