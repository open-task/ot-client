<template>
    <div>
        <van-tabbar 
            v-model="active"
            active-color="#3C8FFB"
        >
            <van-tabbar-item v-for="item in items" :key="item.to" :to="item.to">
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
                active: parseInt(this.activeIndex),
                items: [
                    {
                        text: '首页',
                        to: '/',
                        active: 'http://192.168.199.226:8080/img/home-active-icon.png',
                        inactive: 'http://192.168.199.226:8080/img/home-icon.png'
                    },
                    {
                        text: '任务',
                        to: '/tasklist',
                        active: 'http://192.168.199.226:8080/img/task-active-icon.png',
                        inactive: 'http://192.168.199.226:8080/img/task-icon.png'
                    },
                    {
                        text: '公告',
                        to: '/noticelist',
                        active: 'http://192.168.199.226:8080/img/notice-active-icon.png',
                        inactive: 'http://192.168.199.226:8080/img/notice-icon.png'
                    },
                    {
                        text: '我的',
                        to: '/personal',
                        active: 'http://192.168.199.226:8080/img/personal-active-icon.png',
                        inactive: 'http://192.168.199.226:8080/img/personal-icon.png'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>