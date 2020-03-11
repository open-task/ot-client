<template>
    <div>
        <van-cell :is-link="isLink"  @click="handleTaskClick(task.missionId)">
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
                            <span class="pull-right t-warning">{{task.solution_count}}</span> 
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

</style>