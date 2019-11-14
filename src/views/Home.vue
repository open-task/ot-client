<template>
    <div class="home has-tabbar">
        <div class="home-banner">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <router-link to='/bount'>
                        <img src="/img/banner.png" alt="" class="cover">
                    </router-link>
                </van-swipe-item>
                <van-swipe-item>
                    <router-link to='/funding'>
                        <img src="/img/banner02.png" alt="" class="cover">
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
        <van-notice-bar
            color="#666"
            background="#fff"
            style="margin-bottom: 10px"
        >
            <template slot="left-icon">
                <img class="bt-cell-icon" src="/img/adv-icon.png" alt="通知">
            </template>
            <van-tag plain round color="#7452F5" class="notice-tag">通知</van-tag>
            SERO平台全网唯一，商机无限！！！
        </van-notice-bar>
        <div class="home-access">
            <ul class="clearfix">
                <li>
                    <router-link to='/tasklist'>
                        <img src="/img/bt-access01.png" alt="任务列表">
                    </router-link>
                </li>
                <li>
                    <router-link to='/answerlist'>
                        <img src="/img/bt-access02.png" alt="问答列表">
                    </router-link>
                </li>
                <li>
                    <router-link to='/talentlist'>
                        <img src="/img/bt-access03.png" alt="人才技能列表">
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="home-nav">
            <ul class="clearfix">
                <li>
                    <router-link to="/talentlist/python">
                        <span class="home-nav-icon"><img src="/img/bt-nav01.png" alt="Python"></span>
                        <span class="home-nav-text">Python</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/talentlist/区块链">
                        <span class="home-nav-icon"><img src="/img/bt-nav02.png" alt="区块链"></span>
                        <span class="home-nav-text">区块链</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/talentlist/网页设计">
                        <span class="home-nav-icon"><img src="/img/bt-nav03.png" alt="网页设计"></span>
                        <span class="home-nav-text">网页设计</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/talentlist/UI设计">
                        <span class="home-nav-icon"><img src="/img/bt-nav04.png" alt="UI设计"></span>
                        <span class="home-nav-text">UI设计</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/talentclassify">
                        <span class="home-nav-icon"><img src="/img/bt-nav05.png" alt="查看更多"></span>
                        <span class="home-nav-text">查看更多</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="task-list bt-flex-scroller">
            <van-cell v-for="task in taskList" :key="task.mission_id">
                <template slot="title">
                    <van-row type="flex" justify="end">
                        <van-col span="18">
                            <h3>{{task.title}}</h3>
                            <p><span class="t-gray">{{task.time}}</span><span :class="{ ['t-' + task.type] : true }">待解决</span></p>
                        </van-col>
                        <van-col span="6">
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">DET</span>
                                <span class="pull-right t-warning">{{task.reward}}</span> 
                            </div>
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">提交</span>
                                <span class="pull-right t-warning">{{task.solution_num}}</span> 
                            </div>
                        </van-col>
                    </van-row>
                </template>
                <template slot="right-icon">
                    <van-button class="bt-btn" size="small" @click="handleTaskClick(task.mission_id)">查看</van-button>
                </template>
            </van-cell>
        </div>
        <bt-tabbar activeIndex="0"></bt-tabbar>
        
        <!-- <div class="header">
            <img src="/img/头部banner.png" alt="" class="cover">
        </div>
        <div class="skill-btn">
            <router-link to='/create'>
                <img src="/img/发布任务.png" style='margin-right:10px' alt="" class="btn">
            </router-link>
            <router-link to="/submittalent">
                <img src="/img/提交技能.png" alt="" class="btn">

            </router-link>
        </div>

        <van-notice-bar :scrollable="true" @click='go_ad' mode="link">
            超零三国风云起&nbsp;
            英雄为棋天下局
        </van-notice-bar>
        <div class="offer-list" @click='to_tasklist'>

            <offer-card v-for="offer in task_list" :offer='offer'></offer-card>


        </div>
        <div class="skills">
            <router-link class="skill" :to='`/talentlist/${skill.name}`' v-for='skill in skill_list'>
                <div>

                    <div class="title">{{skill.name}}</div>
                    <div class="state">已接单<span>{{skill.count}}</span>笔</div>
                </div>
            </router-link>

        </div>
        <div class="menu">
            <span @click='to_tasklist'>任务列表</span>

            <span>
                <router-link to='/talentmap'>人才市场</router-link>
            </span>
            <span @click='closed'>设置</span>
            <span><a href="https://shimo.im/docs/X8tXk6cjGC9Gg9qg/ ">帮助</a></span>
        </div>
        <a href="https://gitter.im/Bountinet/community">
            <div class="commun">
                <span class="btn"><img src="/img/聊天_ICON.png" alt="">加入社区</span>
                https://gitter.im/Bountinet/community
            </div>
        </a>
            <span @click='closed'>帮助</span>
        </div>
        <div class="commun">
            <span class="btn"><img src="/img/聊天_ICON.png" alt="">加入社区</span>
            https://gitter.im/Bountinet/commuunity
        </div> -->

    </div>
