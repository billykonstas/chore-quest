<template>
  <div class="py-6">
    <h2 class="text-xl font-semibold mb-4">
      Available Tasks ({{ gameStore.availableTasksFiltered.length }})
    </h2>
    <template v-if="gameStore.availableTasksFiltered.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="task in gameStore.availableTasksFiltered"
          :key="task.id"
          :class="`rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${getCategoryColor(task.category).bg}`"
          @click="completeTask(task)"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-base font-medium">{{ task.name }}</h4>
              <p class="text-sm text-black-400 font-light mt-1">{{ task.description }}</p>
            </div>
            <div class="text-right">
              <span
                class="inline-block bg-accent-purple text-white text-xs px-2 py-1 w-14 text-center rounded-full"
              >
                +{{ task.xp_reward }} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-center mt-12">All tasks finished! 🎉</div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useCategoryColor } from '@/composables/useCategoryColor'
import type { ChoreTask } from '@/types'

const gameStore = useGameStore()
const { getCategoryColor } = useCategoryColor()
const completeTask = (task: ChoreTask) => {
  gameStore.completeTask(task)
}
</script>

<style scoped></style>
