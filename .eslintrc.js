module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'no-console': false,
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
      },
    ],
  },
};
