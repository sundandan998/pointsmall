<template>
  <div class="address">
    <van-address-list :list="list" @edit="onEdit" @add="onAdd" @select="selectAddress" />
    <!-- <router-link to="/mine"> -->
      <div class="address-btn" @click.native="back">
        <van-button square size="large" type="warning" v-on:click="$router.go(-1)">返回</van-button>
      </div>
    <!-- </router-link> -->
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
      console.log()
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
        if (refpath == '/mine') {
          this.$router.push({
            name: 'ShippingAddress',
            params: { index: index, item: item, id: this.$route.params.id }
          })
        } else if (this.$route.params.path == 'is_vip') {
          this.$router.push({
            name: 'Order',
            params: { index: index, item: item, }
          })
        }else if(this.$route.params.path == 'memberday'){
          this.$router.push({
            name: 'MemberDayOrder',
            params: { index: index, item: item, }
          })
        }
      },
      // back(){

      // }
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';
  .address {
    .van-address-item .van-radio__icon {
      display: none !important;
    }
  }
</style>