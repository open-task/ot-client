import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import OfferList from '@/views/OfferList.vue'
// import CreateOffer from '@/views/CreatOffer.vue'
// import OfferDetail from '@/views/OfferDetail.vue'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: {
              title: 'Bountinet™'
            }
      },
        {
            path: '/tasklist',
            name: 'tasklist',
            component: () => import('@/views/task/task-list.vue'),
            meta: {
              title: '任务列表'
            }
    },
        {
          path: '/taskcreate',
          name: 'taskcreate',
          component: () => import('@/views/task/task-create.vue'),
          meta: {
            title: '创建任务'
          }
    },
        {
          path: '/taskdetail/:id',
          name: 'taskdetail',
          component: () => import('@/views/task/task-detail.vue'),
          meta: {
            title: '任务详情'
          }
    },
        {
          path: '/tasksolution/:id',
          name: 'tasksolution',
          component: () => import('@/views/task/task-solution-submit.vue'),
          meta: {
            title: '解决方案'
          }
    },
    //     {
    //         path: '/userinfo/:id',
    //         name: 'userinfo',
    //         component: () => import('@/views/myInfo.vue')
    // },
    //     {
    //         path: '/talentmarket/:skill',
    //         name: 'talentmarket',
    //         component: () => import('@/views/TalentMarket.vue')
    // }, {
    //         path: '/talentmap',
    //         name: 'talentmap',
    //         component: () => import('@/views/TalentMap.vue')
    // },
    //     {
    //         path: '/submittalent',
    //         name: 'submittalent',
    //         component: () => import('@/views/SubmitTalent.vue')
    // },
    //     {
    //         path: '/create',
    //         name: 'create',
    //         component: CreateOffer
    // },
    //     {
    //         path: '/detail/:id',
    //         name: 'detail',
    //         component: OfferDetail
    // },
    //     {
    //         path: '/history/:type',
    //         name: 'history',
    //         component: () => import('@/views/TradeHistory.vue')
    // },
        {
            path: '/funding',
            name: 'funding',
            component: () => import('@/views/notice/crowd-funding.vue'),
            meta: {
              title: '超零三国开始众筹了'
            }
    },
        {
            path: '/msg',
            name: 'msg',
            component: () => import('@/views/notice/leave-msg.vue'),
            meta: {
              title: '留言'
            }
            
    },
        {
            path: '/gamecard',
            name: 'gamecard',
            component: () => import('@/views/GameCard.vue'),
            meta: {
              title: "求购人物卡"
            }
           
    },
        {
            path: '/bount',
            name: 'bount',
            component: () => import('@/views/notice/bount-test.vue'),
            meta: {
              title: "Bountinet™"
            }
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      component: () => import('@/views/notice/notice-list.vue'),
      meta: {
        title: "公告列表"
      }
    },
    {
      path: '/answerlist',
      name: 'answerlist',
      component:  () => import('@/views/answer/answer-list.vue'),
      meta: {
        title: "问答列表"
      }
    },
    {
      path: '/answerdetail/:id',
      name: 'answerdetail',
      component:  () => import('@/views/answer/answer-detail.vue'),
      meta: {
        title: "问答详情"
      }
    },
    {
      path: '/answersubmit/:id',
      name: 'answerdanswersubmitetail',
      component:  () => import('@/views/answer/answer-submit.vue'),
      meta: {
        title: "提交问答"
      }
    },
    {
      path: '/answercreate',
      name: 'answercreate',
      component:  () => import('@/views/answer/answer-create.vue'),
      meta: {
        title: "创建问答"
      }
    },
    {
      path: '/talentclassify',
      name: 'talentclassify',
      component:  () => import('@/views/talent/talent-classify.vue'),
      meta: {
        title: "人才市场"
      }
    },
    {
      path: '/talentcreate',
      name: 'talentcreate',
      component:  () => import('@/views/talent/talent-create.vue'),
      meta: {
        title: "提交我的技能"
      }
    },
    {
      path: '/talentlist/:type',
      name: 'talentlist',
      component:  () => import('@/views/talent/talent-list.vue'),
      meta: {
        title: "人才市场"
      }
    },
    {
      path: '/talentdetail/:id',
      name: 'talentdetail',
      component:  () => import('@/views/talent/talent-detail.vue'),
      meta: {
        title: "TA的技能页"
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component:  () => import('@/views/personal/my-info.vue'),
      meta: {
        title: "我的"
      }
    },
    {
      path: '/aboutus',
      name: 'personal',
      component:  () => import('@/views/personal/about-us.vue'),
      meta: {
        title: "关于我们"
      }
    },
    {
      path: '/budget',
      name: 'budget',
      component:  () => import('@/views/personal/my-budget.vue'),
      meta: {
        title: "Bountinet™"
      }
    },
    {
      path: '/budgetlist/:type/:total',
      name: 'budgetlist',
      component:  () => import('@/views/personal/budget-list.vue'),
      meta: {
        title: "Bountinet™"
      }
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
