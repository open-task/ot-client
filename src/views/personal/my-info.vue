<template>
    <div class="personal has-tabbar">
        <div class="personal-card" style="margin-top:10px;">
            <span class="personal-account-icon"></span>
            <div class="personal-account">
                <p><span class="account">Account</span><br><span class="code">{{account}}</span></p>
            </div>
            <van-button type="default" size="small">点击复制</van-button>
        </div>
        <div class="personal-card">
            <van-row class="personal-row" type="flex" justify="space-between">
                <van-col span="11">
                    <div class="personal-budget budget-income" @click="toBudgeList('income')">
                        <h3><span class="budget-icon"></span>收入</h3>
                        <p class="personal-budget-sum">{{reward}} DET</p>
                        <p>总收入</p>
                    </div>
                </van-col>
                <van-col span="11">
                    <div class="personal-budget budget-pay" @click="toBudgeList('paid')">
                        <h3><span class="budget-icon"></span>支出</h3>
                        <p class="personal-budget-sum">{{paid}} DET</p>
                        <p>总支出</p>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="bt-pannel">
            <div class="bt-pannel-hd">
                <h3>我参与的</h3>
            </div>
            <div class="bt-pannel-bd">
                <van-row class="myinfo-row">
                    <van-col span="12">
                        <p class="myinfo-row-t">发布任务</p>
                        <p class="myinfo-row-s">{{task_count}}个</p>
                    </van-col>
                    <van-col span="12">
                        <p class="myinfo-row-t">提交方案</p>
                        <p class="myinfo-row-s">{{solution_count}}个</p>
                    </van-col>
                    <van-col span="12">
                        <p class="myinfo-row-t">接收方案</p>
                        <p class="myinfo-row-s">{{solution_accept_count}}个</p>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="bt-pannel">
            <div class="bt-pannel-hd">
                <h3>我的提问</h3>
            </div>
            <div class="bt-pannel-bd">
                <van-row class="myinfo-row">
                    <van-col span="12">
                        <p class="myinfo-row-t">发布问答</p>
                        <p class="myinfo-row-s">{{question_count}}个</p>
                    </van-col>
                    <van-col span="12">
                        <p class="myinfo-row-t">解答问题</p>
                        <p class="myinfo-row-s">{{answer_count}}个</p>
                    </van-col>
                    <van-col span="12">
                        <p class="myinfo-row-t">接受答案</p>
                        <p class="myinfo-row-s">{{answer_accept_count}}个</p>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="bt-pannel" v-if="skills && skills.length">
            <div class="bt-pannel-hd">
                <h3>我的技能</h3>
            </div>
            <div class="bt-pannel-bd">
                <van-tag class="bt-tag-default" v-for="s in skills" :key="s">{{s}}</van-tag>
            </div>
        </div>
        <van-cell-group>
            <van-cell class="personal-cell" is-link>
                <template slot="title">
                    <img class="personal-link-icon" src="/img/help-icon.png" alt="">
                    <span>帮助</span>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell class="personal-cell" is-link to="/aboutus" style="margin-bottom:10px;">
                <template slot="title">
                    <img class="personal-link-icon" src="/img/about-icon.png" alt="">
                    <span>关于我们</span>
                </template>
            </van-cell>
        </van-cell-group>
        <bt-tabbar activeIndex="4"></bt-tabbar>
    </div>
</template>

