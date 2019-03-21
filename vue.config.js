 module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'http://kovan3.opentask.chainpower.io'
         },
         }
         

     }
 }
