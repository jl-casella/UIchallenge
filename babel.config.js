const { declare } = require('@babel/helper-plugin-utils')
const path = require('path')

const custom = declare(api => {
  api.assertVersion(7)

  return {
    plugins: [
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-proposal-optional-chaining'),
      require('@babel/plugin-proposal-object-rest-spread'),
      require('@babel/plugin-proposal-nullish-coalescing-operator'),
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            pages: path.join(__dirname, './src/pages'),
            components: path.join(__dirname, './src/components')
          }
        }
      ]
    ]
  }
})

module.exports = api => {
  const preset_env = api.env('test')
    ? [['@babel/preset-env', { modules: 'commonjs' }]]
    : []

  return {
    presets: [...preset_env, custom, 'next/babel'],
    plugins: [['styled-components', { ssr: true }]]
  }
}
