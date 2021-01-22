module.exports = {
  coverageDirectory: './.coverage/',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!.*rc.js',
    '!*.config.js',
    '!**/.jest/**',
    '!**/.next/**',
    '!**/.coverage/**',
    '!**/*story.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
    '.+\\.(svg)$': '<rootDir>/.jest/file-loader.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/file-loader.js'
  },
  setupFiles: ['jest-prop-type-error'],
  automock: false,
  collectCoverage: true
}
