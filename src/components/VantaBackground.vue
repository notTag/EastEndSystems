<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  effect: 'net' | 'cells'
  options?: Record<string, string | number | boolean>
}>()
const host = useTemplateRef<HTMLDivElement>('host')
let instance: { destroy(): void; resize(): void } | undefined
let resizeObserver: ResizeObserver | undefined
let generation = 0
let motion: MediaQueryList | undefined

function clear() {
  const current = instance
  instance = undefined
  try {
    current?.destroy()
  } catch {
    // A partially initialized WebGL renderer may already have removed its canvas.
  }
  host.value?.replaceChildren()
  host.value?.removeAttribute('style')
}

async function initialize() {
  const version = ++generation
  clear()
  if (!host.value || motion?.matches) return
  try {
    const [THREE, effect] = await Promise.all([
      import('three'),
      props.effect === 'net'
        ? import('vanta/dist/vanta.net.min.js')
        : import('vanta/dist/vanta.cells.min.js'),
    ])
    if (version !== generation || !host.value) return
    instance = effect.default({
      el: host.value,
      THREE,
      color: 0x4a7075,
      backgroundColor: 0x101414,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      ...props.options,
    })
    host.value.querySelector('canvas')?.addEventListener('webglcontextlost', fallback)
  } catch {
    // The section's CSS background remains visible if loading or WebGL fails.
    if (version === generation) clear()
  }
}

function fallback() {
  ++generation
  clear()
}

watch(() => props.options, initialize, { deep: true })
onMounted(() => {
  resizeObserver = new ResizeObserver(() => instance?.resize())
  if (host.value) resizeObserver.observe(host.value)
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', initialize)
  void initialize()
})
onBeforeUnmount(() => {
  ++generation
  resizeObserver?.disconnect()
  motion?.removeEventListener('change', initialize)
  clear()
})
</script>

<template>
  <div ref="host" aria-hidden="true" class="pointer-events-none absolute inset-0 z-0" />
</template>
