<script setup lang="ts">
const options = defineModel<{
  color1: string
  color2: string
  size: number
  speed: number
}>({ required: true })
</script>

<template>
  <details
    class="border-muted-teal bg-background/95 absolute right-6 bottom-6 z-20 w-64 border p-4 text-sm"
    open
  >
    <summary class="cursor-pointer">Cells background controls</summary>
    <div class="mt-4 grid gap-3">
      <label class="flex items-center justify-between"
        >Color 1 <input v-model="options.color1" type="color"
      /></label>
      <label class="flex items-center justify-between"
        >Color 2 <input v-model="options.color2" type="color"
      /></label>
      <label
        >Size: {{ options.size
        }}<input
          v-model.number="options.size"
          class="block w-full"
          type="range"
          min="0.2"
          max="5"
          step="0.1"
      /></label>
      <label
        >Speed: {{ options.speed
        }}<input
          v-model.number="options.speed"
          class="block w-full"
          type="range"
          min="0"
          max="5"
          step="0.1"
      /></label>
    </div>
  </details>
</template>
