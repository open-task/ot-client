const path = require('path'); 
module.exports = {
     devServer: {
         proxy:{
             '/v1': {
             target: 'https://bountinet.com/'
         },
             '/skill': {
             target: 'https://bountinet.com/'
         },
         }
     },
      filenameHashing:true
 }
