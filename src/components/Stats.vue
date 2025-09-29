<template>
  <div v-if="profile" class="grid grid-cols-2 xl:grid-cols-4 gap-4 p-4">
    <!-- Total Tasks -->
    <div class="text-center p-3 bg-accent-orange rounded-lg text-orange-700">
      <div class="text-2xl font-bold">{{ profile.total_tasks_completed }}</div>
      <div class="text-xs uppercase tracking-wide">Total Tasks</div>
    </div>

    <!-- Kitchen Tasks -->
    <div class="text-center p-3 bg-accent-yellow rounded-lg text-yellow-600">
      <div class="text-2xl font-bold">{{ profile.kitchen_tasks_completed }}</div>
      <div class="text-xs uppercase tracking-wide">Kitchen Tasks</div>
    </div>

    <!-- Bathroom Tasks -->
    <div class="text-center p-3 bg-accent-blue rounded-lg text-blue-500">
      <div class="text-2xl font-bold">{{ profile.bathroom_tasks_completed }}</div>
      <div class="text-xs uppercase tracking-wide">Bathroom Tasks</div>
    </div>

    <!-- Daily Streak -->
    <div class="text-center p-3 bg-yellow-100 rounded-lg">
      <div class="text-2xl font-bold text-yellow-700">{{ profile.consecutive_days }}</div>
      <div class="text-xs text-yellow-600 uppercase tracking-wide">Daily Streak</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '@/types'

defineProps({
  profile: {
    type: Object as () => UserProfile | null,
  },
})
</script>
