<template>
    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入问答和ID检索"
                    shape="round"
                    @search="handleSearch"
                    @cancel="handleCancel"
                />
            </form>
        </div>
        <div class="order-hd">
            <van-dropdown-menu>
                <van-dropdown-item v-model="order_type" :options="order_type_options" />
                <van-dropdown-item v-model="order_price" :options="order_price_options" />
                <van-dropdown-item v-model="order_state" :options="order_state_options" />
            </van-dropdown-menu>
        </div>
        <div class="answer-list bt-flex-scroller">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getAnswerList"
            >
                <van-panel class="bt-card">
                    <div class="van-cell van-panel__header" slot="header">
                        <span class="det-bg">100 DET</span>
                        <div class="van-cell__title">
                            <span>标题标题标题标题标题标题标题标题</span>
                        </div>
                        <div class="van-cell__value van-panel__header-value">
                            <img class="answer-a" src="/img/ans-icon.png" alt="答">
                        </div>
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card">
                    <div class="van-cell van-panel__header" slot="header">
                        <span class="det-bg">3 DET</span>
                        <div class="van-cell__title">
                            <span>标题标题标题标题标题标题标题标题</span>
                        </div>
                        <div class="van-cell__value van-panel__header-value">
                            <img class="answer-a" src="/img/ans-icon.png" alt="答">
                        </div>
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                
            </van-list>
        </div>
        <bt-tabbar activeIndex="2"></bt-tabbar>
        
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
                loading: false,
                finished: false,
                searchText: '',
                order_type: 0,
                order_type_options: [
                    { text: '默认排序', value: 0 },
                    { text: '时间优先', value: 1 },
                    { text: '价格优先', value: 2 },
                ],
                order_price: 0,
                order_price_options: [
                    { text: '价格不限', value: 0 },
                    { text: '5 DET及一下', value: 1 },
                    { text: '5-50 DET', value: 2 },
                    { text: '50-200 DET', value: 3 },
                    { text: '200-300 DET', value: 4 },
                    { text: '300 DET及以上', value: 5 }
                ],
                order_state: 0,
                order_state_options: [
                    { text: '全部', value: 0 },
                    { text: '待回答', value: 1 },
                    { text: '已回答', value: 2 }
                ]
            }
        },
        methods: {
            getAnswerList() {

            },
            handleSearch(e) {
                console.log(e.target.value)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .answer-list {
        .bt-card {
            border-top-right-radius: 0;
        }
        .van-panel__header {
            position: relative;
            padding-top: .4rem;

            .answer-a {
                display: inline-block;
                width: .98rem;
                height: .98rem;
                margin-top: 10px;
            }

            .det-bg {
                position: absolute;
                right: 0;
                top: 0;
                width: 1.6rem;
                height: .41rem;
                line-height: .42rem;
                background-image: url('/img/det-icon.png');
                background-repeat: no-repeat;
                background-size: 100% auto;
                padding-left: .6rem;
                padding-right: 2px;
                box-sizing: border-box;
                color: #fff;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: right;
            }

        }
        
    }
</style>