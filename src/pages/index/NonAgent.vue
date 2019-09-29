<template>
  <div class="non-agent">
    <div class="non-agent-img">
      <img src="../../assets/images/agent-img.png" alt="">
    </div>
    <router-link to="/">
      <div class="non-agent-close">
        <img src="../../assets/images/close.svg" alt="" class="fr">
      </div>
    </router-link>

    <!-- <router-link to="/">
      <div class="order-button">
        <mt-button size="large">返回</mt-button>
      </div>
    </router-link> -->
  </div>
</template>
<script></script>
<style lang="scss">
  @import "../../assets/scss/Global.scss";

  .non-agent {
    .non-agent-img {
      width: 100%;
      height: 100%;
      top: 0;
      z-index: -1;
      position: absolute;

      img {
        display: block;
        outline: none;
        border: 0;
        height: 100%;
        width: 100%;
      }
    }

    .non-agent-close {
      margin: 20px 20px 0 0px;
      img {
        width: 30px;
      }
    }
  }
</style>