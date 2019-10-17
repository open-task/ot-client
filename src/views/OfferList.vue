<template>
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
    import BtTabbar from '@/components/BtTabbar';
    export default {
        components: {
            BtTabbar
        },
        data() {
            return {
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
            
        },
    }
</script>

<style lang="scss" scoped>
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