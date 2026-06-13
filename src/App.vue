<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

// East End Systems is dark-only; the no-flash guard in index.html pins the
// theme. We still initialise the composable so the class stays consistent.
useTheme()
</script>

<template>
  <RouterView />
</template>
