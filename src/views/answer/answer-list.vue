<template>
    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入问答检索"
                    shape="round"
                    @input="handleSearch"
                    @clear="handleChange"
                />
            </form>
        </div>
        <div class="order-hd">
            <van-dropdown-menu>
                <van-dropdown-item v-model="sort_type" :options="order_type_options" @change="handleChange"/>
                <van-dropdown-item v-model="sort_price" :options="order_price_options" @change="handleChange"/>
                <van-dropdown-item v-model="task_state" :options="order_state_options" @change="handleChange"/>
            </van-dropdown-menu>
        </div>
        <div class="answer-list bt-flex-scroller">
            <van-list
                v-show="answerList && answerList.length"
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="getAnswerList"
                ref="answerLisk"
            >
                <van-panel class="bt-card" v-for="a in answerList" :key="a.missionId" @click="handleAnsClick(a.missionId)">
                    <div class="van-cell van-panel__header" slot="header">
                        <span class="bt-det">{{ a.reward |  ldm_thousand}} DET</span>
                        <div class="van-cell__title">
                            <span>{{a.title}}</span>
                        </div>
                        <div class="van-cell__value van-panel__header-value">
                            <img class="answer-a" src="/img/ans-icon.png" alt="答">
                        </div>
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right" :class="{ [a.type]: true }">{{ a.text }}</span>
                        <div class="pull-left"><span class="t-warning">{{a.answer_amount}}</span>参与了回复</div>
                    </div>
                </van-panel>
            </van-list>
            <bt-noresult v-show="!answerList || !answerList.length" />
        </div>
        <bt-tabbar activeIndex="2"></bt-tabbar>
        
    </div>
</template>

<script>
    import getState from '../../utils/get-state';
    import BtTabbar from '@/components/BtTabbar';
    import BtNoresult from '@/components/BtNoresult';
    export default {
        components: {
            BtTabbar,
            BtNoresult
        },
        data() {
            return {
                answerList: [],
                page: 1,
                count: 10,
                loading: false,
                finished: false,
                handleSearch: null,

                searchText: '',
                sort_type: 0,
                order_type_options: [
                    { text: '默认排序', value: 0 },
                    { text: '时间优先', value: 'timestamp' },
                    { text: '价格优先', value: 'reward' },
                ],
                sort_price: 0,
                order_price_options: [
                    { text: '价格不限', value: 0 },
                    { text: '0-9 DET', value: '0-9' },
                    { text: '10-49 DET', value: '10-49' },
                    { text: '50-199 DET', value: '50-199' },
                    { text: '200-299 DET', value: '200-299' },
                    { text: '300 DET及以上', value: '300-10000000' }
                ],
                task_state: 'all',
                order_state_options: [
                    { text: '全部', value: 'all' },
                    { text: '待回答', value: 'published' },
                    { text: '已回答', value: 'updated' },
                    { text: '已解决', value: 'success' }
                ]
            }
        },
        mounted() {
            this.handleSearch = this.$throttle( this.handleChange, 300 );
            this.handleOptions();
            this.getAnswerList();
        },
        methods: {
            handleOptions() {
                this.order_price_options = this.order_price_options.map((o, i) => {
                    if( i ) {
                        let valArr = o.value.split('-');
                        return {
                            text: o.text,
                            value: this.$web3api.toWei(valArr[0]) + '-' + this.$web3api.toWei(valArr[1])
                        }
                    }else {
                        return o;
                    }
                })
            },
            handleChange() {
                this.$refs.answerLisk.scroller.scrollTop = 0;
                this.page = 1;
                this.answerList = [];
                this.getAnswerList();
                this.finished = true;
            },
            getAnswerList() {
                this.loading = true;
                this.$post("/skill/get_question_list", 
                    Object.assign(
                        {
                            page: this.page,
                            count: this.count,
                            q: this.searchText,
                            task_state: this.task_state
                        },
                        { 
                            sort_type: !!this.sort_type ? this.sort_type : 'timestamp' 
                        },
                        { 
                            sort_price: !!this.sort_price ? this.sort_price : '' 
                        }
                    )
                ).then(res => {
                    if( res.question && res.question.length ) {
                        res.question.forEach(d => {
                            this.answerList.push({
                                ...d, 
                                ...getState('question', d.question_state),
                                reward: this.$web3api.fromWei(d.reward) 
                                });
                        });
                    }
                    this.loading = false;
                    this.page++;
                    if( this.answerList.length >= res.count ) {
                        this.finished = true;
                    }
                })
            },

            handleAnsClick(id) {
                this.$post("/skill/get_question", {
                    question_id: id
                }).then(res => {
                    if( res.state ) {
                        if( res.question ) {
                            window.sessionStorage.removeItem('DATA_ANSWER')
                            window.sessionStorage.setItem('DATA_ANSWER', JSON.stringify(res.question))
                            this.$router.push({ path: `/answerdetail/${id}` });
                        }
                    }else {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试'
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

            

        }
        
    }
</style>