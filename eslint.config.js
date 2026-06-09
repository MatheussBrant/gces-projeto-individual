var js = require('@eslint/js');

var browserGlobals = {
  Image: 'readonly',
  Movement: 'readonly',
  URL: 'readonly',
  alert: 'readonly',
  clearInterval: 'readonly',
  console: 'readonly',
  document: 'readonly',
  io: 'readonly',
  mk: 'readonly',
  navigator: 'readonly',
  prompt: 'readonly',
  setInterval: 'readonly',
  setTimeout: 'readonly',
  window: 'readonly'
};

var nodeGlobals = {
  __dirname: 'readonly',
  console: 'readonly',
  exports: 'readonly',
  process: 'readonly',
  require: 'readonly'
};

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'server/node_modules/**',
      'coverage/**',
      'dist/**',
      'build/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'commonjs',
      globals: nodeGlobals
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }]
    }
  },
  {
    files: ['game/src/**/*.js'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      globals: browserGlobals
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }]
    }
  }
];

