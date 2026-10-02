import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

/**
 * PREIshare TanStack Start app config.
 * Start 1.x in this repo is configured with the Vite plugin `tanstackStart()`,
 * which is the supported entry (there is no `@tanstack/react-start/config`).
 */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  // Vercel’s Supabase integration sets NEXT_PUBLIC_ names. Vite only
  // inlines prefixed vars into the browser bundle. Do not add an empty
  // prefix: that would ship server secrets such as the service role.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
})
