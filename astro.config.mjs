import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import AstroPWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    AstroPWA({
      registerType: "autoUpdate",
      // workbox: { navigateFallback: '/404' },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Tymsa',
        short_name: 'Tymsa',
        description: 'A time-tracking app',
        theme_color: '#E56717',
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      },
      // devOptions: {
      //   enabled: true
      // },
    }),
    svelte(),
    tailwind()
  ],
  adapter: node({
    mode: "standalone"
  })
});