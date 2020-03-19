<template>
    <div class="layout-vertical">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入地址检索"
                    shape="round"
                    @input="handleSearch"
                    @clear="handleChange"
                />
            </form>
        </div>
        <!-- <div class="order-hd">
            <van-dropdown-menu>
                <van-dropdown-item v-model="order_type" :options="order_type_options" />
                <van-dropdown-item v-model="order_price" :options="order_price_options" />
                <van-dropdown-item v-model="order_state" :options="order_state_options" />
            </van-dropdown-menu>
        </div> -->
        <div class="talent-list bt-flex-scroller">
            <van-list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="getTalentList"
                ref="talentLisk"
            >
                <van-cell is-link v-for="t in talentList" :key="t.id" :to="`/talentdetail/${t.address}`">
                    <div slot="icon">
                        <span class="talent-list-icon">
                            <van-icon name="manager" />
                        </span>
                    </div>
                    <div slot="title">
                        <p>发布任务<span class="t-warning">{{t.task.task_count}}</span>次 已被解决<span class="t-primary">{{t.task.task_sloved}}</span>次</p>
                        <p>提交方案<span class="t-warning">{{t.task.solution_count}}</span>次 已被接受<span class="t-primary">{{t.task.solution_accept_count}}</span>次</p>
                        <p>发布问题<span class="t-warning">{{t.question.question_count}}</span>次 回答问题<span class="t-primary">{{t.question.answer_count}}</span>次</p>
                        <p class="t-gray">邮箱：{{t.email}}</p>
                        <p class="t-gray">最近活跃：{{t.time}}</p>
                    </div>
                </van-cell>
            </van-list>
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block to="/talentcreate">提交我的技能</van-button>
        </div>
    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar'
    import timestampToDate from '@/utils/timestamp-to-date'
    //console.log( timestampToDate() )
    export default {
        components: {
            BtTabbar
        },
        data() {
            return {
                skill: this.$route.params.type,
                searchText: '',
                talentList: [],
                page: 1,
                count: 10,
                handleSearch: null,

                loading: false,
                finished: false,
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
                ]
            }
        },
        mounted() {
            this.handleSearch = this.$throttle( this.handleChange, 300 );
            this.getTalentList();
        },
        methods: {
            handleChange() {
                this.$refs.talentLisk.scroller.scrollTop = 0;
                this.page = 1;
                this.talentLisk = [];
                this.getTalentList();
                this.finished = true;
            },

            getTalentList() {
                this.$post("/skill/skills_get_users", {
                    page: this.page,
                    count: this.count,
                    skill: this.skill,
                    address: this.searchText
                }).then(res => {
                    if( res.user_list && res.user_list.length ) {
                        res.user_list.forEach(d => {
                            this.talentList.push({
                                ...d,
                                time: timestampToDate(d.update_time)
                            })
                        });
                    }
                    this.loading = false;
                    this.page++;
                    this.finished = true;
                    // if( this.talentList.length >= res.count ) {
                    //     this.finished = true;
                    // }
                })
            },
            
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