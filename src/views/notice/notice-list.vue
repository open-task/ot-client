<template>
    <div class="layout-vertical has-tabbar">
        <div class="answer-list bt-flex-scroller">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getNoticeList"
            >   
                <van-panel class="bt-card" title="Bountinet 内测系统正式上线了">
                    <div class="bt-card-default bt-card-desc">
                        <p class="bt-card-desc-publisher"><router-link class="t-primary t-12 pull-right" to="/bount">查看</router-link>2019-10-11 08:24</p>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="超零三国开始众筹了！！！">
                    <div class="bt-card-default bt-card-desc">
                        <p class="bt-card-desc-publisher"><router-link class="t-primary t-12 pull-right" to="/funding">查看</router-link>2019-12-03 16:40</p>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="求购人物卡">
                    <div class="bt-card-default bt-card-desc">
                        <p class="bt-card-desc-publisher"><router-link class="t-primary t-12 pull-right" to="/gamecard?isSys=1">查看</router-link>2020-12-26 09:40</p>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="币名拍卖">
                    <div class="bt-card-default bt-card-desc">
                        <p class="bt-card-desc-publisher"><router-link class="t-primary t-12 pull-right" to="/auction">查看</router-link>2019-01-05 21:30</p>
                    </div>
                </van-panel>
            </van-list>
        </div>
        <bt-tabbar />
        
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