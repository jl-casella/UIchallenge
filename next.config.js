// next.config.js
const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')
const withTranspileModules = require('next-transpile-modules')

const nextConfig = {
  babelConfigFile: '../babel.config.js',
}

module.exports = withPlugins(
  [
    withTranspileModules,
    withCustomBabelConfigFile,
    withFonts,
    withImages,
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]',
        },
      },
    ],
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]',
        },
      },
    ],
  ],
  nextConfig
)
