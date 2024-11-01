<template>
  <div
    class="answer"
  >
    <div
      class="left"
    />
    <div
      class="right"
    />
  </div>
</template>

<style lang="scss" scoped>

@property --leftColor {
  syntax: '<color>';
  inherits: true;
}

@property --rightColor {
  syntax: '<color>';
  inherits: true;
}

@property --percentage {
  syntax: '<number>';
  initial-value: 50;
  inherits: true;
}

.answer {
  position: fixed;
  left: -100vw;
  right: -100vw;
  top: 0px;
  bottom: 0px;

  display: flex;
  flex-direction: row;
  animation: slideUp 0.5s linear forwards;
  z-index: -9;

  transform: translateX(calc(calc(var(--percentage) - 50) * 1vw));
}

@keyframes slideUp {
  from {
    translate: calc(tan(10deg) * -200vh) 200vh;
  }
  to {
    translate: 0px 0px;
  }
}

.left, .right {
  flex-grow: 1;
  rotate: 10deg;
  height: 200vh;
  margin-top: -50vh;
}

.left {
  background-color: var(--leftColor);
}

.right {
  background-color: var(--rightColor);
}

</style>