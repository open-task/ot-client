import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { task , web3api ,det,token_address,abi} from '@/assets/test'

import VueResource from 'vue-resource'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueResource);
Vue.config.productionTip = false


Vue.prototype.$task = task
Vue.prototype.$web3api = web3api
Vue.prototype.$det = det
Vue.prototype.$token_address = token_address
Vue.prototype.$abi = abi




new Vue({
    router,
    render: h => h(App),
}).$mount('#app')


