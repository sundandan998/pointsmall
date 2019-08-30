<template>
  <div>
    <h1>yre</h1>
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
    components: {
      'app-tabber': Tabber
    },
  }
</script>
<style lang="scss">
  @import '../../assets/scss/Global.scss';
</style>