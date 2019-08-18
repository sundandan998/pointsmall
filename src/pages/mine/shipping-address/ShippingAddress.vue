<template>
  <div class="address">
    <van-address-list :list="list" @edit="onEdit" @add="onAdd" @select="selectAddress" />
    <router-link to="/mine">
      <div class="address-btn">
        <van-button square size="large" type="warning">返回</van-button>
      </div>
    </router-link>
   
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
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        window.sessionStorage.setItem('refpath', from.path)
      })
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
          params: { index: index, item: item, id: this.$route.params.id }
        })
      },
      onAdd(item, index) {
        this.$router.push({
          name: 'NewAddress',
          params: { index: index, item: item, id: this.$route.params.id }

        })
      },
      selectAddress(item, index) {
        // 判断来的路径，如果是从我的页面跳转过来，点击空白不跳转
        // 如果是在填写订单页面跳转过来，跳回到填写订单页面
        let refpath = window.sessionStorage.getItem('refpath')
        if (refpath == '/mine'||refpath == '/addressdetail') {
          this.$router.push({
            name: 'ShippingAddress',
            params: { index: index, item: item, id: this.$route.params.id }
          })
        } else {
          this.$router.push({
            name: 'Order',
            params: { index: index, item: item, }
          })
        }
      }
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .van-address-list__add {
    left: unset !important;

  }

  .address {
    .van-address-item .van-radio__icon {
      display: none !important;
    }

    .van-address-list__add {
      position: fixed;
      right: 0px !important;
      bottom: 0 !important;
      z-index: 9999 !important;
      width: 50% !important;
      border-top-right-radius: 25px !important;
      border-bottom-right-radius: 25px !important;
      left: 50% !important;
    }
    .van-button--warning {
      color: #09BB07 !important;
      background-color: #fff !important;
      border: 1px solid #09BB07 !important;
      height: 40px !important;
      line-height: 40px !important;
      position: fixed !important;
      bottom: 0 !important;
      width: 50% !important; 
    }
  }
</style>