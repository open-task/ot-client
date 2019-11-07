<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/tasklist">任务</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/answerlist">问答</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/talentlist">技能</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="talentlist">我的</van-tabbar-item>
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
                active: parseInt(this.activeIndex)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>