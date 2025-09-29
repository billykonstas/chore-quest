import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { UserService } from '@/services/userService'
import type { UserProfile, Achievement, ChoreTask } from '@/types'

export const useGameStore = defineStore('game', () => {
  const profile = ref<UserProfile | null>(null)
  const achievementDefinitions = ref<Achievement[]>([])
  const availableTasks = ref<ChoreTask[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const achievements = computed(() => {
    if (!profile.value || !achievementDefinitions.value.length) {
      return []
    }

    return achievementDefinitions.value.map((achievement: Achievement) => ({
      ...achievement,
      unlocked: checkAchievementUnlocked(achievement.id, profile.value!),
    }))
  })

  const unlockedAchievements = computed(() => achievements.value.filter((a) => a.unlocked))

  const lockedAchievements = computed(() => achievements.value.filter((a) => !a.unlocked))

  const progressToNextLevel = computed(() => {
    if (!profile.value) return 0
    return Math.round((profile.value.current_xp / profile.value.xp_to_next_level) * 100)
  })

  const xpNeededForNextLevel = computed(() => {
    if (!profile.value) return 0
    return profile.value.xp_to_next_level - profile.value.current_xp
  })

  const checkAchievementUnlocked = (achievementId: number, userProfile: UserProfile): boolean => {
    switch (achievementId) {
      case 1:
        return true
      case 2:
        return userProfile.level >= 2
      case 3:
        return userProfile.bathroom_tasks_completed >= 15
      case 4:
        return userProfile.level >= 3
      case 5:
        return userProfile.kitchen_tasks_completed >= 20
      case 6:
        return userProfile.total_tasks_completed >= 50
      case 7:
        return userProfile.consecutive_days >= 7
      case 8:
        return userProfile.level >= 8
      case 9:
        return userProfile.level >= 6
      case 10:
        return userProfile.level >= 4
      case 11:
        return userProfile.level >= 10
      case 12:
        return userProfile.level >= 25
      default:
        return false
    }
  }

  const setProfile = (newProfile: UserProfile) => {
    profile.value = newProfile
  }

  const setAchievements = (newAchievements: Achievement[]) => {
    achievementDefinitions.value = newAchievements
  }

  const setTasks = (newTasks: ChoreTask[]) => {
    availableTasks.value = newTasks
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const loadUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      const {
        profile: userProfile,
        achievements: userAchievements,
        tasks,
      } = await UserService.getAllUserData()

      setProfile(userProfile)
      setAchievements(userAchievements)
      setTasks(tasks)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load user data'
      setError(message)
      console.error('Store: Failed to load user data', err)
    } finally {
      setLoading(false)
    }
  }

  // Game Logic Actions
  const completedTaskIds = ref<number[]>([])

  const availableTasksFiltered = computed(() =>
    availableTasks.value.filter((task) => !completedTaskIds.value.includes(task.id)),
  )
  const completeTask = (task: ChoreTask) => {
    if (!profile.value) return

    completedTaskIds.value.push(task.id)

    const oldLevel = profile.value.level

    // Add XP
    profile.value.current_xp += task.xp_reward
    profile.value.total_tasks_completed += 1

    if (task.category === 'kitchen') {
      profile.value.kitchen_tasks_completed += 1
    } else if (task.category === 'bathroom') {
      profile.value.bathroom_tasks_completed += 1
    }

    // Check level up
    while (profile.value.current_xp >= profile.value.xp_to_next_level) {
      profile.value.current_xp -= profile.value.xp_to_next_level
      profile.value.level += 1
      profile.value.xp_to_next_level = Math.floor(profile.value.xp_to_next_level * 1.1)
    }

    return {
      xp_gained: task.xp_reward,
      new_level: profile.value.level,
      did_level_up: profile.value.level > oldLevel,
    }
  }

  const addXP = (amount: number) => {
    if (!profile.value) return

    const oldLevel = profile.value.level
    profile.value.current_xp += amount

    while (profile.value.current_xp >= profile.value.xp_to_next_level) {
      profile.value.current_xp -= profile.value.xp_to_next_level
      profile.value.level += 1
      profile.value.xp_to_next_level = Math.floor(profile.value.xp_to_next_level * 1.1)
    }

    return {
      xp_gained: amount,
      new_level: profile.value.level,
      did_level_up: profile.value.level > oldLevel,
    }
  }

  return {
    profile,
    achievementDefinitions,
    availableTasks,
    availableTasksFiltered,
    isLoading,
    error,
    achievements,
    unlockedAchievements,
    lockedAchievements,
    progressToNextLevel,
    xpNeededForNextLevel,
    loadUserData,
    completeTask,
    addXP,
    setError,
  }
})
