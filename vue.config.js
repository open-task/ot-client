 module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'http://opentask.chainpower.io'
         },
         }
         

     }
 }
