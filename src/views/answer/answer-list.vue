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
                <van-panel class="bt-card" v-for="a in answerList" :key="a.missionId" @click="handleAnsClick(a.missionId)">
                    <div class="van-cell van-panel__header" slot="header">
                        <span class="det-bg">{{a.reward}} DET</span>
                        <div class="van-cell__title">
                            <span>{{a.title}}</span>
                        </div>
                        <div class="van-cell__value van-panel__header-value">
                            <img class="answer-a" src="/img/ans-icon.png" alt="答">
                        </div>
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right" :class="{'t-primary': a.question_state == 'published', 't-gray':  a.question_state != 'published'}">{{ a.question_state == 'published' ? '待回答' : '已回答'}}</span>
                        <div class="pull-left"><span class="t-warning">{{a.answer_amount}}</span>参与了回复</div>
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
                answerList: [],
                page: 1,
                pageSize: 10,
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
                this.$post("/question/get_question_list", {
                    page: this.page,
                    page_size: this.pageSize
                }).then(res => {
                    if( res.question && res.question.length ) {
                        res.question.forEach(d => {
                            this.answerList.push(d);
                        });
                    }
                    this.loading = false;
                    this.page++;
                    if( this.answerList.length >= res.count ) {
                        this.finished = true;
                    }
                })
            },
            handleSearch(e) {
                console.log(e.target.value)
            },

            handleCancel() {

            },

            handleAnsClick(id) {
                this.$post("/question/get_question", {
                    question_id: id
                }).then(res => {
                    if( res.state ) {
                        if( res.question ) {
                            window.sessionStorage.removeItem('DATA_ANSWER')
                            window.sessionStorage.setItem('DATA_ANSWER', JSON.stringify(res.question))
                            this.$router.push({ name: 'answerdetail', params: { id } });
                        }
                    }else {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试',
                            position: 'middle'
                        });
                    }
                })
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