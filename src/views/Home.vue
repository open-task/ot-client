<template>
    <div class="home has-tabbar">
        <div class="home-banner">
            帮铁网
        </div>
        <div class="home-access">
            <ul class="clearfix">
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="home-nav">
            <ul class="clearfix">
                <li>
                    <span class="home-nav-icon"></span>
                    <span class="home-nav-text">Python</span>
                </li>
                <li>
                    <span class="home-nav-icon"></span>
                    <span class="home-nav-text">区块链</span>
                </li>
                <li>
                    <span class="home-nav-icon"></span>
                    <span class="home-nav-text">网页设计</span>
                </li>
                <li>
                    <span class="home-nav-icon"></span>
                    <span class="home-nav-text">UI设计</span>
                </li>
                <li>
                    <span class="home-nav-icon"></span>
                    <span class="home-nav-text">查看更多</span>
                </li>
            </ul>
        </div>

        <div class="task-list list-scroller">
            <van-list
                v-model="list_loading"
                :finished="list_finished"
                finished-text="没有更多了"
                :error.sync="list_error"
                error-text="请求失败，点击重新加载"
                @load="handleListLoad"
            >
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师OpenTask工程师OpenTask工程师OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                                
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">100</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                    <template slot="right-icon">
                        <van-button class="bt-btn" size="small">查看任务</van-button>
                    </template>
                </van-cell>
            </van-list>
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
        
        <div class="offer-list" @click='to_tasklist'>
            <div class="offer" v-for='task in task_list'>
                <img src="/img/Open_ICON.png" alt="" class="icon">

                <div class="info">
                    <p class="title">{{task.name}}</p>
                    <p class="time">{{task.time}}</p>
                </div>

                <img src="/img/进入_ICON.png" alt="" class="more">

                <div class="offer-info">
                    <p class="det"><span>{{task.charge}}</span>DET</p>
                    <p class="det"><span>{{task.submit}}</span>提交</p>
                </div>

                <div class="state">
                    {{task.state}}
                </div>
                <div class="float"></div>
            </div>

        </div>
        <div class="skills">
           <router-link class="skill" :to='`/talentmarket/${skill.name}`'  v-for='skill in skill_list'>
            <div >
                <div class="icon">
                    <img :src="`/img/${skill.name}.png`" alt="">
                </div>
                <div class="title">{{skill.name}}</div>
                <div class="state">已接单<span>{{skill.amount}}</span>笔</div>
            </div>
            </router-link>

        </div>
        <div class="menu">
            <span @click='to_tasklist'>任务列表</span>
            
                <span><router-link to='/talentmap'>人才市场</router-link>
                </span>
            <span @click='closed'>收支记录</span>
            <span @click='closed'>设置</span>
            <span @click='closed'>帮助</span>
        </div>
        <div class="commun">
            <span class="btn"><img src="/img/聊天_ICON.png" alt="">加入社区</span>
            https://gitter.im/Bountinet/commuunity
        </div> -->



    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar';
    export default {
        name: 'home',
        components: {
            BtTabbar
        },
        data() {
            return {
                list_loading: false,
                list_finished: false,
                list_error: false,
                task_list: [{
                    name: '平台推广',
                    time: "2019-01-01 20:01:34",
                    state: '已解决',
                    charge: 1,
                    submit: 3,
                    task_id: 123
                }, {
                    name: '平台推广',
                    time: "2019-01-01 20:01:34",
                    state: '已解决',
                    charge: 1,
                    submit: 3,
                    task_id: 123
                }, ],
                skill_list: [{
                        name: "HR",
                        amount: 2
                    },
                    {
                        name: "篮球",
                        amount: 2
                    },
                    {
                        name: "JAVA",
                        amount: 2
                    },
                    {
                        name: "Golang",
                        amount: 2
                    },
                    {
                        name: "篮球",
                        amount: 2
                    },
                    {
                        name: "财务",
                        amount: 2
                    },
                    {
                        name: "营销",
                        amount: 2
                    },
                    {
                        name: "区块链",
                        amount: 2
                    },
                ]

            }
        },
        methods:{
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
            }
        }
    }

