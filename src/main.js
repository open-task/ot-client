import Vue from 'vue';
import router from './router/index';
import App from './App.vue';
import VueResource from 'vue-resource';
import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/index.scss';
import $post from '@/utils/http-post';
import {throttle} from 'loadsh';
import filters from '@/filters';
import { getMetamaskAccount, getWeb3Data } from '@/assets/test';

Vue.use(Vant);
Vue.use(VueResource);
Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.prototype.$filters = filters; //在模板中使用
Vue.prototype.$post = $post;
Vue.prototype.$throttle = throttle;
Object.assign(Vue.prototype, getWeb3Data());
getMetamaskAccount();

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');










