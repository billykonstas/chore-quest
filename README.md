# ChoreQuest | Gamified Chore Quest Log

A gamified dashboard for managing and tracking flatmate chores.
Built with **Vue 3**, **TypeScript**, **Pinia**, and **TailwindCSS**.

---

## Project Setup

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## Features

The dashboard is divided into **5 main sections**:

1. **Profile Information**
   Displays user's name, level, and avatar.

2. **Achievements List**
   Shows locked and unlocked achievements. Each achievement contains:

    * Title
    * Description
    * Icon

3. **Circular Progress Indicator**
   Animated visual representation of the current XP level, including:

    * Current XP
    * XP needed for the next level
    * Level progress animation

4. **Stats**
   General statistics about the user, such as:

    * Total chores completed
    * Chores completed per room (e.g., kitchen, bathroom)
    * Daily streak (hardcoded)

5. **Task List**
   Daily tasks that users can complete to earn XP by clicking each task.

---

## Extra Features

* Loading state animation
* Error state with a button to manually trigger it
* Fully responsive design
* Achievements animations
* XP gain animation
* Level up animation

---

## How to Interact

* Click on tasks to complete them and gain XP.
* Click the **`Error` button** in the top-right corner to trigger the error state.
* Completing two different **kitchen tasks (yellow)** unlocks the **"Kitchen Ninja"** achievement.
* Completing two different **bathroom tasks (blue)** unlocks the **"Bathroom Brave"** achievement.
* Surpassing the XP threshold triggers the level-up animation and updates your level.

---

## Preview

