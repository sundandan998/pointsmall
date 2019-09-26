<template>
  <div class="invite-people">
    <div class="invitation-code">
      <p>千企国际联盟商城</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      document.title = '邀请新人'
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/Global.scss';

  .invite-people {
    .invitation-code {
      width: 95%;
      height: auto;
      background-color: #fff;
      margin: 30px auto;
      text-align: center;
    }
  }
</style>