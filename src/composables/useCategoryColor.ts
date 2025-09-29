export function useCategoryColor() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kitchen':
        return {
          bg: 'bg-accent-yellow',
          text: 'text-accent-yellow',
        }
      case 'bathroom':
        return {
          bg: 'bg-accent-blue',
          text: 'text-accent-blue',
        }
      case 'living':
        return {
          bg: 'bg-accent-lavender',
          text: 'text-accent-lavender',
        }
      case 'general':
        return {
          bg: 'bg-accent-orange',
          text: 'text-accent-orange',
        }
      default:
        return {
          bg: 'bg-gray-400',
          text: 'text-gray-400',
        }
    }
  }

  return {
    getCategoryColor,
  }
}
