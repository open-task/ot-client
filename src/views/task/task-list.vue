<template>
    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入任务和ID检索"
                    shape="round"
                    @search="handleSearch"
                />
            </form>
        </div>
        <div class="order-hd">
            <van-dropdown-menu class="bt-dropdown-menu">
                <van-dropdown-item v-model="sort_type" :options="order_type_options" @change="handleChange"/>
                <van-dropdown-item v-model="sort_price" :options="order_price_options" @change="handleChange"/>
                <van-dropdown-item v-model="task_state" :options="order_state_options" @change="handleChange"/>
            </van-dropdown-menu>
        </div>
        <div class="task-list bt-flex-scroller">
            <van-list
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="getTaskList"
                ref="taskLisk"
            >
                <van-cell is-link v-for="task in taskList" :key="task.missionId" @click="handleTaskClick(task.missionId)">
                    <template slot="title">
                        <van-row type="flex" justify="end">
                            <van-col span="18">
                                <h3>{{task.title}}</h3>
                                <p><span class="t-gray t-time">{{task.time}}</span><span :class="{ ['t-' + task.type] : true }">{{task.text}}</span></p>
                            </van-col>
                            <van-col span="6">
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">DET</span>
                                    <span class="pull-right t-warning">{{task.reward}}</span> 
                                </div>
                                <div class="clearfix">
                                    <span class="task-field pull-right t-gray">提交</span>
                                    <span class="pull-right t-warning">{{task.solution_num}}</span> 
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
    import getTaskData from '@/utils/get-taskdata';
    export default {
        components: {
            BtTabbar
        },
        data() {
            return {
                taskList: [],
                page: 1,
                count: 10,
                loading: false,
                finished: false,

                searchText: '',
                sort_type: 0,
                order_type_options: [
                    { text: '默认排序', value: 0 },
                    { text: '时间优先', value: 'timestamp' },
                    { text: '价格优先', value: 'price' },
                ],
                sort_price: 0,
                order_price_options: [
                    { text: '价格不限', value: 0 },
                    { text: '10 DET及以下', value: '0-10' },
                    { text: '10-50 DET', value: '10-50'},
                    { text: '50-200 DET', value: '50-200' },
                    { text: '200-500 DET', value: '200-500' },
                    { text: '500-1000 DET', value: '500-1000' },
                    { text: '1000 DET及以上', value: '1000-10000000' }
                ],
                task_state: 0,
                order_state_options: [
                    { text: '全部', value: 0 },
                    { text: '待解决', value: 'published' },
                    { text: '已提交', value: 'updated' },
                    { text: '已解决', value: 'success' }
                ]

            }
        },

        mounted() {
            this.getTaskList();
        },

        methods: {
            handleChange() {
                this.page = 1;
                this.taskList = [];
                this.getTaskList();
                this.$refs.taskLisk.scroller.scrollTop = 0;
                this.finished = true;
            },
            getTaskList() {
                this.loading = true;
                this.$post("/skill/list_tasks", 
                    Object.assign(
                        {
                            page: this.page,
                            count: this.count,
                        },
                        !!this.sort_type ?
                            { sort_type: this.sort_type } : null,
                        !!this.sort_price ?
                            { sort_price: this.sort_price } : null,
                        !!this.task_state ?
                            { task_state: this.task_state } : null
                    )
                ).then(res => {
                    if( res.missions && res.missions.length ) {
                        res.missions.forEach(d => {
                            this.taskList.push( getTaskData(d) );
                        });
                    }

                    this.loading = false;
                    this.page++;
                    if( this.taskList.length >= res.count ) {
                        this.finished = true;
                    }
                })
            },

            handleTaskClick(id) {
                this.$post('/v1/', {
                    "jsonrpc": "2.0",
                    "method": "GetMissionInfo",
                    "params": [id],
                    "id": "11"
                }).then( res => {
                    if( !res.result.block ) {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试',
                            position: 'middle'
                        });
                    }else {
                        this.$router.push({ name: 'detail', params: { id } });
                    }
                })
            },

            search: function(c) {
                let self = this
                self.$http.post("/skill/search_task",{q:c}).then(function(re){
                    self.offer_list = re.body.missions
                    console.log(re)
                })
                console.log(c)
            },

            handleSearch(e) {
                console.log(e.target.value)
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
</style>