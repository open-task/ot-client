import { Toast } from 'vant';
export default function httpPost(url, params = {}) {
    return new Promise((resolve, reject) => {
        this.$http.post(url, params)
        .then(res => {
            if( res && res.ok ) {
                return resolve(res.body);
            }
            reject(res)
        })
        .catch(err => {
            Toast({
                message: '加载失败，请稍后重试'
            })
        })
    })  
}