</template>

<script>
    import OfferCard from "@/components/OfferCard"
    import {ImagePreview} from 'vant'
    import BtTabbar from '@/components/BtTabbar';
    import getTaskData from '@/utils/get-taskdata';
    export default {
        components: {
            OfferCard,
            BtTabbar
        },
        name: 'home',
        data() {
            return {
                taskList: [],
                skillList: [],
            }
        },
        mounted() {
            // let self = this
            // self.$http.post("/skill/list_tasks", {
            //     type: 'all'
            // }).then(function(re) {
            //     let ms = re.body.missions.slice(0, 2)
            //     self.task_list = ms
            // })
            // self.$http.post("/skill/list_skills", {}).then(function(re) {
            //     let ss = re.body.skills.slice(0, 8)
            //     self.skill_list = ss

            // })

            this.$post('/skill/list_tasks', { type: 'all' }).then( res => {
                if( res.missions && res.missions.length ) {
                    this.taskList = res.missions.slice(0, 8).map( d => getTaskData(d) );
                }
            })
        },
        methods: {
            handleTaskClick(id) {
                this.$post('/v1/', {
                    "jsonrpc": "2.0",
                    "method": "GetMissionInfo",
                    "params": [id],
                    "id": "11"
                }).then( res => {
                    if( !res.result.block ) {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试',
                            position: 'bottom'
                        });
                    }else {
                        this.$router.push({ path: '/detail', params: { id } });
                    }
                })
            },

            to_tasklist:function(){
                let self = this
                self.$router.push({path:"/tasklist"})
            },
            closed:function(){
                alert('该板块暂未开放')
            },
            handleListLoad() {
                this.loading = true;
                setTimeout(() => {
                    //this.loading = false;
                }, 1000)
            },
            go_ad: function() {
                console.log(this)
                ImagePreview(
   ['http://tva1.sinaimg.cn/large/007X8olVly1g7qlrblmfij30u01fkb29.jpg'
  ]
);
            },
            to_tasklist: function() {
                let self = this
                self.$router.push({
                    name: "tasklist",
                    params: {
                        "type": "all"
                    }
                })
            },
            closed: function() {
                alert('该板块暂未开放')
            }
        }
    }

