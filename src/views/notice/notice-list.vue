<template>
    <div class="layout-vertical has-tabbar">
        <div class="answer-list bt-flex-scroller">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getNoticeList"
            >
               

            </van-list>
        </div>
        <bt-tabbar activeIndex="3"></bt-tabbar>
        
    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar';
    export default {
        components: {
            BtTabbar
        },

        data() {
            return {
                noticeList: [],
                page: 1,
                pageSize: 10,
                loading: false,
                finished: true,
            }
        },

        methods: {
            getNoticeList() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>