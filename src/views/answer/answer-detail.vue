<template>
    <div class="layout-vertical">
        <div class="answer-info-wrapper bt-flex-scroller">
            <div class="answer-info">
                <van-panel class="bt-card" :title="title">
                    <div class="bt-card-default">
                        <p class="t-gray t-12">发布者：{{address}}</p>
                        <p class="t-gray t-12">发布时间：{{create_time}}</p>
                    </div>
                    <div class="bt-card-default bt-card-desc" style="min-height: 60px;">{{content}}</div>
                </van-panel>
            </div>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多回答了"
                @load="handleListLoad"
            >
                <van-panel class="bt-card" :class="{'no-header': !!i, 'accept': a.answer_state == 'accept', 'reject': a.answer_state != 'accept' && question_state != 'published' }" v-for="(a, i) in answersList" title="最新回答" :key="a.id">
                    <div class="bt-card-default">
                        <p class="t-gray t-12">回答者：{{a.author}}</p>
                    </div>
                    <div class="bt-card-default">{{a.content}}</div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small" v-if="address ==  account && question_state == 'published'" @click="handleSolution(a.id)">接受</van-button>
                            <span class="t-primary" v-if="a.answer_state == 'accept'">已接受</span>
                        </span>
                        <div class="pull-left"><span class="t-gray">{{a.create_time}}</span></div>
                    </div>
                </van-panel>
            </van-list>   
        </div>
        <div class="bt-footer-wrapper">
            <van-button v-if="address != account && question_state == 'published'" class="bt-btn" size="large" block :to="`/answersubmit/${missionId}`">提交我的回复</van-button>
            <van-button v-else class="bt-btn" size="large" block @click="toBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    import timestampToDate from '@/utils/timestamp-to-date'
    export default {
        data() {
            return {
                missionId: this.$route.params.id,
                account: this.$web3api.eth.accounts[0],
                address: '',
                title: '',
                content: '',
                create_time: '',
                question_state: '',
                answersList: [],
                page: 1,
                pageSize: 10,
                loading: false,
                finished: true
            }
        },

        mounted() {
            console.log( this.$web3api.eth.accounts[0] )
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
                this.create_time = timestampToDate(data.create_time);
                this.question_state = data.question_state;
                let ret;
                data.answers.forEach((d, i) => {
                    if( d.answer_state === 'accept' ) {
                        ret = d;
                        data.answers.splice(i, 1);
                    }
                });
                ret && data.answers.unshift(ret);
                this.answersList = data.answers;
            },

            getAnswerData() {
                this.$post("/question/get_question", {
                    question_id: this.missionId
                }).then(res => {
                    if( res.state ) {
                        this.initAnswerData(res.question);
                    }else {
                        this.$toast({
                            message: '项目还在发行中，请稍后重试',
                            position: 'bottom'
                        });
                    }
                })
            },

            handleSolution(id) {
                this.$task.accept(id, (err, txHash) => {
                    if( !err ) {
                        this.$toast({
                            message: '操作成功',
                            position: 'bottom'
                        }).then(() => {
                            window.location.reload();
                        })
                        
                    }else {
                        this.$toast({
                            message: '操作失败，请稍后重试',
                            position: 'bottom'
                        })
                    }
                })
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