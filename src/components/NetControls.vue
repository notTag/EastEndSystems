<script setup lang="ts">
const netOptions = defineModel<{
  color: string
  backgroundColor: string
  points: number
  maxDistance: number
  spacing: number
  showDots: boolean
}>({ required: true })
</script>
<template>
  <details
    class="border-muted-teal bg-background/95 absolute right-6 bottom-6 z-20 w-64 border p-4 text-sm"
  >
    <summary class="cursor-pointer">Net background controls</summary>
    <div class="mt-4 grid gap-3">
      <label class="flex items-center justify-between"
        >Color <input v-model="netOptions.color" type="color"
      /></label>
      <label class="flex items-center justify-between"
        >Background color <input v-model="netOptions.backgroundColor" type="color"
      /></label>
      <label
        >Points: {{ netOptions.points
        }}<input
          v-model.number="netOptions.points"
          class="block w-full"
          type="range"
          min="1"
          max="20"
          step="1"
      /></label>
      <label
        >Max distance: {{ netOptions.maxDistance
        }}<input
          v-model.number="netOptions.maxDistance"
          class="block w-full"
          type="range"
          min="1"
          max="40"
          step="1"
      /></label>
      <label
        >Spacing: {{ netOptions.spacing
        }}<input
          v-model.number="netOptions.spacing"
          class="block w-full"
          type="range"
          min="1"
          max="40"
          step="1"
      /></label>
      <label class="flex items-center gap-2"
        ><input v-model="netOptions.showDots" type="checkbox" /> Show dots</label
      >
    </div>
  </details>
</template>
