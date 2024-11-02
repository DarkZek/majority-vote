<script setup lang="ts">
import { ref } from 'vue'
import ColorfulBackground from '../components/ColorfulBackground.vue'
import AnswerBackground from '../components/AnswerBackground.vue'
import TimerBar from '../components/TimerBar.vue'
import "@fontsource/bebas-neue/400.css"
import { getQuestion, submitAnswer } from '../services/apiService'
import type { QuestionType } from '@/types'

const question = ref<QuestionType>()

async function load() {
  generateColors()

  // Reset the result
  result.value = undefined

  question.value = await getQuestion()
}

const result = ref<number>()

const loading = ref(false)

async function submit(answer: 'left' | 'right') {

  if (loading.value) {
    return
  }

  loading.value = true

  const response = await submitAnswer(question.value!.questionId, answer)

  result.value = response.percentage

  setTimeout(load, 6000)

  loading.value = false
}

const leftColor = ref('#000000')
const rightColor = ref('#000000')

function generateColors() {
  const randomHue = Math.round(Math.random() * 360)

  leftColor.value = `hsl(${randomHue}deg 30% 90%)`
  rightColor.value = `hsl(${randomHue + 120}deg 30% 90%)`
}
load()

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
        {{ question?.statement }}?
      </span>
      <div
        class="options content"
        v-show="!result"
      >
        <span
          class="left"
          @click="submit('left')"
        >
          {{ question?.leftOption }}
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
          {{ question?.rightOption }}
        </span>
      </div>
      <div
        class="result content"
        v-if="result"
      >
        <span
          class="left"
        >
          {{ Math.round(result * 100) }}%
        </span>
        <span
          class="center"
        >
          vs
        </span>
        <span
          class="right"
        >
        {{ Math.round((1-result) * 100) }}%
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