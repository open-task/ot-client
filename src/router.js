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
      path: '/tasklist/:type',
      name: 'tasklist',
      component: () => import('@/views/OfferList.vue')
    },
      {
      path: '/userinfo/:id',
      name: 'userinfo',
      component: () => import('@/views/myInfo.vue')
    },
    {
      path: '/talentmarket/:skill',
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
      path: '/detail/:id',
      name: 'detail',
      component: OfferDetail
    },
      {
      path: '/history/:type',
      name: 'history',
      component:  () => import('@/views/TradeHistory.vue')
    },
    {
      path: '/funding',
      name: 'funding',
      component:  () => import('@/views/notice/crowd-funding.vue')
    },
    {
      path: '/msg',
      name: 'msg',
      component:  () => import('@/views/notice/leave-msg.vue')
    },
      {
      path: '/gamecard',
      name: 'gamecard',
      component:  () => import('@/views/GameCard.vue')
    },
    {
      path: '/bount',
      name: 'bount',
      component:  () => import('@/views/notice/bount-test.vue')
    },
  ]
})
