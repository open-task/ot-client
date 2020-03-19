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
            @click="toAuction"
        >
            <template slot="left-icon">
                <img class="bt-cell-icon" src="/img/adv-icon.png" alt="通知">
            </template>
            <van-tag plain round color="#7452F5" class="notice-tag">通知</van-tag>
            SERO平台币名全网唯一，商机无限！！！
        </van-notice-bar>
        <div class="home-access">
            <router-link class="home-access-item" to='/tasklist'>
                <img src="/img/bt-access01.png" alt="任务列表">
            </router-link>
            <router-link class="home-access-item" to='/answerlist'>
                <img src="/img/bt-access02.png" alt="问答列表">
            </router-link>
            <router-link class="home-access-item" to='/talentclassify'>
                <img src="/img/bt-access03.png" alt="人才技能列表">
            </router-link>
        </div>
        <div class="home-nav">
            <router-link to="/talentlist/python" class="home-nav-item">
                <img src="/img/bt-nav01.png" alt="Python">
                <span class="home-nav-text">Python</span>
            </router-link>
            <router-link to="/talentlist/区块链" class="home-nav-item">
                <img src="/img/bt-nav02.png" alt="区块链">
                <span class="home-nav-text">区块链</span>
            </router-link>
            <router-link to="/talentlist/网页设计" class="home-nav-item">
                <img src="/img/bt-nav03.png" alt="网页设计">
                <span class="home-nav-text">网页设计</span>
            </router-link>
            <router-link to="/talentlist/UI设计" class="home-nav-item">
                <img src="/img/bt-nav04.png" alt="UI设计">
                <span class="home-nav-text">UI设计</span>
            </router-link>
            <router-link to="/talentclassify" class="home-nav-item">
                <img src="/img/bt-nav05.png" alt="查看更多">
                <span class="home-nav-text">查看更多</span>
            </router-link>
        </div>
        <div class="task-list bt-flex-scroller">
            <task-cell v-for="task in taskList" :key="task.missionId" :task="task" :isLink="false" listType="0"/>
        </div>
        <bt-tabbar />
    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar';
    import TaskCell from '@/components/TaskCell';
    import getTaskData from '@/utils/get-taskdata';
    export default {
        components: {
            BtTabbar,
            TaskCell
        },
        name: 'home',
        data() {
            return {
                taskList: [],
                skillList: [],
            }
        },
        mounted() {
            this.$post('/skill/list_tasks', {
                page: 1,
                count: 8,
                sort_type: 'timestamp',
                task_state: 'all'
            }).then( res => {
                if( res.missions && res.missions.length ) {
                    this.taskList = res.missions.map( d => getTaskData(d) );
                }
            })
        },
        methods: {
            toAuction() {
                this.$router.push({path: '/auction'})
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
            padding: 16px;
            padding-bottom: 0;
            background-color: #fff;
            display: flex;
            
            .home-access-item {
                flex: 1;
                display: block;
                background-color: #fff;
                box-shadow:0px 6px 10px 0px rgba(0, 0, 0, 0.08);
                border-radius: .16rem;

                & + .home-access-item {
                    margin-left: 10px;
                }

                img {
                    display: block;
                    width: 100%;
                }
            }
        }

        .notice-tag {
            line-height: 1;
            vertical-align: 1px;
        }

        .home-nav {
            display: flex;
            padding: 16px;
            overflow: hidden;
            background-color: #fff;

            .home-nav-item {
                flex: 1;
                background-color: #fff;

                & + .home-nav-item {
                    margin-left: 10px;
                }

                img {
                    display: block;
                    width: 100%;
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

</style>
