<template>
  <div class="member-day">
    <div class="member-day-pic">
      <img src="../../assets/images/member-day.png" alt="">
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
  .member-day-pic{
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>