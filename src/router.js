import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OfferList from '@/views/OfferList.vue'
import CreateOffer from '@/views/CreatOffer.vue'
import OfferDetail from '@/views/OfferDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: OfferList
    },
      {
      path: '/create',
      name: 'create',
      component: CreateOffer
    },
       {
      path: '/detail',
      name: 'detail',
      component: OfferDetail
    },
     
    
  ]
})
