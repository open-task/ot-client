<template>
    <div class="offer-card">
        <div class="task" @click='go_detail(offer.missionId)'>
            <div class="desc">
                <div class="title">{{offer.title}}</div>
                <div class="content">{{offer.timestamp|dateFormat}}</div>
                <div class="state">{{slove_type}}</div>

            </div>
            <div class="info">
                <div class="charge" style='margin-bottom:10px;'>
                    <span>{{reward}}</span> DET
                </div>
                <div class="submit">
                    <span>{{offer_amount}}</span> 提交
                </div>
            </div>

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
        methods: {
            go_detail: function(id) {
                let self = this
                self.$router.push({
                    'name': "detail",
                    params: {
                        'id': id
                    }
                })
            }
        },
        computed: {
            slove_type: function() {
                let self = this
                return {'success':"已解决",'published':"未提交"}[self.offer.task_state]
                
                
            },
            reward:function(){
                return this.offer.reward/1000000000000000000
                
            },
            info:function(){
                return JSON.parse(self.offer.context)
            },
            offer_amount: function() {
                let self = this
                let offer = self.offer
                let amount = offer.solution_num
                return amount
            },
            
            time: function() {
                let self = this
                let time = ""

                time = self.offer.timestamp
//                time = time.slice(0, time.length - 10)
                return time
            },
            content: function() {
                let self = this
                let content = ""
                try {
                    content = JSON.parse(self.offer.context)['desc']
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
            padding:10px 20px;

            .desc {
                display: inline-block;
                float: left;
                margin-right: 10px;
                width: calc(100% - 80px);
font-size: 12px;
                .title {
                    margin-bottom: 10px;
                    font-weight: bold;
                    font-size: 15px;
                    color: #2A2A2A;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .content {
                    color: #979797;
                    display: inline-block;
                    margin-right: 10px;
                    
                }

                .state {
                    display: inline-block;
                    color: #3c8ffb;
                }
            }

            .state,
            .info,
            .go {
                display: inline-block;
            }

            .go {
                width: 15px;
                margin-top: 10px;

            }


            .info {
                span {
                    color: #ffab00;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 30px;
                    display: inline-block;
                    vertical-align: middle;

                }

                .charge {}
            }
        }

        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

</style>
