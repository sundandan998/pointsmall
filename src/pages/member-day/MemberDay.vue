<template>
  <div class="member-day">
    <div class="member-day-title">
      <p>会员日,买啥都值</p>
      <div class="countdown">
        距开始
        <!-- <van-count-down :time="time" /> -->
      </div>
    </div>
    <!-- 特卖商品 -->
    <div class="member-product">
      <p>会员日特卖 <span>自x价,抢不到,就是亏</span></p>
    </div>
    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</template>
<script>
  import Tabber from '../../assets/tabber/Tabber.vue'
  export default {
    data() {
      return {
        selected: 'member',
        message: 'member',
        time: 30 * 60 * 60 * 1000
      }
    },
    created() {
      document.title = '会员日'
    },
    components: {
      'app-tabber': Tabber
    },
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';

  .member-day-title {
    text-align: center;
    border-bottom: 2px solid #f2f2f2;

    p {
      margin: 10px 0 10px 0;
      color: #E51C23;
    }

    .countdown {
      margin-bottom: 10px;
      font-size: 0.76rem;
    }
  }

  .member-product {
    margin: 10px 15px 0 15px;

    p {
      font-size: 0.78rem;
  }
}
</style>