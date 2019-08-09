<template>
  <div class="newaddress">
    <div class="edit-address">
      <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
         @change-detail="onChangeDetail" />
    </div>

    <!-- 按钮部分 -->
    <!-- <mt-button size="large" class="save-address">保存</mt-button>
    <div class="van-sku-actions">
      <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
      <van-button square size="large" type="danger">删除</van-button>
    </div> -->
  </div>
</template>
<script>
  import areaList from '@/assets/js/area'
  export default {
    data() {
      return {
        areaList,
        searchResult: []
      }
    },
    created() {
      document.title = '地址详情'
    },
    methods: {
      cancel() {
        this.$router.push({
          name: 'Address'
        })
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>
<style lang="scss">
  /* @import '../../../assets/scss/Global.scss'; */
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
  .van-button--danger {
    color: #fff;
    background-color: #E51C23;
    border: 1px solid #E51C23;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    height: 40px;
    line-height: 40px;
  }
</style>