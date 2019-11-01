<template>
  <div class="address-detail">
    <div class="edit-address">
      <van-address-edit :address-info="AddressInfo" :area-list="areaList" @delete="onDelete" show-delete id="text" show-set-default
        @save="onSave"/>
    </div>
    <!-- <mt-cell title="删除该收获地址" @delete.native="onDelete" show-delete id="text"></mt-cell> -->
    <router-link :to="{name:'ShippingAddress',params:{id:this.$route.params.id}}">
      <div>
        <van-button square size="large" type="warning">取消</van-button>
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
    methods: {
      // 保存地址
      onSave(val) {
        api.editAddress(val).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'ShippingAddress',
              params: { id: this.$route.params.id,path:this.$route.params.path }
            })
            Toast({
              message: res.msg,
              position: 'top',
              className: 'zZindex',
              iconClass: '../../../assets/images/ok.png'
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
              className: 'zZindex',
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
<style lang="scss">
  @import '../../../assets/scss/Global.scss';
  .address-detail {
    .van-button--warning {
      width: 50%;
    }
    .van-address-edit__buttons .van-button {
      margin-bottom: 0px !important;
    }
    .van-button--warning {
      color: #09BB07 !important;
      background-color: #fff !important;
      border: 1px solid #09BB07 !important;
      border-top-left-radius: 25px !important;
      border-bottom-left-radius: 25px !important;
      height: 40px !important;
      line-height: 40px !important;
      width: 50% !important;
      bottom: 0px !important;
      position: fixed !important;
    }
    .edit-address {
      .van-button--default {
        color: #fff !important;
        background-color: #E51C23 !important;
        border: 1px solid #E51C23 !important;
        width: 50% !important;
        position: fixed !important;
        left: 50% !important;
        bottom: 0px !important;
        height: 40px !important;
        border-top-right-radius: 25px !important;
        border-bottom-right-radius: 25px !important;
      }

      .van-button--danger {
        color: #fff !important;
        background-color: #09BB07 !important;
        height: 40px !important;
        line-height: 40px !important;
        width: 100% !important;
        position: fixed !important;
        margin: 0 auto !important;
        bottom: 70px !important;
        border-radius: 25px !important;
        left: 0 !important;
      }
    }
  }
</style>