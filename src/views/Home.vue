<template>
    <div class="home">

        <div class="header">
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
        </div>



    </div>
</template>

<script>
    export default {
        name: 'home',
        methods:{
            to_tasklist:function(){
                let self = this
                self.$router.push({path:"/tasklist"})
            },
            closed:function(){
                alert('该板块暂未开放')
            }
        },
        data() {
            return {
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
        }
    }

</script>
<style lang='scss'>
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