<script>
    import BtTabbar from '@/components/BtTabbar';
    export default {
        components: {
            BtTabbar,
        },
        data() {
            return {
                account: this.$web3api.eth.accounts[0],
                reward: 0,
                paid: 0,
                task_count: 0,
                solution_count: 0,
                solution_accept_count: 0,
                answer_count: 0,
                question_count: 0,
                answer_accept_count: 0,
                skills: []
            }
        },
        mounted() {
            this.getUserinfo();
        },
        
        methods: {
            getUserinfo() {
                this.$post('/skill/get_user_info', {
                    address: this.account
                }).then( res => {
                    if( res.state ) {
                        const _info = res.user_info;
                        this.reward = _info.reward;
                        this.paid = _info.paid;
                        this.task_count = _info.task.task_count;
                        this.solution_count = _info.task.solution_count;
                        this.solution_accept_count = _info.task.solution_accept_count;
                        this.answer_count = _info.question.answer_count;
                        this.question_count = _info.question.question_count;
                        this.answer_accept_count = _info.question.answer_accept_count;
                        this.skills = _info.skill
                    }
                } )
            },

            toBudgeList(type) {
                this.$router.push({ path: `/budgetlist/${type}/${ type == 'income' ? this.reward : this.paid }` });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .personal-card {
        border-radius: .2rem;
        padding: .28rem .42rem;
        background-color: #fff;
        display: flex;
        font-size: 14px;
        align-items: center;
        margin-bottom: 10px;

        .personal-account-icon {
            display: block;
            width: .76rem;
            height: .5rem;
            background-image: url('/img/personal-account.png');
            background-repeat: no-repeat;
            background-size: 100% auto;
        }

        .personal-account {
            flex: 1;
            padding: 0 16px;
            color: #666;
            font-size: 16px;
            overflow: hidden;
            overflow-wrap: break-word;

            .account {
                color: #7453F5;
            }

            .code {
                font-size: 12px;
            }
        }

        .van-button {
            color: #7453F5;
        }

        .personal-row {
            flex: 1;

            .personal-budget {
                border-radius: .2rem;
                padding: .18rem;
                color: #fff;
                font-size: 14px;

                h3 {
                    height: .28rem;
                    line-height: .28rem;
                    margin: 0;
                    font-weight: 400;
                    font-size: 14px;
                }

                p {
                    text-align: center;
                }

                .personal-budget-sum {
                    font-size: 18px;
                    font-weight: 600;
                    margin: .12rem 0;
                }
            }

            .budget-icon {
                display: inline-block;
                width: .24rem;
                height: .28rem;
                background-repeat: no-repeat;
                background-size: 100% auto;
                vertical-align: bottom;
                margin-right: .1rem;
            }

            .budget-income {
                background:linear-gradient(90deg,rgba(255,162,0,1),rgba(233,148,0,1));
                box-shadow:0px 7px 18px 0px rgba(234,149,0,0.22);

                .budget-icon {
                    background-image: url('/img/income-icon.png');
                }
            }

            .budget-pay {
                background:linear-gradient(90deg,rgba(75,151,249,1),rgba(116,82,245,1));
                box-shadow:0px 7px 18px 0px rgba(115,84,245,0.22);

                .budget-icon {
                    background-image: url('/img/pay-icon.png');
                }
            }
            
        }
    }

    .personal-cell {
        margin-top: 10px;
    }

    .personal-link-icon {
        width: .36rem;
        height: auto;
        margin-right: .36rem;
        vertical-align: middle;
        margin-top: -2px;
    }

    .myinfo-row {
        .van-col {
            margin-top: .3rem;
        }

        .myinfo-row-t {
            color: #AFAFAF;
            margin-bottom: 10px;
        }
        
        .myinfo-row-s {
            color: #7156F5;
            font-weight: 600;
            font-size: 16px;
        }

    }

    .bt-pannel {
        border-radius: 10px;
        background-color: #fff;
        padding: .24rem .3rem;
        font-size: 14px;

        & + .bt-pannel {
            margin-top: 10px;
        }

        .bt-pannel-hd {
            padding-bottom: .24rem;
            position: relative;

            h3 {
                margin: 0;
                font-size: 14px;
                color: #333;
                height: .3rem;
                line-height: .3rem;
                border-left: 2px solid #FFA200;
                padding-left: .14rem;
            }

            &:after {
                display: block;
                content: " ";
                position: absolute;
                left: .14rem;
                right: .14rem;
                bottom: 0;
                border-bottom: 1px solid #ebedf0;
                transform: scaleY(.5);
            }
        }

        .bt-pannel-bd {
            padding: 0 .14rem;
        }
    }
</style>