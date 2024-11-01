<script setup lang="ts">

</script>

<template>
  <div class="bar"></div>
</template>

<style lang="scss" scoped>

.bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 12px;
  backdrop-filter: saturate(400%) brightness(80%);
  animation: load 6s linear forwards;
}

@keyframes load {
  from {
    width: 0px;
  }
  to {
    width: 100vw;
  }
}

</style>