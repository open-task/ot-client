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
            <van-row class="task-detail-row">
                <van-col span="12"><span class="t-warning">{{reward}}</span>DET</van-col>
                <van-col span="12"><span :class="getTaskColor">{{statusTextEm[taskStatus]}}</span></van-col>
            </van-row>
            <van-panel class="bt-card" title="方案列表">
            </van-panel>

            <van-collapse v-model="solutionActive" style="margin-bottom:10px;" v-if="solutions && solutions.length">
                <van-collapse-item v-for="item in solutions" :name="item.id" :key="item.id">
                    <div slot="title" class="clearfix">
                        <h3 class="task-detail-collapse-h3" :class="{'rejected': taskStatus == 'Solved' && item.status == 'Rejected'}">
                            <span class="t-primary pull-right" v-if="taskStatus == 'Solved' && item.status == 'Accepted'">已接受</span>
                            方案ID：{{item.id}}
                        </h3>
                    </div>
                    <div class="task-detail-collapse-content">
                        <p>{{item.content}}</p>
                        <van-row class="task-detail-row" v-if="publisher == account && item.status == 'Unprocessed'">
                            <van-col span="6" offset="12" @click="handleSolution(item.id)"><span class="t-gray">拒绝</span></van-col>
                            <van-col span="6" @click="handleSolution(item.id, true)"><span class="t-primary">接受</span></van-col>
                        </van-row>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="bt-footer-wrapper">
            <van-button v-if="isShowSubmit" class="bt-btn" size="large" block :to="`/tasksolution/${missionId}`">提交我的解决方案</van-button>
            <van-button v-else class="bt-btn" size="large" block @click="toBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                missionId: this.$route.params.id,
                solutionActive: [],
                title: '',
                publisher: '',
                desc: '',
                skills: [],
                taskStatus: '',
                reward: '',
                account: this.$web3api.eth.accounts[0],
                solutions: [],
                statusTextEm: {
                    'Published': '待解决',
                    'Unsolved': '已提交',
                    'Solved': '已解决'
                }
            }
        },
        computed: {
            getTaskColor() {
                return {
                    't-primary': this.taskStatus == 'Published',
                    't-warning': this.taskStatus == 'Unsolved',
                    't-gray': this.taskStatus == 'Solved'
                }
            },

            isShowSubmit() {
                let hasSumit = this.solutions.some( s => s.solver == this.account );
                return this.publisher != this.account && this.taskStatus != 'Solved' && !hasSumit;
            }
        },
        mounted() {
            console.log(this.account)
            this.getTaskInfo();
        },
        methods: {
            getTaskInfo() {
                this.$post('/v1/', {
                    "jsonrpc": "2.0",
                    "method": "GetMissionInfo",
                    "params": [this.missionId],
                    "id": "11"
                }).then( res => {
                    res = res.result;
                    if( res ) {
                        let data = JSON.parse(res.data);
                        this.title = data.title;
                        this.publisher = res.publisher;
                        this.desc = data.desc;
                        this.skills = data.skills;
                        this.taskStatus = res.status;
                        this.reward = res.reward_det;
                        this.solutions = res.solutions.map(s => {
                            let _sd = JSON.parse(s.data); 
                            return {
                                id: s.solution_id,
                                status: s.status,
                                content: _sd.content,
                                solver: s.solver
                            }
                        })
                    }
                })
            },

            handleSolutionCallback(err) {
                if( !err ) {
                    this.$toast({
                        message: '操作成功',
                        position: 'bottom'
                    }); 
                }else {
                    window.location.reload();
                }
            },

            handleSolution(id, flag) {
                if( flag ) {
                    this.$task.accept(id, (err, txHash) => {
                        handleSolutionCallback(err);
                    })
                }else {
                    this.$task.reject(id, (err, txHash) => {
                        handleSolutionCallback(err);
                    })
                }
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

        .task-detail-row {
            background-color: #fff;

            .van-col {
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                position: relative;
                color: #999;

                &:after {
                    position: absolute;
                    box-sizing: border-box;
                    content: ' ';
                    pointer-events: none;
                    right: 0;
                    top: .25rem;
                    bottom: .25rem;
                    border-right: 1px solid #ebedf0;
                    -webkit-transform: scaleX(.5);
                    transform: scaleX(.5);
                }

                &:last-child::after {
                    display: none;
                }

                .t-warning {
                    margin-right: 5px;
                }
            }
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