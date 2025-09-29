<template>
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2">
    <div v-for="achievement in achievements" :key="achievement.id" class="flex items-center gap-3">
      <div :class="`rounded-xl p-3 w-fit ${getCategoryColor(achievement.category).bg}`">
        <img :src="achievement.icon" alt="Achievement Icon" width="24" height="24" />
      </div>

      <div class="flex flex-col gap-1">
        <div class="font-500">{{ achievement.title }}</div>
        <div class="text-sm text-gray-500">{{ achievement.description }}</div>
      </div>
    </div>
    <div
      v-for="achievement in lockedAchievements"
      :key="achievement.id"
      class="flex items-center gap-3 opacity-30"
    >
      <div class="rounded-xl p-4 w-fit bg-gray-400">
        <Lock class="w-6 h-6 text-white" />
      </div>

      <div class="flex flex-col gap-1">
        <div class="font-500">{{ achievement.title }}</div>
        <div class="text-sm text-text-secondary">{{ achievement.description }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Achievement } from '@/types'
import { Lock } from 'lucide-vue-next'
import { useCategoryColor } from '@/composables/useCategoryColor'
const { getCategoryColor } = useCategoryColor()

defineProps({
  achievements: {
    type: Array as () => Achievement[],
  },
  lockedAchievements: {
    type: Array as () => Achievement[],
  },
})
</script>
