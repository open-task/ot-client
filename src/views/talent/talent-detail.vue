<template>
    <div class="talent-detail layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="自我介绍">
                <div class="bt-card-default">
                    <p>{{self_intro}}</p>
                </div>
            </van-panel>
            <van-panel class="bt-card" title="项目技能">
                <div class="bt-card-default">
                    <van-tag class="bt-tag" v-for="s in skills" :key="s">{{s}}</van-tag>
                </div>
            </van-panel>
            <van-panel class="bt-card" title="时间标价">
                <div class="bt-card-default">
                    <p>{{price}}</p>
                </div>
            </van-panel>
            <van-panel class="bt-card no-header">
                <div class="bt-card-default">
                    <van-row>
                        <van-col span="12">发布任务<span class="t-warning">3</span>个</van-col>
                        <van-col span="12">解决任务<span class="t-primary">1</span>个</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12">提交回答<span class="t-warning">4</span>个</van-col>
                        <van-col span="12">解决回答<span class="t-primary">3</span>个</van-col>
                    </van-row>
                </div>
            </van-panel>
            <van-cell style="margin-top: 10px;" title="邮箱地址" :value="email" />
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block @click="handleClickBack">返 回</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                account: this.$route.params.id,
                self_intro: '',
                price: '',
                charge: '',
                email: '',
                skills: []
            }
        },
        mounted() {
            this.getTalentData();
        },
        methods: {
            getTalentData() {
                this.$post(`/skill/get_user_info`, {
                    address: this.account
                }).then( res => {
                    this.self_intro  = res.user_info.self_intro;
                    this.price = res.user_info.price;
                    this.email = res.user_info.email;
                    this.skills = res.user_info.skill;
                } )
            },

            handleClickBack() {
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