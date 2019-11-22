<template>
  <div class="non-agent">
    <div class="non-agent-img">
      <img src="../../assets/images/close@2x.png" alt="" class="close fr">
      <img src="../../assets/images/noagent.png" alt="">
      <img src="../../assets/images/erweima@2x.png" alt="" class="qrcode">
    </div>
    <router-link to="/">
      <!-- <div class="non-agent-close">
        <img src="../../assets/images/close@2x.png" alt="" class="fr">
      </div> -->
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
      /* background-color: #303030; */
      width: 100%;
      top: 0;
      z-index: -1;
      position: absolute;
      img {
        display: block;
        outline: none;
        border: 0;
        height: 100%;
        width: 100%;
        margin-top: 145px;
      }
      .qrcode{
        height: 200px;
        width: 165px;
        margin: -165px auto 60px auto;
      }
      .close{
        width: 50px;
        margin: 30px 30px 0 0;
      }
    }

  }
</style>