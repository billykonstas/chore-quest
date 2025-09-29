// src/services/userService.ts
import { mockApi } from '@/api/mockApi'
import type { Achievement, ChoreTask, UserProfile } from '@/types'

export class UserService {
  static async getUserProfile(): Promise<UserProfile> {
    try {
      return await mockApi.getUserProfile()
    } catch (error) {
      console.error('UserService: Failed to fetch profile', error)
      throw new Error('Unable to load user profile. Please try again.')
    }
  }

  static async getAchievements(): Promise<Achievement[]> {
    try {
      return await mockApi.getUserAchievements()
    } catch (error) {
      console.error('UserService: Failed to fetch achievements', error)
      throw new Error('Unable to load achievements. Please try again.')
    }
  }

  static async getAvailableTasks(): Promise<ChoreTask[]> {
    try {
      return await mockApi.getAvailableTasks()
    } catch (error) {
      console.error('UserService: Failed to fetch tasks', error)
      throw new Error('Unable to load available tasks. Please try again.')
    }
  }

  static async getAllUserData(): Promise<{
    profile: UserProfile
    achievements: Achievement[]
    tasks: ChoreTask[]
  }> {
    try {
      const [profile, achievements, tasks] = await Promise.all([
        this.getUserProfile(),
        this.getAchievements(),
        this.getAvailableTasks(),
      ])

      return { profile, achievements, tasks }
    } catch (error) {
      console.error('UserService: Failed to fetch all user data', error)
      throw new Error('Unable to load user data. Please try again.')
    }
  }
}
