<template>
    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入地址检索"
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
        <div class="talent-list list-scroller">
            <van-list
                v-model="list_loading"
                :finished="list_finished"
                finished-text="没有更多了"
                :error.sync="list_error"
                error-text="请求失败，点击重新加载"
                @load="handleListLoad"
            >
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
                <van-cell is-link>
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">1</span>次 已被解决<span class="t-primary">1</span>次</p>
                        <p>提交方案<span class="t-warning">2</span>次 已被接受<span class="t-primary">2</span>次</p>
                        <p>发布问题<span class="t-warning">1000</span>次 回答问题<span class="t-primary">99</span>次</p>
                        <p class="t-gray">邮箱：test@163.com</p>
                        <p class="t-gray">最近活跃：2019-08-14 20:00:00</p>
                    </div>
                </van-cell>
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
    .talent-list {
        .talent-list-icon {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #4192F8;
            margin-right: 16px;
            position: relative;

            .van-icon {
                font-size: 18px;
                color: #fff;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -9px;
                margin-left: -9px;
            }
        }

        .van-cell {
            align-items: center;

            & + .van-cell {
                margin-top: 10px;
            }

            .t-warning,
            .t-primary {
                margin: 0 2px;
            }
        }
    }
</style>