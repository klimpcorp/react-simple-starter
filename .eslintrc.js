module.exports = {
  extends: [
    "airbnb",
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['Assets', './src/assets'],
          ['Containers', './src/containers'],
          ['Components', './src/components'],
          ['BaseComponents', './src/components/base'],
        ],
        extensions: ['.js', '.jsx'],
      }
    }
  },
};
