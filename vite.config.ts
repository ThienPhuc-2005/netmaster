import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves the app under /<repo-name>/. The deploy workflow
  // passes GHPAGES_BASE="/<repo-name>/" so the base always matches the
  // actual repo name; local dev and plain `vite build` stay at '/'.
  base: process.env.GHPAGES_BASE ?? '/',
  // Preview harness assigns a free port via PORT when 5173 is taken.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
