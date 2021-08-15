module.exports = {
  extends: '@snowpack/app-scripts-react',

  mount: {
    public: '/',
    src: '/_dist_',
  },

  plugins: ['@snowpack/plugin-babel'],

  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],

  optimize: {
    // bundle: true,
    minify: true,
    target: 'es2018',
  },

  packageOptions: {
    polyfillNode: true,
  },

  devOptions: {
    port: 3000,
    src: 'src',
    bundle: false,
  },

  buildOptions: {
    /* ... */
  },

  alias: {
    src: './src',
  },
};
