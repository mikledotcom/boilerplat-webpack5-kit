const path = require('path')

module.exports = {
  // Source files
                    src: path.resolve(__dirname, './src/index.js'),

  // Production build files
    build: path.resolve(__dirname, './dist/assets/'),

  // Static files that get copied to build folder
             public: path.resolve(__dirname, '/'),
}
