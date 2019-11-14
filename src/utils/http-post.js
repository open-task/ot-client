export default function httpPost(url, params = {}) {
    return new Promise((resolve, reject) => {
        this.$http.post(url, params).then(res => {
            if( res.ok ) {
                resolve(res.body);
            }else {
                reject(res)
            }
        }).catch(err => {
            reject(res)
        })
    })  
}