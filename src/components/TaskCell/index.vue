<template>
    <div>
        <van-cell :is-link="isLink" v-if="!!task.text"  @click="handleTaskClick(task.missionId)">
            <template slot="title" v-if="listType == '0'">
                <van-row type="flex" justify="end">
                    <van-col span="18">
                        <h3>{{task.title}}</h3>
                        <p><span class="t-gray t-time">{{task.time}}</span><span :class="{ [task.type] : true }">{{task.text}}</span></p>
                    </van-col>
                    <van-col span="6">
                        <div class="clearfix">
                            <span class="task-field pull-right t-gray">DET</span>
                            <span class="pull-right t-warning">{{task.reward }}</span> 
                        </div>
                        <div class="clearfix">
                            <span class="task-field pull-right t-gray">提交</span>
                            <span class="pull-right t-warning">{{task.solution_count}}</span> 
                        </div>
                    </van-col>
                </van-row>
            </template>
            <template slot="title" v-else>
                <van-row type="flex" justify="end">
                    <van-col span="18">
                        <h3>{{task.title}}</h3>
                        <p><span class="t-gray t-time">{{task.time}}</span></p>
                    </van-col>
                    <van-col span="6">
                        <div class="clearfix">
                            <span class="task-field pull-right t-gray">DET</span>
                            <span class="pull-right" :class="{'t-warning': listType == '1', 't-primary': listType == '2' }">{{ listType == '1' ? '+' : '-' }}{{task.reward}}</span> 
                        </div>
                        <div class="clearfix">
                            <span class="pull-right" :class="{ ['t-' + task.type] : true }">{{task.text}}</span>
                        </div>
                    </van-col>
                </van-row>
            </template>
            <template slot="right-icon" v-if="!isLink">
                    <van-button class="bt-btn" size="small" @click="handleTaskClick(task.missionId)">查看</van-button>
                </template>
        </van-cell>
    </div>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
            },
            isLink: {
                type: Boolean,
                default: true
            },
            listType: {
                type: String,
                default: '0'
            }
        },
        methods: {
            handleTaskClick(id) {
                this.$post("/skill/get_task_info", {
                    id
                }).then(res => {
                    if( res.state ) {
                        if( res.task ) {
                            window.sessionStorage.removeItem('DATA_TASK')
                            window.sessionStorage.setItem('DATA_TASK', JSON.stringify({...res.task, solutions: res.solutions}))
                            this.$router.push({ path: `/taskdetail/${id}` });
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

</style>