import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('toggles the dark class on the root element', async () => {
    const { theme, toggleTheme } = useTheme()
    const start = theme.value

    toggleTheme()
    await Promise.resolve()

    expect(theme.value).not.toBe(start)
    expect(document.documentElement.classList.contains('dark')).toBe(theme.value === 'dark')
  })

  it('persists the choice to localStorage', async () => {
    const { setTheme } = useTheme()

    // Set a known starting value first so the change to 'dark' always fires the
    // persistence watcher regardless of the shared singleton's prior state.
    setTheme('light')
    await Promise.resolve()
    setTheme('dark')
    await Promise.resolve()

    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
