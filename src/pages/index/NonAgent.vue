<template>
  <div class="non-agent">
    <div class="non-agent-img">
      <img src="../../assets/images/agent-img.png" alt="">
    </div>
    <router-link to="/">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link>
  </div>
</template>
<script></script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .non-agent {
    .non-agent-img {
      margin-top: 10px;
      img {
        width: 100%;
      }
    }

  }
</style>