import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import { astroExpressiveCode } from '@astrojs/starlight/expressive-code'

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
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    react(),
    astroExpressiveCode(),
    mdx(),
  ],
})
