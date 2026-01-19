import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Noetic Eidos',
  description: 'Geometric AI architectures combining spectral analysis, information geometry, and zeta function theory.',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#a855f7' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Noetic Eidos Documentation' }],
    ['meta', { property: 'og:description', content: 'Geometric intelligence frameworks democratizing information geometry, spectral methods, and zeta-inspired AI design.' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Research', link: '/research/' },
      { 
        text: 'Links',
        items: [
          { text: 'GitHub', link: 'https://github.com/noetic-eidos' },
          { text: 'Main Site', link: 'https://noeticeidos.com' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Noetic Eidos?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Core Concepts', link: '/guide/core-concepts' }
          ]
        },
        {
          text: 'Architecture',
          items: [
            { text: 'System Overview', link: '/guide/architecture' },
            { text: 'ZetaFormer', link: '/guide/zetaformer' },
            { text: 'Spectral Memory', link: '/guide/spectral-memory' },
            { text: 'Personas', link: '/guide/personas' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'κζ Dynamics', link: '/guide/kappa-zeta' },
            { text: 'Fisher-Rao Geometry', link: '/guide/fisher-rao' },
            { text: 'Voronoi Quantization', link: '/guide/voronoi' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'ZetaFormer', link: '/api/zetaformer' },
            { text: 'SpectralMemory', link: '/api/spectral-memory' },
            { text: 'PersonaRouter', link: '/api/persona-router' }
          ]
        }
      ],
      '/research/': [
        {
          text: 'Research',
          items: [
            { text: 'Papers', link: '/research/' },
            { text: 'Mathematical Foundations', link: '/research/foundations' },
            { text: 'Zeta Function Theory', link: '/research/zeta-theory' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/noetic-eidos' }
    ],

    footer: {
      message: 'Democratizing geometric intelligence.',
      copyright: '© 2026 Noetic Eidos Project'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  },

  markdown: {
    math: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
