import { defineConfig, type UserConfig } from 'vite'
import purgecss from '@fullhuman/postcss-purgecss'
import cssnano from 'cssnano'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command }): UserConfig => {
  const isProduction = command === 'build'

  // Build a properly typed PostCSS plugins array
  const postcssPlugins: import('postcss').AcceptedPlugin[] = []

  if (isProduction) {
    postcssPlugins.push(
      purgecss({
        content: [
          path.resolve(__dirname, './src/**/*.html'),
          path.resolve(__dirname, './src/**/*.tsx'),
          path.resolve(__dirname, './src/**/*.jsx'),
        ],
        safelist: {
          standard: [
            'container',
            'row',
            'col',
            'd-flex',
            'd-grid',
            'text-center',
            'bg-primary',
            'text-primary',
            // add any other global classes here
          ],
        },
        defaultExtractor: (content) => content.match(/[\w-/:]+/g) || [],
      })
    )
  }

  // Always include cssnano for minification
  postcssPlugins.push(
    cssnano({
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          zindex: false,
          colormin: false,
        },
      ],
    }) as import('postcss').AcceptedPlugin
  )

  return {
    plugins: [svgr()],

    css: {
      postcss: {
        plugins: postcssPlugins,
      },
    },

    build: {
      sourcemap: false,
      minify: 'esbuild',
    },

    optimizeDeps: {
      include: ['sass'],
      exclude: ['autoprefixer'],
    },
  }
})
