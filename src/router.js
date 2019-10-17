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
      path: '/answerlist',
      name: 'answerlist',
      component:  () => import('@/views/answer/answer-list.vue')
    },
    {
      path: '/answerdetail/:id',
      name: 'answerdetail',
      component:  () => import('@/views/answer/answer-detail.vue')
    },
    {
      path: '/answersubmit/:id',
      name: 'answerdanswersubmitetail',
      component:  () => import('@/views/answer/answer-submit.vue')
    },
    {
      path: '/answercreate',
      name: 'answercreate',
      component:  () => import('@/views/answer/answer-create.vue')
    },
    {
      path: '/talentclassify',
      name: 'talentclassify',
      component:  () => import('@/views/talent-market/talent-classify.vue')
    },
    {
      path: '/talentlist',
      name: 'talentlist',
      component:  () => import('@/views/talent-market/talent-list.vue')
    },
    {
      path: '/talentdetail/:id',
      name: 'talentdetail',
      component:  () => import('@/views/talent-market/talent-detail.vue')
    }
    
  ]
})
