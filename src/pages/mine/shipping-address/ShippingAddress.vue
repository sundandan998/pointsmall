<template>
  <div class="address">
    <div class="address-list">
      <van-address-list :list="list" @edit="onEdit" @add="onAdd" @select="selectAddress">
        <!-- <img src="../../../assets/images/member.png" alt=""> -->
        <img src="../../../assets/images/address.png" alt="">
      </van-address-list>
    </div>

    <div class="address-btn">
      <van-button square size="large" type="warning" @click="back">返回</van-button>
    </div>
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
          params: { index: index, item: item, id: this.$route.params.id, path: this.$route.params.path }
        })
      },
      onAdd(item, index) {
        this.$router.push({
          name: 'NewAddress',
          params: { index: index, item: item, id: this.$route.params.id, path: this.$route.params.path }

        })
      },
      selectAddress(item, index) {
        // 判断来的路径，如果是从我的页面跳转过来，点击空白不跳转
        // 如果是在填写订单页面跳转过来，跳回到填写订单页面
        let refpath = window.sessionStorage.getItem('refpath')
        if (refpath == '/mine') {
          this.$router.push({
            name: 'ShippingAddress',
            params: { index: index, item: item, id: this.$route.params.id }
          })
        } else if (this.$route.params.path == 'is_vip') {
          this.$router.push({
            name: 'Order',
            params: { index: index, item: item, id: this.$route.params.id }
          })
        } else if (this.$route.params.path == 'memberday') {
          this.$router.push({
            name: 'MemberDayOrder',
            params: { index: index, item: item }
          })
        }
      },
      back(item, index) {
        let refpath = window.sessionStorage.getItem('refpath')
        if (this.$route.params.path == 'is_vip') {
          this.$router.push({
            name: 'Order',
            params: { id: this.$route.params.id, item: item, }
          })
        } else if (this.$route.params.path == 'memberday') {
          this.$router.push({
            name: 'MemberDayOrder',
            params: { id: this.$route.params.id, item: item }
          })
        } else if (refpath == '/newaddress' || refpath == '/mine' || refpath == '/addressdetail') {
          this.$router.push({
            name: 'Mine',
            params: { id: this.$route.params.id }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .address {
    .van-address-item .van-radio__icon {
      display: none !important;
    }

    .address-list {
      position: relative;

      img {
        position: absolute;
        width: 45px;
        top: 40px;
        left: 40px;
        z-index: 1;
      }

      .van-address-list {
        margin: 0px 12px;

        .van-cell.van-cell--clickable.van-address-item {
          border-radius: 20px;
          margin-top: 10px;
        }

        /* 字体大小 */
        .van-address-item__name {
          font-size: 17px;
        }

        .van-address-item__address {
          font-size: 13px;
          color: #333;
        }
      }
    }
  }
</style>