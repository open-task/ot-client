import Vue from 'vue'
import Router from 'vue-router'
import { checkBrowsers, getMetamaskAccount } from '@/assets/test';
import { Toast } from 'vant';

Vue.use(Router)

// isVaid: true 的路由进入前需要校验metamask的登录
let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path:'*',
        name: '404',
        component: () => import('@/views/error/page404.vue'),
        meta: {
          title: '访问出错404'
        }
      },
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: 'Bountinet™'
        }
      },
      // 任务
      {
        path: '/taskcreate',
        name: 'taskcreate',
        component: () => import('@/views/task/task-create.vue'),
        meta: {
          title: '创建任务',
          isVaid: true
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
        path: '/taskdetail/:id',
        name: 'taskdetail',
        component: () => import('@/views/task/task-detail.vue'),
        meta: {
          title: '任务详情',
          isVaid: true
        }
      },
      {
        path: '/tasksolution/:id',
        name: 'tasksolution',
        component: () => import('@/views/task/task-solution-submit.vue'),
        meta: {
          title: '解决方案',
          isVaid: true
        }
      },
      // 公告
      {
        path: '/bount',
        name: 'bount',
        component: () => import('@/views/notice/bount-test.vue'),
        meta: {
          title: "Bountinet™"
        }
      },
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
          title: '留言',
          isVaid: true
        }   
      },
      {
        path: '/gamecard',
        name: 'gamecard',
        component: () => import('@/views/notice/game-card.vue'),
        meta: {
          title: "求购人物卡"
        }
      },
      {
        path: '/auction',
        name: 'auction',
        component: () => import('@/views/notice/auction.vue'),
        meta: {
          title: "币名拍卖"
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
      // 问答
      {
        path: '/answercreate',
        name: 'answercreate',
        component:  () => import('@/views/answer/answer-create.vue'),
        meta: {
          title: "创建问答",
          isVaid: true
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
          title: "问答详情",
          isVaid: true
        }
      },
      {
        path: '/answersubmit/:id',
        name: 'answersubmit',
        component:  () => import('@/views/answer/answer-submit.vue'),
        meta: {
          title: "提交问答",
          isVaid: true
        }
      },
      // 人才
      {
        path: '/talentcreate',
        name: 'talentcreate',
        component:  () => import('@/views/talent/talent-create.vue'),
        meta: {
          title: "提交我的技能",
          isVaid: true
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
      // 我的
      {
        path: '/personal',
        name: 'personal',
        component:  () => import('@/views/personal/my-info.vue'),
        meta: {
          title: "我的",
          isVaid: true
          
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
      // {
      //   path: '/temp',
      //   name: 'auction',
      //   component: () => import('@/views/temp/test.vue')
      // },
      {
        path: '/budgetlist/:type/:total',
        name: 'budgetlist',
        component:  () => import('@/views/personal/budget-list.vue'),
        meta: {
          title: "Bountinet™",
          isVaid: true
        }
      }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断metamask是否登出
  // const eth = checkBrowsers();
  // if( eth && !eth.coinbase ) {
  //   Vue.prototype.$account = '';
  // }
  if( !Vue.prototype.$account ) {
    if( to.meta.isVaid ) {
      if( !from.name ) {
        next({ path: '/' });
      }else {
        let _deffer;
        (_deffer = getMetamaskAccount()) && _deffer.then((data) => {
          if( data && (Vue.prototype.$account = data[0]) ) {
            next({ path: to.path });
          }
        })
        Toast({ message: '请打开metamask登录！' })
        next(false);
      }
    }else {
      next()
    }
  }else {
    next()
  }
})

router.afterEach((to) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0);
});
export default router
