<template>
  <div class="detail">
    <div class="detail-list">
      <mt-cell title="购物" label="描述信息" to="assetsdetails" is-link>
        <span>-1(LIFE+)</span>
      </mt-cell>
    </div>
    <router-link to="/assets">
      <div class="assets-center-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      document.title = '明细'
    }
  }

</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .assets-center-button {
    button {
      position: fixed;
      bottom: 0;
      border-radius: 20px;
      background-color: #09BB07;
      color: #fff;
    }

  }
</style>