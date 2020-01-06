import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import OfferList from '@/views/OfferList.vue'
import CreateOffer from '@/views/CreatOffer.vue'
import OfferDetail from '@/views/OfferDetail.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue'),
      },
        {
            path: '/tasklist',
            name: 'tasklist',
            component: () => import('@/views/task/task-list.vue')
    },
        {
          path: '/taskcreate',
          name: 'taskcreate',
          component: () => import('@/views/task/task-create.vue')
    },
        {
          path: '/taskdetail/:id',
          name: 'taskdetail',
          component: () => import('@/views/task/task-detail.vue')
    },
        {
          path: '/tasksolution/:id',
          name: 'tasksolution',
          component: () => import('@/views/task/task-solution-submit.vue')
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
    }, {
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
            component: () => import('@/views/TradeHistory.vue')
    },
        {
            path: '/funding',
            name: 'funding',
            component: () => import('@/views/notice/crowd-funding.vue')
    },
        {
            path: '/msg',
            name: 'msg',
            component: () => import('@/views/notice/leave-msg.vue')
    },
        {
            path: '/gamecard',
            name: 'gamecard',
             meta: {
                title: "求购人物卡"
            },
            component: () => import('@/views/GameCard.vue'),
           
    },
        {
            path: '/bount',
            name: 'bount',
            component: () => import('@/views/notice/bount-test.vue')
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
      component:  () => import('@/views/talent/talent-classify.vue')
    },
    {
      path: '/talentcreate',
      name: 'talentcreate',
      component:  () => import('@/views/talent/talent-create.vue')
    },
    {
      path: '/talentlist/:type',
      name: 'talentlist',
      component:  () => import('@/views/talent/talent-list.vue')
    },
    {
      path: '/talentdetail/:id',
      name: 'talentdetail',
      component:  () => import('@/views/talent/talent-detail.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component:  () => import('@/views/personal/my-info.vue')
    },
    {
      path: '/aboutus',
      name: 'personal',
      component:  () => import('@/views/personal/about-us.vue')
    },
    {
      path: '/budget',
      name: 'budget',
      component:  () => import('@/views/personal/my-budget.vue')
    },
    {
      path: '/budgetlist/:type',
      name: 'budgetlist',
      component:  () => import('@/views/personal/budget-list.vue')
    }

  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default  router
