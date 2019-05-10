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
        component:() => import('@/views/Home.vue'),
    },
      {
      path: '/tasklist',
      name: 'tasklist',
      component: () => import('@/views/OfferList.vue')
    },
      {
      path: '/talentmarket',
      name: 'talentmarket',
      component: () => import('@/views/TalentMarket.vue')
    },{
      path: '/talentmap',
      name: 'talentmap',
      component: () => import('@/views/TalentMap.vue')
    },
      {
      path: '/submittalent',
      name: 'submittalent',
      component: () => import('@/views/SubmitTalent.vue')
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
