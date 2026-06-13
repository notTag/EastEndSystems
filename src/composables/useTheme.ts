import { ref, watch, type Ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

// Module-level singleton so every caller shares the same reactive theme.
const theme: Ref<Theme> = ref(resolveInitialTheme())
let initialised = false

function resolveInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage unavailable — fall through */
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function apply(value: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', value === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore persistence failures */
  }
}

export function useTheme() {
  if (!initialised) {
    initialised = true
    apply(theme.value)
    watch(theme, apply)
  }

  function setTheme(value: Theme): void {
    theme.value = value
  }

  function toggleTheme(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, setTheme, toggleTheme }
}
