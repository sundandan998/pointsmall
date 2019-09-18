<template>
  <div>
    <mt-button @click.native="handleClick">按钮</mt-button>
    <mt-popup v-model="popupVisible" position="left" modal=false>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        popupVisible: false
      }
    },
    methods: {
      handleClick(){
        this.popupVisible = true
      }
    },
  }
</script>