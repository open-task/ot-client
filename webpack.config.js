// webpack v4
const path = require('path');
console.log(hash)
module.exports = {
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  }
  
};