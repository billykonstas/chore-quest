<template>
  <div class="p-4 w-fit">
    <div v-if="profile">
      <div class="flex gap-5">
        <img
          :src="profile.avatar_url"
          alt="Avatar"
          class="w-36 h-36 bg-accent-violet rounded-full"
        />
        <div class="flex flex-col justify-center gap-3">
          <div class="text-3xl">{{ profile.name }}</div>
          <div
            class="rounded-3xl w-fit px-4 bg-accent-purple text-white flex items-center justify-evenly"
          >
            <span class="text-4xl font-semibold">{{ profile.level }}</span>
            <Gem :size="45" class="p-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '@/types'
import { Gem } from 'lucide-vue-next'
defineProps({
  profile: {
    type: Object as () => UserProfile | null,
    required: true,
  },
})
</script>
