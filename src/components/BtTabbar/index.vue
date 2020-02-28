<template>
    <div>
        <van-popup
            class="bt-home-popup"
            v-model="showModal"
            position="bottom"
        >
            <div class="home-create-access">
                <router-link class="home-create-access-item" :to="{ name: 'taskcreate'}">
                    <img src="/img/task-create-icon.png" alt="发布任务">
                    <span>发布任务</span>
                </router-link>
                <router-link class="home-create-access-item" :to="{ name: 'answercreate'}" style="margin-top: -50px;">
                    <img src="/img/answer-create-icon.png" alt="发布问答">
                    <span>发布问答</span>
                </router-link>
                <router-link class="home-create-access-item" :to="{ name: 'talentcreate'}">
                    <img src="/img/talent-create-icon.png" alt="发布技能">
                    <span>发布技能</span>
                </router-link>
            </div>
        </van-popup>
        <van-tabbar 
            v-model="active"
            :z-index="3999"
            active-color="#3C8FFB"
        >
            <van-tabbar-item v-for="item in items0" :key="item.to" :to="item.to">
                <span>{{item.text}}</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? item.active : item.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item>
                <div class="home-plus-btn" @click="handleModal">
                    <span>
                        <img src="/img/plus-icon.png" alt="创建" :class="{'plus-animate': showModal}">
                    </span>
                </div>
            </van-tabbar-item>
            <van-tabbar-item v-for="item in items1" :key="item.to" :to="item.to">
                <span>{{item.text}}</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? item.active : item.inactive"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        props: {
            activeIndex: {
                default: 0
            },
        },
        data() {
            return {
                showModal: false,
                active: parseInt(this.activeIndex),
                items0: [
                    {
                        text: '首页',
                        to: '/',
                        active: '/img/home-active-icon.png',
                        inactive: '/img/home-icon.png'
                    },
                    {
                        text: '任务',
                        to: '/tasklist',
                        active: '/img/task-active-icon.png',
                        inactive: '/img/task-icon.png'
                    }
                ],

                items1: [
                    {
                        text: '公告',
                        to: '/noticelist',
                        active: '/img/notice-active-icon.png',
                        inactive: '/img/notice-icon.png'
                    },
                    {
                        text: '我的',
                        to: '/personal',
                        active: '/img/personal-active-icon.png',
                        inactive: '/img/personal-icon.png'
                    }
                ]
            }
        },
        methods: {
            handleModal() {
                this.showModal = !this.showModal;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .bt-home-popup {
        background: none;
    }
    .home-create-access {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-bottom: 90px;
        padding-top: 50px;

        .home-create-access-item {
            width: 1.6rem;
            color: #fff;
            text-align: center;
            font-size: 14px;

            img {
                display: block;
                width: 100%;
                margin-bottom: .26rem;
            }
        }
    }

    .home-plus-btn {
        display: block;
        position: absolute;
        top: -25%;
        left: 50%;
        margin-left: -.508rem;
        z-index: 1;

        span {
            display: block;
            padding: .16rem;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;

            img {
                display: block;
                width: .84rem;
                height: .84rem;
                border-radius: 50%;
                box-shadow:0px 5px 5px 0px rgba(115,84,245,0.22);
                transform: rotate(0) scale(.85);
                transition: all .3s;

                &.plus-animate {
                    transform: rotate(-45deg) scale(1)
                }
            }
        }
    }
</style>