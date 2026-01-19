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
      { text: 'Agents Context', link: '/context/' },
      { text: 'Research', link: '/research/' },
      { 
        text: 'Links',
        items: [
          { text: 'GitHub', link: 'https://github.com/sarhamam/noeticeidos' },
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
      ],
      '/context/': [
        {
          text: 'Agents Context',
          items: [
            { text: 'Overview', link: '/context/' },
            { text: 'Usage Cookbook', link: '/context/usage_cookbook' }
          ]
        },
        {
          text: 'Agents',
          items: [
            { text: 'Applied Mathematician', link: '/context/agents/applied-mathematician' },
            { text: 'Theoretical Mathematician', link: '/context/agents/theoretical-mathematician' },
            { text: 'Resonance Ontologist', link: '/context/agents/resonance-ontologist' }
          ]
        },
        {
          text: 'Skills',
          items: [
            { text: 'Noetic Mathematician', link: '/context/skills/noetic-mathematician/SKILL' },
            { text: 'Applied', link: '/context/skills/noetic-mathematician/applied' },
            { text: 'Theoretical', link: '/context/skills/noetic-mathematician/theoretical' },
            { text: 'Explorer', link: '/context/skills/noetic-mathematician/explorer' },
            { text: 'Resonance', link: '/context/skills/noetic-mathematician/resonance' }
          ]
        },
        {
          text: 'Mathematician',
          collapsed: true,
          items: [
            { text: 'Algebra', link: '/context/mathematician/algebra' },
            { text: 'Geometry', link: '/context/mathematician/geometry' },
            { text: 'Topology', link: '/context/mathematician/topology' },
            { text: 'Dynamics', link: '/context/mathematician/dynamics' },
            { text: 'Graphs', link: '/context/mathematician/graphs' },
            { text: 'Statistics', link: '/context/mathematician/stats' },
            { text: 'Solvers', link: '/context/mathematician/solvers' }
          ]
        },
        {
          text: 'Resonance Ontologist',
          collapsed: true,
          items: [
            { text: 'Index', link: '/context/resonance_ontologist/INDEX' },
            { text: 'Quickstart', link: '/context/resonance_ontologist/QUICKSTART' },
            { text: 'Orbital Resonances', link: '/context/resonance_ontologist/01_orbital_resonances' },
            { text: 'Spectral Signatures', link: '/context/resonance_ontologist/02_spectral_signatures' },
            { text: 'Mathematics', link: '/context/resonance_ontologist/03-07_mathematics_consolidated' },
            { text: 'Notation Reference', link: '/context/resonance_ontologist/09_notation_reference' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sarhamam/noeticeidos' }
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
  },

  ignoreDeadLinks: [
    // Context files have consolidated sections with legacy internal links
    /^\/context\//,
    // Relative links within context reference materials
    /^\.\//
  ]
})