</script>
<style lang='scss'>
    .home {
        font-size: 14px;

        .home-banner {
            padding: 12px;
        }

        .home-access {
            padding: .2rem;
            overflow: hidden;
            background-color: #fff;
            ul {
                margin-right: -.2rem;
                li {
                    float: left;
                    margin-right: .2rem;
                    width: 3.45rem;
                    height: 1.82rem;
                    background-color: #fff;
                    box-shadow:0px 12px 20px 0px rgba(0, 0, 0, 0.08);
                    border-radius: .16rem;
                }
            }
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
                        border-radius: 50%;
                        box-shadow:0px 12px 20px 0px rgba(0, 0, 0, 0.08);
                        margin-bottom: .2rem;
                    }
                    .home-nav-text {
                        display: block;
                        width: 100%;
                        color: #999; 
                        text-align: center;
                    }
                }
            }
        }

        .task-list {
            .van-cell {
                align-items: center;
                .van-cell__title {
                    overflow: hidden;
                }
                h3 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .task-field {
                    margin: 0 5px;
                }
                .bt-btn {
                    margin-left: 5px;
                }
            }
        }
    }
    
    


    .float {
        clear: both;
    }
   
    .home {
        .header {
            font-size: 0px;

            .cover {
                width: 100%;
            }
        }
        .commun{
            position: fixed;
            bottom: 0px;
            font-size: 13px;
            line-height: 30px;
            padding: 0px 10px;
            color: #888888;
            
            .btn{
                background-color: #34BC81;
                color: white;
                padding: 0px 10px;
                border-radius: 2px;
                font-size: 15px;
                img{
                    height: 15px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
        }
        .menu{
            position: fixed;
            bottom: 30px;
            color: #888888;
            background-color: #e6e6e6;
            line-height: 30px;
            padding: 0px 20px;
            span{
                margin-right: 19px;
                &:last-child{
                    margin-right: 0px;
                }
                a{
                    color:#888888
                }
            }
        }

        .skill-btn {
            margin: 5px;
            font-size: 0px;

            .btn {
                width: calc(50% - 5px);
            }
        }

        .skills {
            margin: 15px;

            .skill {
                text-align: center;
                margin-right: 40px;
                display: inline-block;
                margin-bottom: 10px;
                &:nth-child(4n){
                    margin-right: 0px;
                }
                .icon {
                    img {
                        width: 30px;

                    }
                }

                .title {
                    font-size: 17px;
                    font-weight: bold;
                    color: #888888;
                }

                .state {
                    font-size: 12px;
                    color: #888888;

                    span {
                        color: #f38832;
                        font-weight: bold;
                    }
                }
            }
        }

        .offer-list {
            margin-top: 10px;
            border-bottom: 1px solid #D5D5D5;

            .offer {
                margin: 5px;

                .icon {
                    float: left;
                    height: 42px;
                    margin-right: 16px;
                }

                .info {
                    float: left;
                    display: inline-block;

                    .title {
                        color: #5D5E5D;
                        font-size: 20px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }

                    .time {
                        font-size: 12px;
                    }
                }

                .state {
                    display: inline-block;
                    float: right;
                    line-height: 42px;
                    height: 42px;
                    margin-right: 20px;

                    color: #717171;
                }

                .offer-info {
                    display: inline-block;
                    float: right;
                    margin-right: 20px;
                    font-size: 17px;
                    color: #5f5f5f;

                    span {
                        color: #f38832;
                        font-weight: bold;
                        margin-right: 5px;
                    }

                }

                .more {
                    width: 15px;
                    float: right;
                    margin-top: 5px;

                }
            }
        }
    }

</style>
