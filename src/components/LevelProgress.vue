<template>
  <div class="relative inline-block p-2">
    <div class="relative inline-flex items-center justify-center">
      <svg class="transform -rotate-90 w-48 h-48" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          :r="radius"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          fill="transparent"
          class="text-gray-200"
        />

        <circle
          cx="50"
          cy="50"
          :r="radius"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          fill="transparent"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-1000 ease-out text-accent-purple"
          stroke-linecap="round"
        />
      </svg>

      <!-- Center content -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="text-4xl font-bold text-accent-purple">
            {{ currentLevel }}
          </div>
          <div class="text-base text-gray-500 uppercase tracking-wide">Level</div>

          <div class="text-base text-gray-600 mt-2">
            <span class="font-medium">{{ displayCurrentXP }}</span>
            <span class="text-gray-400">/</span>
            <span>{{ xpToNextLevel }} XP</span>
          </div>

          <div class="text-lg font-semibold mt-2 text-accent-purple">
            {{ Math.trunc(displayPercentage) }}%
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showLevelUpAnimation"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div
        class="level-up-burst animate-ping absolute w-48 h-48 rounded-full bg-accent-purple"
      ></div>
      <div class="xp-gain animate-bounce text-accent-purple font-bold text-lg">LEVEL UP!</div>
    </div>

    <div
      v-if="showXPGainAnimation && xpGainAmount > 0"
      class="absolute -top-2 -right-2 pointer-events-none"
    >
      <div class="xp-gain animate-bounce text-accent-purple font-bold text-sm">
        +{{ xpGainAmount }} XP
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  currentXP: number
  xpToNextLevel: number
  currentLevel: number
}

const props = defineProps<Props>()

const displayCurrentXP = ref(props.currentXP)
const displayPercentage = ref(0)
const showLevelUpAnimation = ref(false)
const showXPGainAnimation = ref(false)
const xpGainAmount = ref(0)

const strokeWidth = 8
const radius = 42
const circumference = 2 * Math.PI * radius

const progress = computed(() => {
  const percentage = (props.currentXP / props.xpToNextLevel) * 100
  return Math.min(Math.max(percentage, 0), 100)
})

const strokeDashoffset = computed(() => {
  const progressValue = (displayPercentage.value / 100) * circumference
  return circumference - progressValue
})

const animateXPGain = (newXP: number, oldXP: number) => {
  const gain = newXP - oldXP
  if (gain <= 0) return

  xpGainAmount.value = gain
  showXPGainAnimation.value = true

  const duration = 1000
  const startTime = Date.now()
  const startXP = oldXP

  const animateCounter = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const easedProgress = easeOutCubic(progress)

    displayCurrentXP.value = Math.round(startXP + gain * easedProgress)
    displayPercentage.value = (displayCurrentXP.value / props.xpToNextLevel) * 100

    if (progress < 1) {
      requestAnimationFrame(animateCounter)
    } else {
      displayCurrentXP.value = newXP
      displayPercentage.value = (newXP / props.xpToNextLevel) * 100

      setTimeout(() => {
        showXPGainAnimation.value = false
      }, 500)
    }
  }

  requestAnimationFrame(animateCounter)
}

const triggerLevelUpAnimation = () => {
  showLevelUpAnimation.value = true
  setTimeout(() => {
    showLevelUpAnimation.value = false
  }, 2000)
}

// Watch for XP changes
watch(
  () => props.currentXP,
  (newXP, oldXP) => {
    if (oldXP !== undefined) {
      animateXPGain(newXP, oldXP)
    } else {
      // Initial load - no animation
      displayCurrentXP.value = newXP
      displayPercentage.value = progress.value
    }
  },
  { immediate: true },
)

// Watch for level changes (level up!)
watch(
  () => props.currentLevel,
  (newLevel, oldLevel) => {
    if (oldLevel !== undefined && newLevel > oldLevel) {
      displayCurrentXP.value = props.currentXP
      displayPercentage.value = progress.value
      triggerLevelUpAnimation()
    }
  },
)

// Initialize values
displayCurrentXP.value = props.currentXP
displayPercentage.value = progress.value
</script>

<style scoped>
.xp-gain {
  animation: xp-float 1.5s ease-out forwards;
}

.level-up-burst {
  animation: level-up-pulse 1s ease-out infinite;
}

@keyframes xp-float {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Pulse animation for level up */
@keyframes level-up-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