</script>
<style lang='scss'>
    .home {
        font-size: 14px;

        .home-banner {
            padding: 12px;
            
            .van-swipe {
                border-radius: 6px;
            }

            img {
                display: block;
                width: 100%;
            }
        }

        .home-access {
            padding: .2rem;
            background-color: #fff;
            ul {
                margin-right: -.16rem;
                li {
                    float: left;
                    margin-right: .16rem;
                    width: 2.26rem;
                    height: 1.82rem;
                    background-color: #fff;
                    box-shadow:0px 6px 10px 0px rgba(0, 0, 0, 0.08);
                    border-radius: .16rem;

                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }

        .notice-tag {
            line-height: 1;
            vertical-align: 1px;
        }

        .home-nav {
            padding: .2rem .2rem .4rem;
            overflow: hidden;
            background-color: #fff;
            ul {
                margin-right: -.2rem;
                li {
                    float: left;
                    margin-right: .2rem;
                    width: 1.26rem;
                    .home-nav-icon {
                        display: block;
                        width: 1.02rem;
                        height: 1.02rem;
                        position: relative;
                        margin-left: .12rem;
                        // border-radius: 50%;
                        // box-shadow:0px 12px 20px 0px rgba(0, 0, 0, 0.08);
                        // margin-bottom: .2rem;
                    }
                    .home-nav-text {
                        display: block;
                        width: 100%;
                        color: #999; 
                        text-align: center;
                    }
                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
    
    


    // .float {
    //     clear: both;
    // }

    // .home {
    //     .header {
    //         font-size: 0px;

    //         .cover {
    //             width: 100%;

    //         }
    //     }

    //     .commun {
    //         position: fixed;
    //         bottom: 0px;
    //         font-size: 13px;
    //         line-height: 30px;
    //         padding: 0px 10px;
    //         color: #888888;
    //         background-color: white;
    //         width: 100%;
    //         min-width: 375px;

    //         .btn {
    //             background-color: #34BC81;
    //             color: white;
    //             padding: 0px 10px;
    //             border-radius: 2px;
    //             font-size: 15px;

    //             img {
    //                 height: 15px;
    //                 margin-right: 10px;
    //                 vertical-align: middle;
    //             }
    //         }
    //     }

    //     .menu {
    //         position: fixed;
    //         bottom: 30px;
    //         color: #888888;
    //         background-color: #e6e6e6;
    //         width: 100%;
    //         min-width: 375px;
    //         line-height: 30px;
    //         font-size: 0px;

    //         span {
    //             font-size: 14px;
    //             width: 25%;
    //             display: inline-block;
    //             height: 35px;
    //             line-height: 35px;
    //             text-align: center;

    //             a {
    //                 color: #888888
    //             }
    //         }
    //     }

    //     .skill-btn {
    //         margin: 5px;
    //         font-size: 0px;

    //         .btn {
    //             width: calc(50% - 5px);
    //         }
    //     }

    //     .skills {
    //         margin: 15px 10px;
    //         margin-bottom: 65px;

    //         .skill {

    //             width: 25%;
    //             text-align: center;
    //             display: inline-block;
    //             margin-bottom: 15px;

    //             &:nth-child(4n) {
    //                 margin-right: 0px;
    //             }

    //             .icon {
    //                 img {
    //                     width: 30px;

    //                 }
    //             }

    //             .title {
    //                 font-size: 15px;
    //                 font-weight: bold;
    //                 color: #888888;
    //             }

    //             .state {
    //                 font-size: 12px;
    //                 color: #888888;

    //                 span {
    //                     color: #f38832;
    //                     font-weight: bold;
    //                 }
    //             }
    //         }
    //     }

    //     .offer-list {

    //         /*            margin-top: 10px;*/
    //         /*            border-bottom: 1px solid #D5D5D5;*/
    //         .offer {
    //             padding: 10px;
    //             background-color: #F2F2F2;

    //             .icon {
    //                 float: left;
    //                 height: 42px;
    //                 margin-right: 16px;
    //             }

    //             .info {
    //                 float: left;
    //                 display: inline-block;

    //                 .title {
    //                     color: #5D5E5D;
    //                     font-size: 20px;
    //                     font-weight: bold;
    //                     margin-bottom: 10px;
    //                 }

    //                 .time {
    //                     font-size: 12px;
    //                 }
    //             }

    //             .state {
    //                 display: inline-block;
    //                 float: right;
    //                 line-height: 42px;
    //                 height: 42px;
    //                 margin-right: 20px;

    //                 color: #717171;
    //             }

    //             .offer-info {
    //                 display: inline-block;
    //                 float: right;
    //                 margin-right: 20px;
    //                 font-size: 17px;
    //                 color: #5f5f5f;

    //                 span {
    //                     color: #f38832;
    //                     font-weight: bold;
    //                     margin-right: 5px;
    //                 }

    //             }

    //             .more {
    //                 width: 15px;
    //                 float: right;
    //                 margin-top: 5px;

    //             }
    //         }
    //     }
    // }

    @media screen and (min-width: 640px) {
        .home .menu,
        .home .commun {
            max-width: 640px;
            margin: 0 auto;
        }

        .home .commun {
            padding: 0;

            .btn {
                margin-left: 10px;
            }
        }
    }

</style>
