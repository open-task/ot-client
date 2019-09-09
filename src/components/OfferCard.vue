<template>
    <div class="offer-card">
        <div class="task" @click='go_detail(offer.mission_id)'>
            <div class="desc">
                <div class="title">{{title}}</div>
                <div class="content">{{time}}</div>
            </div>
            <img src="/img/进入_ICON.png" alt="" class="go">
            <div class="info">
                <div class="charge" style='margin-bottom:10px;'>
                    <span>{{offer.reward_det}}</span> DET
                </div>
                <div class="submit">
                    <span>{{offer_amount}}</span> 提交
                </div>
            </div>
            <div class="state">待解决</div>

            <div class="float"></div>
        </div>

        
    </div>

</template>
<script>
    export default {
        props: [
            "offer"
        ],
        data() {
            return {

            }
        },
        mounted() {
            let self = this
            console.log(self.offer)
        },
        methods:{
            go_detail:function(id){
                let self = this 
                self.$router.push({'name':"detail",params:{'id':id}})
            }
        },
        computed: {
            offer_amount: function() {
                let self = this
                let offer = self.offer
                let amount = offer.solutions && offer.solutions.length ? offer.solutions.length : 0
                return amount
            },
            title: function() {
                let self = this
                let title = ""
                try {
                    title = JSON.parse(self.offer.data)['title']
                } catch {
                    title = "未命名"
                }
                return title
            },
            time: function() {
                let self = this
                let time = ""

                time = self.offer.time
                time = time.slice(0, time.length - 10)

                return time
            },
            content: function() {
                let self = this
                let content = ""
                try {
                    content = JSON.parse(self.offer.data)['desc']
                } catch {
                    content = self.offer.data

                }
                return content
            }
        }
    }

</script>
<style lang='scss'>
    .offer-card {
        .task {
            background-color: white;
            padding: 20px;

            .desc {
                display: inline-block;
                float: left;

                .title {
                    margin-bottom: 10px;
                    font-weight: bold;
                    font-size: 20px;
                    color: #2A2A2A;
                }

                .content {
                    color: #979797;
                }
            }

            .state,
            .info,.go {
                float: right;
                display: inline-block;
            }
            .go{
                width: 15px;
                margin-top: 10px;
                
            }
            .state {
                color: #3c8ffb;
                vertical-align: bottom;
                margin-top: 30px;
                margin-right: 20px;
            }

            .info {
                margin-right: 10px;
                span {
                    color: #ffab00;
                    
                }
            }
        }

        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

</style>
