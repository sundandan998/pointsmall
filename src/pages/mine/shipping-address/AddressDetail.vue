<template>
  <div class="address-detail">
    <div class="edit-address">
      <van-address-edit :address-info="AddressInfo" :area-list="areaList" @delete="onDelete" show-delete id="text"
        show-set-default @save="onSave" delete-button-text="删除该收获地址" />
      <img src="../../../assets/images/del.svg" alt="">
    </div>
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
              params: { id: this.$route.params.id, path: this.$route.params.path }
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

    .edit-address {
      margin: 10px 24px;

      .van-cell {
        margin-bottom: 10px;
        border-radius: 20px;
      }

      .van-cell__value--alone {
        height: 44px;
      }

      .van-button--default {
        border-radius: 20px;

        .van-button__text {
          color: #c9191d;
        }
      }

      .van-address-edit__buttons {
        padding: 0;
      }

      img {
        position: relative;
        top: -60px;
        left: 200px;
        color:#c9191d;
      }
    }

  }
</style>