module.exports = ({file, options, env}) => ({
  plugins: {
    'autoprefixer': {},
    'postcss-normalize': {
      forceImport: true
    },
    'cssnano': env === 'production' ? {} : false
  }
});