<template>
    <div class="home">

        <div class="header">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img src="/img/banner.png" alt="" class="cover">
                </van-swipe-item>
                <van-swipe-item>
                    <router-link to='/funding'>
                        <img src="/img/banner02.png" alt="" class="cover">
                    </router-link>
                </van-swipe-item>
            </van-swipe>
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
            <router-link class="skill" :to='`/talentmarket/${skill.name}`' v-for='skill in skill_list'>
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
            <!--            <span @click='closed'>收支</span>-->
            <span @click='closed'>设置</span>
            <span><a href="https://shimo.im/docs/X8tXk6cjGC9Gg9qg/ ">帮助</a></span>
        </div>
        <a href="https://gitter.im/Bountinet/community">
            <div class="commun">
                <span class="btn"><img src="/img/聊天_ICON.png" alt="">加入社区</span>
                https://gitter.im/Bountinet/community
            </div>
        </a>


    </div>
</template>

<script>
    import OfferCard from "@/components/OfferCard"
    import {
        ImagePreview
    } from 'vant'
    export default {
        components: {
            OfferCard
        },
        name: 'home',
        mounted() {
            let self = this
            self.$http.post("/skill/list_tasks", {
                type: 'all'
            }).then(function(re) {
                let ms = re.body.missions.slice(0, 2)
                self.task_list = ms
            })
            self.$http.post("/skill/list_skills", {}).then(function(re) {
                let ss = re.body.skills.slice(0, 8)
                self.skill_list = ss

            })
        },
        methods: {
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
        },
        data() {
            return {
                task_list: [],
                skill_list: [],
                

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

        .commun {
            position: fixed;
            bottom: 0px;
            font-size: 13px;
            line-height: 30px;
            padding: 0px 10px;
            color: #888888;
            background-color: white;
            width: 100%;
            min-width: 375px;

            .btn {
                background-color: #34BC81;
                color: white;
                padding: 0px 10px;
                border-radius: 2px;
                font-size: 15px;

                img {
                    height: 15px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
        }

        .menu {
            position: fixed;
            bottom: 30px;
            color: #888888;
            background-color: #e6e6e6;
            width: 100%;
            min-width: 375px;
            line-height: 30px;
            font-size: 0px;

            span {
                font-size: 14px;
                width: 25%;
                display: inline-block;
                height: 35px;
                line-height: 35px;
                text-align: center;

                a {
                    color: #888888
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
            margin: 15px 10px;
            margin-bottom: 65px;

            .skill {

                width: 25%;
                text-align: center;
                display: inline-block;
                margin-bottom: 15px;

                &:nth-child(4n) {
                    margin-right: 0px;
                }

                .icon {
                    img {
                        width: 30px;

                    }
                }

                .title {
                    font-size: 15px;
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

            /*            margin-top: 10px;*/
            /*            border-bottom: 1px solid #D5D5D5;*/
            .offer {
                padding: 10px;
                background-color: #F2F2F2;

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
