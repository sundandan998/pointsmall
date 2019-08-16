<template>
    <div>
      
<van-popup v-model="show" position="bottom">
    <van-area :area-list="areaList" />
</van-popup>
      <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      />
      <div><span>公司名称：</span><input v-model="comName"/></div>
      <div><span>姓名：</span><input v-model="name"/></div>
      
      <div v-show="flag">
        <van-area :area-list="areaList" :item-height=25 @confirm="onAddrConfirm" @cancel="shut" :value="addrCode"/>
      </div>
    </div>
  </template>
  
  <script>
  import areaList from '@/assets/js/area.js'
  export default {
    // components: {areaList},
    data () {
      return {
        areaList,
        comName: {},
        searchResult: '',
        addrCode: '440105',
        province: '',
        city: '',
        district: '',
        street: '',
        companyName: '',
        name: '',
        phone: '',
        address: '',
        areaList: null,
        flag: false
        // flag: true
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        // 初始化地址选择器
        this.areaList = areaList.areaList // 初始化选择器数据
        // 初始化复选框
        // this.allMajor = this.getMajor()
      },
      show () {
        this.flag = true
      },
      onAddrConfirm (e) { // 点击确认，获取所选的省市区数据
        // 确定选择,返回的必定是三元素数组
        console.log('this.onAddrConfirm=>e', e)
        this.province = e[0].name
        this.city = e[1].name
        this.district = e[2].name
        this.flag = false
      },
      shut () {
        this.flag = false
      },
      onChangeDetail (val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }]
        } else {
          this.searchResult = []
        }
      }
    }
  }
  </script>
  
  <style scoped>
    /* @import '../../assets/css/mycss.css'; */
  </style>