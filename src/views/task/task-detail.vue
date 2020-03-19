<template>
    <div class="task-detail layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" :title="title">
                <div class="bt-card-default">
                    <p class="bt-card-desc-publisher">发布者：{{publisher}}</p>
                </div>
                <div class="bt-card-default bt-card-desc">{{desc}}</div>
                <div class="bt-card-default" v-if="skills && skills.length">
                    <span>技能：</span>
                    <van-tag class="bt-tag" v-for="s in skills" :key="s">{{s}}</van-tag>
                </div>
            </van-panel>
            <van-row class="bt-det-row" style="margin-bottom: 10px;">
                <van-col span="12"><span class="t-warning">{{reward}}</span>DET</van-col>
                <van-col span="12"><span :class="{[taskStatus.type]: true}">{{taskStatus.text}}</span></van-col>
            </van-row>

            <van-panel class="bt-card" title="方案列表"></van-panel>
            <van-collapse v-model="solutionActive" v-if="solutions && solutions.length" accordion>
                <van-collapse-item v-for="item in solutions" :name="item.id" :key="item.id">
                    <div slot="title" class="clearfix">
                        <h3 class="task-detail-collapse-h3" :class="{'rejected': task_state == 'success' && item.solution_state != 'accept'}">
                            <span class="t-primary pull-right" v-if="item.solution_state == 'accept'">已接受</span>
                            <!-- <span class="t-gray pull-right" v-if="item.solution_state != 'accept'">已拒绝</span> -->
                            方案ID：{{item.solutionId}}
                        </h3>
                    </div>
                    <div class="task-detail-collapse-content">
                        <p style="margin-bottom: 10px;">{{item.content}}</p>
                        <p class="t-12 t-gray" @click="toAuthor(item.author)">提交者：{{item.author}}</p>
                        <p class="t-12 t-gray">提交时间：{{item.create_time}}</p>
                        <van-row class="bt-det-row" v-if="publisher == $account && task_state != 'success'">
                            <!-- <van-col span="4" offset="16" @click="handleSolution(item.solutionId)"><span class="t-gray">拒绝</span></van-col> -->
                            <van-col span="12" offset="12"><van-button class="bt-btn pull-right" size="small" @click="handleSolution(item.solutionId, true)" :loading="isBtnLoading" loading-text="提交中">接受</van-button></van-col>
                        </van-row>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <bt-noresult v-show="!solutions || !solutions.length" text="暂无方案列表" />
        </div>
        <div class="bt-footer-wrapper">
            <van-button v-if="isShowSubmit" class="bt-btn" size="large" block @click="toTasksolution">提交我的解决方案</van-button>
            <van-button v-else class="bt-btn" size="large" block @click="toBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    import timestampToDate from '@/utils/timestamp-to-date';
    import getState from '@/utils/get-state';
    import BtNoresult from '@/components/BtNoresult';
    export default {
        components: {
            BtNoresult
        },
        data() {
            return {
                missionId: this.$route.params.id,
                solutionActive: '',
                title: '',
                publisher: '',
                desc: '',
                skills: [],
                task_state: '',
                reward: '',
                solutions: [],
                isBtnLoading: false
            }
        },
        computed: {
            taskStatus() {
                return getState('task', this.task_state);
            },

            isShowSubmit() {
                // 是否提交过
                //let hasSumit = this.solutions.some( s => s.author == this.$account );
                let hasSumit = false;
                return this.publisher != this.$account && this.task_state != 'success' && !hasSumit;
            }
        },
        mounted() {
            let sessionData = window.sessionStorage.getItem('DATA_TASK');
            sessionData = sessionData && JSON.parse(sessionData);
            if( sessionData && sessionData.missionId === this.missionId  ) {
                this.initTaskData( sessionData );
            }else {
                this.getTaskInfo();   
            }
        },
        methods: {
            initTaskData(data) {
                this.title = data.title;
                this.publisher = data.author;
                this.desc = data.desc;
                this.skills = data.skill;
                this.task_state = data.task_state;
                this.reward = this.$web3api.fromWei(data.reward);
                if( data.solutions && data.solutions.length ) {
                    let ret;
                    data.solutions.forEach((d, i) => {
                        if( d.create_time ) {
                            d.create_time = timestampToDate(d.create_time);
                        }
                        if( d.answer_state === 'accept' ) {
                            ret = d;
                            data.solutions.splice(i, 1);
                        }
                    });
                    ret && data.solutions.unshift(ret);
                    this.solutions = data.solutions;
                    this.solutionActive = this.solutions[0].id;
                }
                window.sessionStorage.removeItem('DATA_TASK');
            },

            getTaskInfo() {
                this.$post("/skill/get_task_info", {
                    id: this.missionId
                }).then(res => {
                    if( res.state ) {
                        if( res.task ) {
                            this.initTaskData( {...res.task, solutions: res.solutions} );
                        }
                    }
                })

            },

            handleSolutionCallback(err) {
                this.$toast({
                    message: !err ? '操作成功' : '操作失败，请稍后重试'
                }); 
                !err && this.getTaskInfo();
            },

            handleSolution(id, flag) {
                if( this.isBtnLoading ) {
                    return;
                }
                this.isBtnLoading = true;
                if( flag ) {
                    this.$task.accept(id, (err, txHash) => {
                        this.handleSolutionCallback(err);
                        this.isBtnLoading = false;
                    })
                }else {
                    this.$task.reject(id, (err, txHash) => {
                        this.handleSolutionCallback(err);
                        this.isBtnLoading = false;
                    })
                }
            },

            toTasksolution() {
                if( this.task_state == 'waiting_chain' ) {
                    this.$toast({
                        message: '任务还在发行中，请稍后重试'
                    });
                    return;
                }
                this.$router.replace({ path: `/tasksolution/${this.missionId}` });
            },

            toAuthor(address) {
                this.$router.push({ path: `/talentdetail/${address}` });
            },

            toBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .task-detail {
        .bt-card {
            margin-bottom: 10px;
        }

        .task-detail-collapse-h3 {
            font-size: 14px;
            font-weight: 400;
            margin: 0;

            &.rejected {
                color: #999;
            }
        }

        .task-detail-collapse-content {
            color: #666;
        }
    }
</style>