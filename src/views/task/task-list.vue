<template>
    <div class="layout-vertical has-tabbar">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入任务检索"
                    shape="round"
                    @input="handleSearch"
                    @clear="handleChange"
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
                v-show="taskList && taskList.length"
                v-model="loading"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="getTaskList"
                ref="taskLisk"
            >
                <task-cell v-for="task in taskList" :key="task.missionId" :task="task" />
            </van-list>
            <bt-noresult v-show="!taskList || !taskList.length" />
        </div>
        <bt-tabbar activeIndex="1"></bt-tabbar>
    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar';
    import TaskCell from '@/components/TaskCell';
    import BtNoresult from '@/components/BtNoresult';
    import getTaskData from '@/utils/get-taskdata';
    export default {
        components: {
            BtTabbar,
            BtNoresult,
            TaskCell
        },
        data() {
            return {
                taskList: [],
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
            this.handleSearch = this.$throttle( this.handleChange, 300 );
            this.getTaskList();
        },

        methods: {
            handleChange() {
                this.$refs.taskLisk.scroller.scrollTop = 0;
                this.page = 1;
                this.taskList = [];
                this.getTaskList();
                this.finished = true;
            },
            getTaskList() {
                this.loading = true;
                this.$post("/skill/list_tasks", 
                    Object.assign(
                        {
                            page: this.page,
                            count: this.count,
                            q: this.searchText
                        },
                        !!this.sort_type ?
                            { sort_type: this.sort_type } : { sort_type: 'timestamp' },
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