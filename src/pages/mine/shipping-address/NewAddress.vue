<template>
  <div class="newaddress">
    <div class="edit-address">
      <van-address-edit :area-list="areaList"  show-delete  show-search-result
        :search-result="searchResult" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
        <van-area :area-list="areaList"  />
    </div>
  </div>
</template>
<script>
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
      onSave() {
        Toast('save');
      },
      onDelete() {
        Toast('delete');
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