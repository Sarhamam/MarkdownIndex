# Noetic Eidos Documentation

> Geometric AI architectures combining spectral analysis, information geometry, and zeta function theory.

This is the documentation site for the Noetic Eidos project, built with [VitePress](https://vitepress.dev).

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deploy to AWS Amplify

### Option 1: Amplify Console (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click **New App** → **Host web app**
4. Connect your repository
5. Amplify auto-detects `amplify.yml`
6. Click **Save and deploy**

### Option 2: Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
amplify publish
```

## Structure

```
docs/
├── index.md              # Home page
├── guide/
│   ├── index.md          # Getting started
│   ├── core-concepts.md  # Mathematical foundations
│   ├── zetaformer.md     # Attention mechanism
│   ├── spectral-memory.md # Memory system
│   ├── personas.md       # Routing system
│   └── ...
├── api/
│   ├── index.md          # API overview
│   ├── zetaformer.md     # ZetaFormer API
│   └── ...
├── research/
│   ├── index.md          # Research overview
│   └── ...
└── .vitepress/
    ├── config.js         # VitePress config
    └── theme/
        └── custom.css    # Noetic Eidos styling
```

## Adding Documentation

1. Create a `.md` file in the appropriate directory
2. Add frontmatter if needed
3. Update `config.js` sidebar if adding to navigation

Example:

```markdown
# My New Page

Content goes here...
```

## Customization

- **Theme**: Edit `docs/.vitepress/theme/custom.css`
- **Navigation**: Edit `docs/.vitepress/config.js`
- **Home page**: Edit `docs/index.md`

## License

MIT
