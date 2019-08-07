<template>
  <div class="address">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
      :error.sync="error" error-text="请求失败，点击重新加载">
      <div class="address-list" v-for="item in addressData">
        <div class="address-content fl">
          <p>张三 135656565</p>
          <p>河北省xxx</p>
        </div>
        <div class="line"></div>
        <div class="address-edit fr">
          <img src="../../../assets/images/edit.svg" alt="">
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
  import api from '@/api/user/User.js'
  export default {
    data() {
      return {
        addressData: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        pageNum: 1,
      }
    },
    created() {
      document.title = '收货地址'
    },
    methods: {
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          api.address({ 'page': this.pageNum }).then(res => {
            if (res.code == 0) {
              this.addressData.push.apply(this.addressData, res.data)
              this.loading = false
              if (res.has_next == true) {
                // this.loading = true
                this.pageNum++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
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