<template>
    <div class="talentmarket">
       <offer-header></offer-header>
       <van-button plain hairline type="primary" style="margin-bottom:10px;width:100%;" @click="submit_talent">提交我的技能</van-button>
       
        <div class="market_group">
            <div class="telant" v-for="t in telant_list">
                <div class="left">
                    <avatar username="name(t.address)"></avatar>

                    <div class="avatar"></div>
                </div>
                <div class="right">
                    <div class="address">用户:{{t.address}}</div>

                    <div class="intro">提交方案{{t.request_times}}次,已接受{{t.accept_times}}次</div>
                    <div class="intro">发布任务{{t.tasks}}次,已被解决{{t.solved}}次</div>
                    <div class="intro">最近一次活动</div>
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
        
        data(){
            return{
                telant_list:[
                    {
                        address:"0xnj12j3nnh31bhaadsj",
                        last_login:"2019-5-8",
                        request_times:10,
                        accept_times:2,
                        tasks:1,
                        solved:1
                    }
                ]
            }
        },
        mounted(){
            let self = this
            self.$http.get("/backend/v1/skill/top").then(function(re){
                console.log(re)
                
            })
        },
        methods: {
            name: function(str) {
                return str.substring(2, 13)
            },
            submit_talent:function(){
                let self = this
                self.$router.push({name:'submittalent'})
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

                .left {
                    width: 50px;
                    display: inline-block;
                    vertical-align: middle;
                }

                .right {
                    margin-left: 10px;
                    display: inline-block;
                    vertical-align: middle;

                    .address {
                        font-size: 15px;
                        margin-bottom: 10px;
                    }

                    .intro {
                        color: #35393F;
                        margin-bottom: 5px;
                        font-size: 13px;
                    }
                }

            }

        }
    }

</style>
