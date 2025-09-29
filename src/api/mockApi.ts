import type { Achievement } from '@/types'

export const mockApi = {
  async getUserProfile() {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      name: 'Owen Wilson',
      avatar_url: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Alexander',
      level: 12,
      current_xp: 1820,
      xp_to_next_level: 2000,
      total_tasks_completed: 75,
      kitchen_tasks_completed: 19,
      bathroom_tasks_completed: 13,
      consecutive_days: 5,
    }
  },

  async getUserAchievements() {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const achievements: Achievement[] = [
      {
        id: 1,
        title: 'Dish Destroyer',
        description: 'First dish washed',
        icon_name: 'utensils',
        category: 'kitchen',
        icon: '',
      },
      {
        id: 2,
        title: 'Vacuum Whisperer',
        description: 'Vacuumed without asking',
        icon_name: 'zap',
        category: 'living',
        icon: '',
      },
      {
        id: 3,
        title: 'Bathroom Brave',
        description: 'Bathroom cleaned',
        icon_name: 'sparkles',
        category: 'bathroom',
        icon: '',
      },
      {
        id: 4,
        title: 'Trash Panda',
        description: 'Took out the trash',
        icon_name: 'panda',
        category: 'general',
        icon: '',
      },
      {
        id: 5,
        title: 'Kitchen Ninja',
        description: '50 kitchen tasks',
        icon_name: 'chef-hat',
        category: 'kitchen',
        icon: '',
      },
      {
        id: 6,
        title: 'The Unstoppable',
        description: '100 chores done',
        icon_name: 'trophy',
        category: 'general',
        icon: '',
      },
      {
        id: 7,
        title: 'Streak Master',
        description: '7-day streak',
        icon_name: 'calendar',
        category: 'general',
        icon: '',
      },
      {
        id: 8,
        title: 'Laundry Lord',
        description: 'Laundry complete',
        icon_name: 'washing-machine',
        category: 'living',
        icon: '',
      },
      {
        id: 9,
        title: 'Fridge Detective',
        description: 'Mystery food found',
        icon_name: 'hat-glasses',
        category: 'kitchen',
        icon: '',
      },
      {
        id: 10,
        title: 'The Chosen One',
        description: 'Paper replaced',
        icon_name: 'rotate-ccw',
        category: 'bathroom',
        icon: '',
      },
      {
        id: 11,
        title: 'Couch Cushion Hero',
        description: 'Keys recovered',
        icon_name: 'sofa',
        category: 'living',
        icon: '',
      },
      {
        id: 12,
        title: 'Legendary Flatmate',
        description: 'Level 25 reached',
        icon_name: 'crown',
        category: 'general',
        icon: '',
      },
    ]

    // Map icon_name + color to a full Iconify API URL for Lucide
    return achievements.map((a) => ({
      ...a,
      icon: `https://api.iconify.design/lucide:${a.icon_name}.svg?color=white&width=24&height=24`,
    }))
  },

  async getAvailableTasks() {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return [
      // Kitchen Tasks
      {
        id: 1,
        name: 'Wash Dishes',
        description: "Clean all dishes in the sink (yes, even the ones 'soaking' since Tuesday)",
        xp_reward: 25,
        category: 'kitchen' as const,
      },
      {
        id: 2,
        name: 'Deep Clean Stovetop',
        description: "Remove that mysterious burnt substance from last month's cooking disaster",
        xp_reward: 40,
        category: 'kitchen' as const,
      },
      {
        id: 3,
        name: 'Defrost & Clean Freezer',
        description: 'Journey into the frozen wasteland and emerge victorious',
        xp_reward: 75,
        category: 'kitchen' as const,
      },
      {
        id: 4,
        name: 'Wipe Down Counters',
        description: 'Make surfaces sparkle and remove coffee ring evidence',
        xp_reward: 15,
        category: 'kitchen' as const,
      },
      {
        id: 5,
        name: 'Clean Out Fridge',
        description: 'Dispose of science experiments and expired yogurt from 2023',
        xp_reward: 50,
        category: 'kitchen' as const,
      },

      // Bathroom Tasks
      {
        id: 6,
        name: 'Clean Toilet',
        description: 'The heroic deed that separates adults from teenagers',
        xp_reward: 35,
        category: 'bathroom' as const,
      },
      {
        id: 7,
        name: 'Scrub Shower',
        description: 'Battle the soap scum monster and win',
        xp_reward: 45,
        category: 'bathroom' as const,
      },
      {
        id: 8,
        name: 'Replace Toilet Paper',
        description: 'Perform this miracle that only 1 in 4 flatmates can accomplish',
        xp_reward: 10,
        category: 'bathroom' as const,
      },
      {
        id: 9,
        name: 'Deep Clean Bathroom Floor',
        description: 'Mop away the evidence of questionable bathroom habits',
        xp_reward: 30,
        category: 'bathroom' as const,
      },

      // Living Areas
      {
        id: 10,
        name: 'Vacuum Living Room',
        description: "Suck up crumbs, hair, and your flatmate's broken dreams",
        xp_reward: 30,
        category: 'living' as const,
      },
      {
        id: 11,
        name: 'Dust All Surfaces',
        description: 'Make everything less... fuzzy',
        xp_reward: 25,
        category: 'living' as const,
      },
      {
        id: 12,
        name: 'Organize TV Remote Area',
        description: 'Create a system where remotes can actually be found',
        xp_reward: 20,
        category: 'living' as const,
      },
      {
        id: 13,
        name: 'Deep Clean Couch Cushions',
        description: 'Discover lost treasures and unspeakable horrors',
        xp_reward: 60,
        category: 'living' as const,
      },

      // General Tasks
      {
        id: 14,
        name: 'Take Out Trash',
        description: "Actually remember it's bin day instead of realizing at 11 PM",
        xp_reward: 20,
        category: 'general' as const,
      },
      {
        id: 15,
        name: 'Do Laundry Load',
        description: 'Wash clothes without turning everything an exciting new color',
        xp_reward: 35,
        category: 'general' as const,
      },
      {
        id: 16,
        name: 'Clean Windows',
        description: 'Remove mysterious smudges and let actual sunlight in',
        xp_reward: 40,
        category: 'general' as const,
      },
      {
        id: 17,
        name: 'Sweep & Mop All Floors',
        description: 'The ultimate test of endurance and commitment',
        xp_reward: 65,
        category: 'general' as const,
      },
      {
        id: 18,
        name: 'Buy Household Supplies',
        description: 'Remember what you went to the store for (toilet paper, always toilet paper)',
        xp_reward: 30,
        category: 'general' as const,
      },
    ]
  },
}
