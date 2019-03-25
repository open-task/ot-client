import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { task , web3api ,det} from '@/assets/test'

import VueResource from 'vue-resource'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueResource);
Vue.config.productionTip = false

Vue.prototype.$task = task
Vue.prototype.$web3api = web3api
Vue.prototype.$det = det
//var task,det
//task = web3api.eth.contract(abi_).at(token_address);

//let task = {a:"b"}

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')


