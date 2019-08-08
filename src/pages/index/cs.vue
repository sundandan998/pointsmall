<template>
  <div>
    <van-nav-bar title="地址信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
      :search-result="searchResult" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
  </div>
</template>

<script>
  import areaList from "@/assets/js/area.js";
  import { Toast } from "vant";
  export default {
    name: "Address",
    data() {
      return {
        // BScroll:'',
        areaList,
        searchResult: []
      };
    },

    // mounted() {
    //   // 初始化滚动插件 better-scroll
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     scrollY: true,
    //     click: true,//一开始的点击事件被bscroll阻止了，设置这个才能点击
    //   })

    //   this.getOrderDate()

    // },
    methods: {
      onClickLeft() {
        this.$router.push("/my");
      },
      onSave() {
        this.$router.push("/my");
      },
      onDelete() {
        Toast("delete");
        this.$router.push("/my");
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [
            {
              name: "万达广场",
              address: "郑州市二七区"
            }
          ];
        } else {
          this.searchResult = [];
        }
      }
    }
  };
</script>

<style scoped>
</style>
<!-- ------------------ -->
<!-- <template>
    <div class="newaddress">
      <div>
        <van-nav-bar title="地址信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
          :search-result="searchResult" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
      </div> -->
      <!-- 按钮部分 -->
      <!-- <div class="van-sku-actions">
        <van-button square size="large" type="warning" @click="cancel"> 返回</van-button>
        <van-button square size="large" type="danger">保存</van-button>
      </div> -->
    <!-- </div>
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
        document.title = '新建地址'
      },
      methods: {
  
        cancel() {
          this.$router.push({
            name: 'Address'
          })
        },
        onClickLeft() {
          this.$router.push("/my");
        },
        onSave() {
          this.$router.push("/my");
        },
        onDelete() {
          Toast("delete");
          this.$router.push("/my");
        },
        onChangeDetail(val) {
          if (val) {
            this.searchResult = [
              {
                name: "万达广场",
                address: "郑州市二七区"
              }
            ];
          } else {
            this.searchResult = [];
          }
        }
      }
    }
  </script>
  <style lang="scss">
    @import '../../../assets/scss/Global.scss';
  
    .van-address-edit__buttons {
      padding: 30px 15px;
      display: none;
    }
  </style> -->