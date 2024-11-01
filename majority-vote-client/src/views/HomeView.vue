<script setup lang="ts">
import { ref } from 'vue'
import ColorfulBackground from '../components/ColorfulBackground.vue'
import AnswerBackground from '../components/AnswerBackground.vue'
import TimerBar from '../components/TimerBar.vue'
import "@fontsource/bebas-neue/400.css"

const question = ref('Do ants have lungs')

const leftOption = ref('Yes')
const rightOption = ref('No')

function load() {
  // Reset the result
  result.value = undefined

  question.value = 'Do ants have lungs'
}

const result = ref<number>()

function submit(answer: 'left' | 'right') {
  result.value = .1

  setTimeout(load, 6000)
}

const leftColor = ref('#000000')
const rightColor = ref('#000000')

function generateColors() {
  const randomHue = Math.round(Math.random() * 360)

  leftColor.value = `hsl(${randomHue}deg 30% 90%)`
  rightColor.value = `hsl(${randomHue + 120}deg 30% 90%)`
}
generateColors()

</script>

<template>
  <main
    :style="{
      '--leftColor': leftColor,
      '--rightColor': rightColor,
    }"
  >
    <div
      class="question"
    >
      <span
        class="text"
      >
        {{ question }}?
      </span>
      <div
        class="options content"
        v-show="!result"
      >
        <span
          class="left"
          @click="submit('left')"
        >
          {{ leftOption }}
        </span>
        <span
          class="center"
        >
          or
        </span>
        <span
          class="right"
          @click="submit('right')"
        >
          {{ rightOption }}
        </span>
      </div>
      <div
        class="result content"
        v-show="result"
      >
        <span
          class="left"
          @click="submit('left')"
        >
          {{ Math.round(result * 100, 1) }}%
        </span>
        <span
          class="center"
        >
          vs
        </span>
        <span
          class="right"
          @click="submit('right')"
        >
        {{ Math.round((1-result) * 100, 1) }}%
        </span>
      </div>
    </div>
    <colorful-background />
    <answer-background
      v-if="result"
      :style="{'--percentage': `${Math.round(result * 100)}`}"
    />
    <timer-bar
      v-if="result"
    />
  </main>
</template>

<style lang="scss" scoped>

.question {

  position: absolute;
  inset: 0px;

  display: flex;
  padding: 12px 24px 60px 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Bebas Neue";
  text-shadow: 2px 2px 0px #ffffff2a;
  color: rgb(0, 0, 0);

  .text {
    font-size: 150px;
    text-align: center;
    line-height: 0.85;
    mix-blend-mode: overlay;
  }

  .content {
    font-size: 120px;
    line-height: 1;

    display: flex;
    flex-direction: column;

    margin-top: 120px;
    max-width: 600px;
    width: 100%;

    .left {
      align-self: flex-start;
      color: white;
      transform-origin: bottom right;

      &::before {
        background-color: var(--leftColor);
      }
    }

    .center {
      align-self: center;
      font-size: 80px;
      mix-blend-mode: overlay;
    }

    .right {
      align-self: flex-end;
      color: white;
      transform-origin: top left;

      &::before {
        background-color: var(--rightColor);
      }
    }
  }

  .options {

    .left, .right {
      transition: scale 0.3s ease-in-out;
      cursor: pointer;
      user-select: none;
      position: relative;

      &::before {
        content: '';

        position: absolute;
        inset: -60px;
        z-index: -1;
        filter: saturate(2.0) brightness(0.9) blur(140px);
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
      }

      &:hover::before {
        opacity: 1;
      }
    }

    .left:hover, .right:hover {
      scale: 1.1;
    }
  }
}

</style>