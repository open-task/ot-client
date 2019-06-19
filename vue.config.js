 module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'http://47.92.64.129'
         },
             '/skill': {
             target: 'http://47.92.64.129'
         },
         }
     }
 }
