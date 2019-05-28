<template>
    <div class="talentmarket">
        <offer-header title="用户列表"></offer-header>
        <van-button plain hairline type="primary" style="margin-bottom:10px;width:100%;" @click="submit_talent">提交我的技能</van-button>

        <div class="market_group">
            <div class="telant" v-for="t in user_list">
                <div class="left">
                    <avatar username="name(t.address)"></avatar>

                    <div class="avatar"></div>
                </div>
                <div class="right">
                    <div class="address">用户:{{t.address}}</div>

                    
                    <div class="intro">邮件地址:{{t.email}}</div>
                    <div class="intro" >已解决任务{{t.solved}}次</div>
                    <div class="intro" v-if='t.mission_summary'>最近一次活动时间:{{t.mission_summary.last_active}}</div>
                    <div class="intro">
                        <span class="skill-tag" v-for='skill in t.skill'>{{skill}}</span>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
    import Avatar from 'vue-avatar'
    import OfferHeader from '@/components/OfferHeader'
    export default {
        components: {
            OfferHeader,
            Avatar
        },

        data() {
            return {
                user_list: []
            }
        },
        mounted() {
            let self = this
            console.log(self.$route.params)
            let skill_name = self.$route.params.skill
            self.$http.post(`/skill/skills_get_users`,{skill:skill_name} ).then(function(re) {
                console.log(re)
                
                self.user_list = re.body.user_list


            })
        },
        methods: {
            name: function(str) {
                return str.substring(2, 13)
            },
            submit_talent: function() {
                let self = this
                self.$router.push({
                    name: 'submittalent'
                })
            }
        }
    }

</script>
<style lang="scss">
    .talentmarket {
        .market_group {
            .telant {
                padding: 10px;
                background-color: white;
                border-radius: 5px;
                font-size: 0px;
                margin-bottom: 10px;

                .left {
                    width: 50px;
                    display: inline-block;
                    vertical-align: middle;
                }

                .right {
                    margin-left: 10px;
                    display: inline-block;
                    vertical-align: middle;
                    width: calc(100% - 60px);

                    .address {
                        font-size: 13px;
                        margin-bottom: 10px;
                        word-break: break-all;
                    }

                    .intro {
                        color: #35393F;
                        margin-bottom: 5px;
                        font-size: 13px;
                        .skill-tag{
                            background-color: RGBA(30, 25, 26, 1.00);
                            color: white;
                            margin-right: 5px;
                            padding: 0px 10px;
                            text-align: center;
                            border-radius: 4px;
                            display: inline-block;
                            line-height: 25px;
                            height: 25px;
                            font-size: 12px;
                            
                        }
                    }
                }

            }

        }
    }

</style>
