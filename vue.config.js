const path = require('path');
module.exports = {
    devServer: {
        proxy: {
            '/v1': {
                target: 'https://bountinet.com/'
            },
            '/skill': {
                target: 'http://39.100.60.153/'
                // target: 'https://bountinet.com/'
            },
            '/question': {
                target: 'http://39.100.60.153/'
                // target: 'https://bountinet.com/'
            },
        }
    },
    filenameHashing: true
}
