<template>
    <div class="trade-history">
        <offer-header title='总收入'></offer-header>


        <div class="earn">
            <div class="first">
                <span class="title">收入详情</span>
                <span class="charge"><span>6000</span> DET</span>

                <span class="type">总收入</span>
                <div class="float"></div>
            </div>
            <div class="history-list">
                <div class="history" v-for='task in task_list'>
                    <div class="desc">
                        <div class="title">{{task.name}}</div>
                        <div class="content">{{task.time}}</div>
                    </div>
                    <img src="/img/进入_ICON.png" alt="" class="go">
                    <div class="info">
                        <div class="charge" style='margin-bottom:10px;text-align:right'>
                            已完成
                        </div>
                        <div class="charge">
                            <span>+100</span> DET
                        </div>
                    </div>
                    <div class="state">待解决</div>

                    <div class="float"></div>
                </div>
            </div>
        </div>
        <div class="spend"></div>

    </div>

</template>
<script>
    import OfferHeader from '@/components/OfferHeader'

    export default {
        components: {
            OfferHeader
        },
        data() {
            return {
                task_list: [{
                    name: "OpenTask工程师",
                    time: "2019-08-14",
                    reward_det: '200'
                }]
            }
        },
        mounted() {
            let self = this
        }
    }

</script>
<style lang='scss'>
    .trade-history {
        background-color: #F2F2F2;

        .history-list {
            .history {
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
                .info,
                .go {
                    float: right;
                    display: inline-block;
                }

                .go {
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
        }

        .first {
            background-color: white;
            padding: 0px 20px;
            line-height: 40px;
            margin-bottom: 10px;

            .title {
                font-size: 15px;
                font-weight: bold;
            }

            .type,
            .charge {
                float: right;
            }

            .type {
                color: #ffab00;
                font-size: 13px;
                margin-right: 30px;
            }

            .charge {
                color: #979797;

                span {
                    color: #ffab00;
                    font-weight: bold;
                }
            }
        }
    }

</style>
