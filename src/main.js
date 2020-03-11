import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import { task , web3api ,det,token_address,abi} from '@/assets/test'
import getWeb3apiConfit from '@/assets/test'

import VueResource from 'vue-resource'
import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/index.scss';
import $post from '@/utils/http-post';
import {throttle} from 'loadsh';

Vue.use(Vant);
Vue.use(VueResource);
Vue.config.productionTip = false;

getWeb3apiConfit()
.then(data => {
    Object.assign(Vue.prototype, data, { $post, $throttle: throttle });
    new Vue({
        router,
        render: h => h(App),
    }).$mount('#app')
})
.catch(() => {

})





