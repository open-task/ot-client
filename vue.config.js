 module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'http://39.100.36.238'
         },
         }
     }
 }
