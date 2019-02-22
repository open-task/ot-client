 module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'http://opentask.api.chainpower.io:8080'
         },
         }
         

     }
 }
