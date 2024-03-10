import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Aninix Docs',
      social: {
        github: 'https://github.com/aninix-inc/docs',
        discord: 'https://aninix.com/discord',
        'x.com': 'https://twitter.com/aninixapp',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Example Guide',
              link: '/guides/example/',
            },
          ],
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference',
          },
        },
        {
          label: 'Render API',
          autogenerate: {
            directory: 'render-api',
          },
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind(),
    react(),
  ],
})
