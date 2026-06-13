// Bun's runtime injects a partial `localStorage` global (missing `clear`) that
// even shadows happy-dom's `window.localStorage`. Install a complete, in-memory
// Storage so storage behaves like a browser under `bun run test`.
class MemoryStorage implements Storage {
  #map = new Map<string, string>()

  get length(): number {
    return this.#map.size
  }
  clear(): void {
    this.#map.clear()
  }
  getItem(key: string): string | null {
    return this.#map.has(key) ? this.#map.get(key)! : null
  }
  key(index: number): string | null {
    return Array.from(this.#map.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.#map.delete(key)
  }
  setItem(key: string, value: string): void {
    this.#map.set(key, String(value))
  }
}

for (const name of ['localStorage', 'sessionStorage'] as const) {
  Object.defineProperty(globalThis, name, {
    value: new MemoryStorage(),
    writable: true,
    configurable: true,
  })
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, name, {
      value: globalThis[name],
      writable: true,
      configurable: true,
    })
  }
}
