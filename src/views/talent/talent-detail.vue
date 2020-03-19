<template>
    <div class="talent-detail layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="自我介绍">
                <div class="bt-card-default">
                    <p :class="{'t-gray': !self_intro}">{{self_intro || '暂未填写自我介绍'}}</p>
                </div>
            </van-panel>
            <van-panel class="bt-card" title="项目技能">
                <div class="bt-card-default">
                    <van-tag class="bt-tag" v-for="s in skills" :key="s">{{s}}</van-tag>
                </div>
            </van-panel>
            <van-panel class="bt-card" title="时间标价">
                <div class="bt-card-default">
                    <p :class="{'t-gray': !price}">{{price || '暂未填写时间标价'}}</p>
                </div>
            </van-panel>
            <van-panel class="bt-card no-header">
                <div class="bt-card-default">
                    <van-row style="margin-bottom: 10px;">
                        <van-col span="12">提交方案<span class="t-warning"> {{solution_count}} </span>个</van-col>
                        <van-col span="12">解决任务<span class="t-primary"> {{solution_accept_count}} </span>个</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12">提交回答<span class="t-warning"> {{answer_count}} </span>个</van-col>
                        <van-col span="12">解决回答<span class="t-primary"> {{answer_accept_count}} </span>个</van-col>
                    </van-row>
                </div>
            </van-panel>
            <van-cell style="margin-top: 10px;" title="邮箱地址" :value="email" />
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block @click="toBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                address: this.$route.params.id,
                self_intro: '',
                price: '',
                email: '',
                skills: [],
                solution_count: 0,
                solution_accept_count: 0,
                answer_count: 0,
                answer_accept_count: 0
            }
        },
        mounted() {
            this.getTalentData();
        },
        methods: {
            getTalentData() {
                this.$post(`/skill/get_user_info`, {
                    address: this.address
                }).then( res => {
                    let _info = res.user_info;
                    if( _info ) {
                        this.self_intro = _info.self_intro
                        this.price =  _info.price
                        this.email = _info.email;
                        this.skills = _info.skill;
                        this.solution_count = _info.task.solution_count;
                        this.solution_accept_count = _info.task.solution_accept_count;
                        this.answer_count = _info.question.answer_count;
                        this.answer_accept_count = _info.question.answer_accept_count;
                    }
                } )
            },

            toBack() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .talent-detail-wrapper {
        .van-row {
            .t-warning,
            .t-primary {
                margin: 0 2px;
            }

            & + .van-row {
                margin-top: 10px;
            }
        }
    }
</style>