<template>
  <div class="member-day">
    <div class="member-day-pic">
      <img src="../../assets/images/member-day.png" alt="">
    </div>
    <!-- 未开始 -->
    <!-- <div class="member-day-top">
      <span>会员日,买啥都值</span>
      <p>9月10日 00:00 即将开抢</p>
      <p>距开始 <van-count-down :time="time" /></p>
    </div>
    <div class="member-day-bot">
      <span> 【会员日活动介绍】 </span>
      <p>每月10号、20号、30号会员日活动开启专属商品减价直卖</p>
    </div> -->

    <!-- 底部tabber -->
    <div>
      <app-tabber :message="selected"></app-tabber>
    </div>
  </div>
</template>
<script>
  import { CountDown } from 'vant'
  import Tabber from '../../assets/tabber/Tabber.vue'
  export default {
    data() {
      return {
        selected: 'member',
        message: 'member',
        // time: 30 * 60 * 60 * 1000
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

  .member-day-pic {
    img {
      width: 100%;
      height: 100%;
    }
  }

  /* --未开始-- */
  /* .member-day-top {
    margin: 80px auto;

    span {
      display: block;
      text-align: center;
      color: #E51C23;
      font-size: 1.2rem;
    }

    p {
      text-align: center;
      margin: 20px 0px;
      font-size: 0.78rem;
    }
  }

  .member-day-bot {
    border-top: 1px solid #ccc;

    span {
      display: block;
      text-align: center;
      margin: 20px 0px;
    }

    p {
      font-size: 0.78rem;
      text-align: center;
      width: 55%;
      margin: 0 auto;
      text-align: left;
      line-height: 20px;
    }

  } */
</style>