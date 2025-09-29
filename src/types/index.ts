export interface UserProfile {
  name: string
  avatar_url: string
  level: number
  current_xp: number
  xp_to_next_level: number
  total_tasks_completed: number
  kitchen_tasks_completed: number
  bathroom_tasks_completed: number
  consecutive_days: number
}

export interface Achievement {
  id: number
  title: string
  description: string
  icon_name: string
  category: TaskCategory
  icon: string
  unlocked?: boolean
}

export interface ChoreTask {
  id: number
  name: string
  description: string
  xp_reward: number
  category: TaskCategory
}

export type TaskCategory = 'kitchen' | 'bathroom' | 'living' | 'general'
