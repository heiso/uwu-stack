import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'

import { defineConfig } from 'vite'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      serverModuleFormat: 'esm',
      buildDirectory: 'build/vite-server',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "app/ui/style/_global.scss";`,
      },
    },
  },
})
