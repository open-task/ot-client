<template>
    <!-- <div class="offer-list">

        <offer-header title='任务列表'></offer-header>

        <header-search @search='search'></header-search>
        <div class="types">
            <span :class="{selected:page_type=='all'}" @click='go_page("all")'>全部</span>
            <span :class="{selected:page_type=='published'}" @click='go_page("published")'>待解决</span>
            <span :class="{selected:page_type=='unsolved'}" @click='go_page("unsolved")'>已提交</span>
            <span :class="{selected:page_type=='solved'}" @click='go_page("solved")'>已解决</span>
        </div>
        <div class="tasks">
            <offer-card style='margin-bottom:5px' v-for="offer in offer_list" :offer='offer'></offer-card>

        </div>

        <van-pagination v-model="page" v-if='offer_list' :page-count="10" mode="simple" @change='get_page' /> -->

    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入任务和ID检索"
                    shape="round"
                    @search="handleSearch"
                    @cancel="handleCancel"
                />
            </form>
        </div>
        <div class="order-hd">
            <van-dropdown-menu class="bt-dropdown-menu">
                <van-dropdown-item v-model="order_type" :options="order_type_options" />
                <van-dropdown-item v-model="order_price" :options="order_price_options" />
                <van-dropdown-item v-model="order_state" :options="order_state_options" />
            </van-dropdown-menu>
        </div>
        <div class="task-list list-scroller">
            <van-list
                v-model="list_loading"
                :finished="list_finished"
                finished-text="没有更多了"
                :error.sync="list_error"
                error-text="请求失败，点击重新加载"
                @load="handleListLoad"
            >
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
                <van-cell is-link>
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>OpenTask工程师</h3>
                                <p class="t-gray">2019-08-14 20:00:00 待解决</p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">1.99</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">3</span> 
                                </div>
                            </van-col>
                        </van-row>
                    </template>
                </van-cell>
            
            </van-list>
        </div>
        <bt-tabbar activeIndex="1"></bt-tabbar>
    </div>
</template>

<script>
    import OfferCard from "@/components/OfferCard"
    import OfferHeader from '@/components/OfferHeader'
    import HeaderSearch from '@/components/HeaderSearch'
    import BtTabbar from '@/components/BtTabbar'
    export default {
        components: {
            OfferCard,
            OfferHeader,
            HeaderSearch,
            BtTabbar
        },
        computed: {
            page_type: function() {
                console.log(this.$router)
                return this.$route.params.type
            }
        },
        mounted() {
            let self = this
                 self.get_page()

        },
        data() {
            return {
                offer_list: [],
                page: 1,
                page_count: 200,
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
                    { text: '10 DET及一下', value: 1 },
                    { text: '10-50 DET', value: 2 },
                    { text: '50-200 DET', value: 3 },
                    { text: '200-500 DET', value: 4 },
                    { text: '500-1000 DET', value: 5 },
                    { text: '1000 DET及以上', value: 6 }
                ],
                order_state: 0,
                order_state_options: [
                    { text: '全部', value: 0 },
                    { text: '待解决', value: 1 },
                    { text: '已提交', value: 2 },
                    { text: '已解决', value: 3 }
                ],
                list_loading: false,
                list_finished: false,
                list_error: false

            }
        },

        methods: {
            search: function(c) {
                let self = this
                self.$http.post("/skill/search_task",{q:c}).then(function(re){
                    self.offer_list = re.body.missions
                    console.log(re)
                })
                console.log(c)
            },
            go_page(type) {
                let self = this
                window.location.href = `/tasklist/${type}`

            },
            get_page() {
                let self = this
                let page = self.page
                let type = self.$route.params.type
                let f = {page:page}
                if (type) {
                    f["type"] = type
                } else {
                    f["type"] = ""
                }
                console.log(f)
                self.$http.post("/skill/list_tasks", f).then(function(re) {
                    self.offer_list = re.body.missions
                })
            },

            handleSearch(e) {
                console.log(e.target.value)
            },
            handleCancel() {

            },
            handleListLoad() {
                this.loading = true;
                setTimeout(() => {
                    //this.loading = false;
                }, 1000)
            }

        }
    }
</script>

<style lang="scss" scoped>

    .offer-list {
        background-color: #F2F2F2;

        .types {
            background-color: white;
            padding: 0px 20px;
            font-size: 0px;
            margin-bottom: 10px;

            span {
                color: #979797;
                display: inline-block;
                line-height: 45px;
                margin-right: 50px;
                font-size: 15px;
                border-bottom: 4px solid transparent;

                &:last-child {
                    margin-right: 0px;
                }

                &.selected {
                    color: #3c8ffb;
                    border-bottom-color: #3c8ffb;
                }
            }
        }

        .tasks {
            margin-bottom: 20px;
        }

        .van-cell__value {
            color: #36277B !important
        }

        .van-button--danger {
            background-color: #36277B;
            border-color: #36277B;
        }
    }

    .task-list {
        .van-cell {
            align-items: center;
            h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            .task-field {
                margin: 0 5px;
            }
        }
    }
</style>