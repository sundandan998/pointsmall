<template>
  <div class="newaddress">
    <div class="edit-address">
      <van-address-edit :address-info="this.AddressInfo" :area-list="areaList" show-delete show-set-default
        @save="onSave" @delete="onDelete" />
    </div>
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id}}">
      <div>
        <van-button square size="large" type="warning">返回</van-button>
      </div>
    </router-link>
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
          isDefault: this.$route.params.item.isDefault,
        },
      }
    },
    created() {
      document.title = '地址详情'
    },
    mounted() {
      // this.areaList()
    },
    methods: {
      // 保存地址
      onSave(val) {
        api.editAddress(val).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'ShippingAddress',
              params: { id: this.$route.params.id }
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
  @import '../../../assets/scss/Global.scss';
  .newaddress {
    .van-button--warning {
      border-radius: 25px !important;
      width: 90% !important;
      display: block !important;
      margin: 0 auto !important;
    }
  }

  .edit-address {
    .van-button--default {
      color: #fff !important;
      background-color: #E51C23 !important;
      border: 1px solid #E51C23 !important;
      border-radius: 25px !important;
    }

    .van-button--danger {
      border-radius: 25px !important;
    }
  }
</style>