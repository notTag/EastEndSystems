declare module 'three'
declare module 'vanta/dist/vanta.net.min.js' {
  const create: (options: Record<string, unknown>) => { destroy(): void; resize(): void }
  export default create
}

declare module 'vanta/dist/vanta.cells.min.js' {
  const create: (options: Record<string, unknown>) => { destroy(): void; resize(): void }
  export default create
}
