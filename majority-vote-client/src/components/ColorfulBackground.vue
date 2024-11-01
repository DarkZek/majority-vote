<script lang="ts" setup>
</script>

<template>
  <div
    class="background"
  >
  </div>
</template>

<style lang="scss" scoped>

@property --leftOffset {
  syntax: '<percentage>';
  initial-value: 10%;
  inherits: true;
}

@property --rightOffset {
  syntax: '<percentage>';
  initial-value: 90%;
  inherits: true;
}

@property --leftColor {
  syntax: '<color>';
  inherits: true;
}

@property --rightColor {
  syntax: '<color>';
  inherits: true;
}

.background {
  position: fixed;
  inset: 0px;
  z-index: -10;

  display: flex;
  flex-direction: row;

  background: linear-gradient(100deg, var(--leftColor) var(--leftOffset), var(--rightColor) var(--rightOffset));

  transition: --leftOffset cubic-bezier(.07,.62,.45,.99) 1s, --rightOffset cubic-bezier(.07,.62,.45,.99) 1s;

  animation: idle 10s linear infinite;
}

.background:hover {
  --leftOffset: 30%;
  --rightOffset: 30%;
}

@keyframes idle {
  0% {
    --leftOffset: 10%;
    --rightOffset: 90%;
  }
  33% {
    --leftOffset: 50%;
    --rightOffset: 100%;
  }
  66% {
    --leftOffset: 0%;
    --rightOffset: 50%;
  }
  100% {
    --leftOffset: 10%;
    --rightOffset: 90%;
  }
}

</style>