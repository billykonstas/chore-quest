<template>
  <div class="flex flex-col py-6 px-2 sm:px-5 md:px-20 lg:px-40 h-dvh w-full mx-auto">
    <div class="h-fit flex justify-between mb-6">
      <h1 class="text-3xl text-accent-purple font-bold">ChoreQuest</h1>
      <button
        class="bg-error text-error-light font-bold text-base flex gap-2 justify-center items-center px-4 py-2 rounded-xl cursor-pointer"
        @click="handleError"
      >
        <ServerCrash :size="24" />Error
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="gameStore.isLoading" class="flex flex-1 items-center justify-center h-dvh flex-col">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-violet"></div>
      <p class="mt-4 text-black-600">Loading your data...</p>
    </div>

    <!-- Error State -->
    <div class="flex flex-1 items-center justify-center" v-if="gameStore.error">
      <div class="bg-error-light border border-red-400 text-error-dark px-4 py-3 rounded mb-6">
        <strong>Error:</strong> {{ gameStore.error }}
      </div>
    </div>

    <div v-if="!gameStore.isLoading && !gameStore.error" class="space-y-8">
      <div class="flex flex-col custom:flex-row justify-between items-center">
        <ProfileCard :profile="gameStore.profile" />
        <Stats :profile="gameStore.profile" />
        <LevelProgress
          v-if="gameStore.profile"
          :current-x-p="gameStore.profile.current_xp"
          :xp-to-next-level="gameStore.profile.xp_to_next_level"
          :current-level="gameStore.profile.level"
        />
      </div>

      <AchievementList
        :achievements="gameStore.unlockedAchievements"
        :locked-achievements="gameStore.lockedAchievements"
      />

      <TaskList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import ProfileCard from '@/components/ProfileCard.vue'
import AchievementList from '@/components/AchievementList.vue'
import LevelProgress from '@/components/LevelProgress.vue'
import TaskList from '@/components/TaskList.vue'
import Stats from '@/components/Stats.vue'
import { ServerCrash } from 'lucide-vue-next'

const gameStore = useGameStore()
onMounted(async () => {
  await gameStore.loadUserData()
})

const handleError = () => {
  if (!gameStore.error) {
    gameStore.setError('Testing Error Message')
  } else {
    gameStore.setError(null)
  }
}
</script>
