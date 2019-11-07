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
        <div class="answer-list list-scroller">
            <van-list
                v-model="list_loading"
                :finished="list_finished"
                finished-text="没有更多了"
                :error.sync="list_error"
                error-text="请求失败，点击重新加载"
                @load="handleListLoad"
            >
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">待回答</span>
                        <div class="pull-left"><span class="t-warning">3</span>参与了回复</div>
                    </div>
                </van-panel>
                <van-panel class="bt-card" title="标题标题标题标题标题标题标题标题" status="1">
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
    .answer-list {

    }
</style>