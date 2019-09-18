<template>
  <div class="member-day">
    <div class="member-day-title">
      <p>会员日,买啥都值</p>
      <span>距结束</span>
    </div>
    <div class="member-day-buy">
      <p>会员日特卖<span>白菜价,抢不到,就是亏</span></p>
    </div>
    <div class="member-day-list">
      <img src="../../assets/images/680-80-2.jpg" alt="" class="fl">
      <span>
        <p>面家只能催眠枕</p>
        <p class="member-day-price">120 超级积分</p>
        <span>会员价￥200</span>|<span>市场价￥200</span>
      </span>
    </div>
    <div class="member-day-button fr">
      <van-button round size="small">马上抢></van-button>
    </div>
    <!-- 底部 -->
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
    margin-top: 30px;
    margin-bottom: 10px;
    border-bottom: 2px solid #f2f2f2;

    p {
      color: #E51C23;
      font-size: 1.1rem;
    }

    span {
      font-size: 0.76rem;
    }
  }

  .member-day-buy {
    border-bottom: 1px solid #f2f2f2;

    p {
      font-size: 0.78rem;
      margin-left: 15px;
      margin-bottom: 10px;

      span {
        margin-left: 5px;
        font-size: 0.70rem;
        color: #ccc;
      }
    }
  }

  .member-day-list {
    margin-top: 16px;
    margin-left: 15px;
    p {
      font-size: 0.76rem;
      padding-top: 5px;
    }

    span {
      font-size: 0.70rem;
    }

    img {
      margin-right: 10px;
    }

    .member-day-price {
      color: #E51C23;
    }
  }

  .member-day-button {
    button {
      background-color: #E51C23;
      color: #fff;
      position: relative;
      top: -42px;
      right: 10px;
    }
  }
</style>