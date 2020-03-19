<template>
    <div class="layout-vertical">
        <div class="answer-info-wrapper bt-flex-scroller">
            <div class="answer-info">
                <van-panel class="bt-card" :title="title">
                    <div class="bt-card-default">
                        <p class="t-gray t-12">发布者：{{address}}</p>
                        <p class="t-gray t-12">发布时间：{{create_time}}</p>
                    </div>
                    <div class="bt-card-default bt-card-desc" style="min-height: 60px;">
                        <p>{{content}}</p>
                    </div>
                </van-panel>
            </div>
            <van-row class="bt-det-row" style="margin-bottom: 10px;">
                <van-col span="12"><span class="t-warning">{{reward}}</span>DET</van-col>
                <van-col span="12"><span :class="{[questionStatus.type]: true}">{{questionStatus.text}}</span></van-col>
            </van-row>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多回答了"
                @load="handleListLoad"
            >
                <van-panel class="bt-card" :class="{'no-header': !!i, 'accept': a.answer_state == 'accept', 'reject': question_state == 'success' && a.answer_state != 'accept' }" v-for="(a, i) in answersList" title="最新回答" :key="a.id">
                    <div class="bt-card-default">
                        <p class="t-gray t-12" @click="toAuthor(a.author)">回答者：{{a.author}}</p>
                    </div>
                    <div class="bt-card-default">{{a.content}}</div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small" v-if="address == $account && question_state != 'success'" @click="handleSolution(a.solutionId)" :loading="isBtnLoading" loading-text="提交中">接受</van-button>
                            <span class="t-primary" v-if="a.answer_state == 'accept'">已接受</span>
                        </span>
                        <div class="pull-left"><span class="t-gray t-12">{{a.create_time}}</span></div>
                    </div>
                </van-panel>
            </van-list>   
        </div>
        <div class="bt-footer-wrapper">
            <van-button v-if="address != $account && question_state != 'success'" class="bt-btn" size="large" block @click="toAnswersubmit">提交我的回复</van-button>
            <van-button v-else class="bt-btn" size="large" block @click="toBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    import timestampToDate from '@/utils/timestamp-to-date';
    import getState from '@/utils/get-state';
    export default {
        data() {
            return {
                missionId: this.$route.params.id,
                address: '',
                title: '',
                content: '',
                reward: '',
                create_time: '',
                question_state: '',
                answersList: [],
                loading: false,
                finished: true,
                isBtnLoading: false
            }
        },

        computed: {
            questionStatus() {
                return getState('question', this.question_state);
            }
        },

        mounted() {
            let sessionData = window.sessionStorage.getItem('DATA_ANSWER');
            sessionData = sessionData && JSON.parse(sessionData);
            if( sessionData && sessionData.missionId === this.missionId  ) {
                this.initAnswerData( sessionData );
            }else {
                this.getAnswerData();   
            }
        },
        methods: {
            handleListLoad() {
                
            },

            initAnswerData(data) {
                this.address = data.address;
                this.title = data.title;
                this.content = data.content;
                this.reward = this.$web3api.fromWei(data.reward);
                this.create_time = timestampToDate(data.create_time);
                this.question_state = data.question_state;
                let ret;
                data.answers.forEach((d, i) => {
                    if( d.create_time ) {
                        d.create_time = timestampToDate(d.create_time);
                    }
                    if( d.answer_state === 'accept' ) {
                        ret = d;
                        data.answers.splice(i, 1);
                    }
                });
                ret && data.answers.unshift(ret);
                this.answersList = data.answers;
                window.sessionStorage.removeItem('DATA_ANSWER');
            },

            getAnswerData() {
                this.$post("/skill/get_question", {
                    question_id: this.missionId
                }).then(res => {
                    if( res.state ) {
                        this.initAnswerData(res.question);
                    }else {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试'
                        });
                    }
                })
            },

            handleSolution(id) {
                if( this.isBtnLoading ) {
                    return;
                }
                this.isBtnLoading = true;
                this.$task.accept(id, (err, txHash) => {
                    if( !err ) {
                        this.$toast({
                            message: '操作成功',
                            onClose() {
                                window.location.reload();
                            }
                        })
                        
                    }else {
                        this.$toast({
                            message: '操作失败，请稍后重试'
                        })
                    }
                    this.isBtnLoading = false;
                })
            },

            toAnswersubmit() {
                if( this.question_state == 'waiting_chain' ) {
                    this.$toast({
                        message: '任务还在发行中，请稍后重试'
                    });
                    return;
                }
                this.$router.replace({ path: `/answersubmit/${this.missionId}` });
            },

            toAuthor(address) {
                this.$router.push({ path: `/talentdetail/${address}` });
            },

            toBack() {
                this.$router.go(-1);
            }
            
        },
    }
</script>

<style lang="scss" scoped>
    .answer-info-wrapper {
        padding-top: 0;

        .answer-info {
            margin-bottom: 10px;
        }

        .bt-card {
            &.accept {
                .t-gray, .bt-card-default {
                    color: #333;
                }
            }
            &.reject {
                opacity: .8;
            }
        }
    }
</style>