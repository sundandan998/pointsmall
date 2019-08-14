<template>
    <div class="order">
      <div>
        <!--  :quota="quota" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked" :quota-used="quotaUsed"-->
        <van-sku v-model="show" :goods-id="goodsId" stepper-title="数量" :sku="sku" :goods="goods"
          :hide-stock="sku.hide_stock" show-add-cart-btn reset-stepper-on-hide :initial-sku="initialSku">
          <!-- 自定义 sku-header-price -->
          <template slot="sku-header-price" slot-scope="props">
            <div class="van-sku__goods-price">
              <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}</span>
            </div>
          </template>
          <!-- 自定义 sku actions -->
          <!-- <template slot="sku-actions" slot-scope="props">
            <div class="van-sku-actions">
              @click="onPointClicked"
              <van-button square size="large" type="warning">
                取消
              </van-button>
              直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调
              <van-button square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')">
                提交订单
              </van-button>
            </div>
          </template> -->
          <template>
            <span>合计</span><span></span>
          </template>
        </van-sku>
  
      </div>
      <div class="van-sku-actions">
        <van-button square size="large" type="warning" @click="cancel"> 取消</van-button>
        <van-button square size="large" type="danger" @click="buy">提交订单</van-button>
      </div>
    </div>
  </template>
  <script>
    import api from '@/api/goods/Goods.js'
    export default {
      data() {
        return {
          show: true,
          detailData: {},
          orderColor: {},
          goods: {
            // 商品标题
            title: '',
            picture: ''
          },
          initialSku: {
            // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
            // 值：skuValueId（规格值 id）
            s1: '30349',
            s2: '1193',
            // 初始选中数量
            selectedNum: 3
          },
          sku: {
            tree: [
              {
                k: '颜色',
                k_id: '1',
                v: [
                  {
                    id: '30349',
                    name: '天蓝色',
                    imgUrl:
                      'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
                  },
                  {
                    id: '1215',
                    name: '白色'
                  }
                ],
                k_s: 's1',
                count: 2
              },
              {
                k: '尺寸',
                k_id: '2',
                v: [
                  {
                    id: '1193',
                    name: '1'
                  },
                  {
                    id: '1194',
                    name: '2'
                  }
                ],
                k_s: 's2',
                count: 2
              }
            ],
            // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
            list: [
              {
                id: 2259,
                price: 120, //价格
                discount: 122,
                s1: '1215',
                s2: '1193',
                s3: '0',
                s4: '0',
                s5: '0',
                stock_num: 20, //库存 
                goods_id: 946755
              },
              {
                id: 2260,
                price: 110,
                discount: 112,
                s1: '1215',
                s2: '1194',
                s3: '0',
                s4: '0',
                s5: '0',
                stock_num: 2, //库存 
                goods_id: 946755
              },
              {
                id: 2257,
                price: 130,
                discount: 132,
                s1: '30349',
                s2: '1193',
                s3: '0',
                s4: '0',
                s5: '0',
                stock_num: 40, //库存 
                goods_id: 946755
              },
              {
                id: 2258,
                price: 100,
                discount: 100,
                s1: '30349',
                s2: '1194',
                s3: '0',
                s4: '0',
                s5: '0',
                stock_num: 50, //库存 
                goods_id: 946755
              }
            ],
            price: '5.00',
            stock_num: 227, // 商品总库存
            none_sku: false,  // 是否无规格商品 
            hide_stock: true  // 是否隐藏剩余库存
          },
          goodsId: '946755',
          quota: 3, //限购数量 
          quota_used: 0,  //已经购买过的数量
  
        }
      },
      created() {
        document.title = '填写订单'
        this.detailId = this.$route.params
        this.order()
      },
      methods: {
        // 商品信息
        order() {
          api.orderDetail(this.$route.params).then(res => {
            this.detailData = res.data
            this.orderColor = res.data.specs
            // console.log(this.detailData)
          }).catch(err => {
          })
        },
        cancel() {
          this.$router.push({
            name: 'Product'
          })
        },
        buy() {
          this.$router.push({
            name: 'ToPay'
          })
        }
      }
    }
  </script>
  <style lang="scss">
    @import "../../assets/scss/Global.scss";
  
    .van-overlay {
      position: unset;
    }
  
    .van-button--bottom-action {
      display: none;
    }
  
    .van-button--bottom-action.van-button--primary {
      display: none;
    }
  
    .van-popup--bottom {
      width: 100%;
      top: 24px;
      -webkit-transform: translate3d(-50%, 0, 0);
    }
  </style>