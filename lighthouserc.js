module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': ['error', { minScore: 0.9 }],
        'service-worker': 'error',
        'installable-manifest': 'error',
        'apple-touch-icon': 'error',
        'maskable-icon': 'error',
        'offline-start-url': 'error',
        'works-offline': 'error',
        'viewport': 'error',
        'theme-color': 'error',
        'content-width': 'error',
        'image-alt': 'warn',
        'label': 'warn',
        'link-name': 'warn',
        'list': 'warn',
        'listitem': 'warn',
        'mainlandmark': 'warn',
        'region': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
