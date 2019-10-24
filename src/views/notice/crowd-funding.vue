<template>
    <div class="crowd-funding create-offer">
        <offer-header title='公告'></offer-header>
        <div class="input-group">
            <div class="title"><span>超零三国开始众筹了！！！</span></div>
            <div class="desc">发起方：超零三国</div>
            <div class="detail">
                <h3>众筹详情：</h3>
                <div class="funding-q">1、什么是贡献币？</div>     
                <p class="funding-a">贡献币是超零三国发行的项目私募股份。所募集的资金用于创新项目研发，未来可享受项目盈利分红。</p>
                <div class="funding-q">2、申购价格和申购门槛是多少？</div>     
                <p class="funding-a">当前SERO的市价，1个SERO兑换1个贡献币；亦即是1:1兑换。</p>
                <div class="funding-q">3、贡献币投资的本金什么时候能拿回？ </div>     
                <p class="funding-a">项目方将按照众筹金额的1.5倍SERO进行回购。另外1个 贡献币可以兑换80积德币，用于畅玩超零三国游戏。</p>
                <div class="funding-q">4、更多福利：</div>     
                <p class="funding-a">凡在盘古节点pos的用户，每月空投价值pos金额10%的积德币</p>
            </div>
            <div class="sum-list">
                <van-row gutter="20">
                    <van-col span="8"><span class="sum">50SERO</span></van-col>
                    <van-col span="8"><span class="sum">100SERO</span></van-col>
                    <van-col span="8"><span class="sum">500SERO</span></van-col>
                </van-row>
                <van-row gutter="20">
                    <van-col span="8"><span class="sum">1000SERO</span></van-col>
                    <van-col span="8"><span class="sum">5000SERO</span></van-col>
                    <van-col span="8"><span class="sum">10000SERO</span></van-col>
                </van-row>
            </div>
            <div class="code">
                <img src="/img/chole.png" alt="" class="chole-code">
                <p>申购需扫码加客服chole小姐姐微信</p>
            </div>
        </div>
        <div class="msg-board">
            <div class="msg-board-hd">
                <router-link class="t-msg" to="/msg">写留言</router-link>
                <span class="t-title">精选留言</span>
            </div>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getMsgList"
            >
                <dl class="board-blk" v-for="item in msgList" :key="item.id">
                    <dt>{{item.address}}</dt>
                    <dd>{{item.content}}</dd>
                </dl>
            </van-list>
        </div>
    </div>
</template>

<script>
    import OfferHeader from '@/components/OfferHeader';
    export default {
        components: {
            OfferHeader,
        },
        created() {

        },
        data() {
            return {
                msgList: [],
                page: 1,
                count: 10,
                loading: false,
                finished: false
            }
        },
        methods: {
            getMsgList() {
                this.$http.post("/skill/get_messages", {
                    page: this.page,
                    count: this.count
                }).then(res => {
                    res = res.body;
                    if( res.messages && res.messages.length ) {
                        res.messages.forEach(d => {
                            this.msgList.push(d);
                        });
                    }
                    this.loading = false;
                    this.page++;
                    if( this.msgList.length >= res.count ) {
                        this.finished = true;
                    }

                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .crowd-funding {
        .input-group{
            padding: 10px 15px;
            .desc {
                font-size: 12px;
                color: #999;
                padding: 10px 0 10px 12px;
                border-bottom: 1px solid #F2F2F2;
            }
            .detail {
                padding: 10px 0;
                color: #666;
                font-size: 14px;
                line-height: 26px;
                border-bottom: 1px solid #F2F2F2;

                h3 {
                    font-size: 14px;
                    font-weight: 400;
                    margin-top: 0;
                    margin-bottom: 10px;
                }

                .funding-a {
                    text-indent: 20px;
                    margin-bottom: 10px;
                }
            }
            .sum-list {
                padding: 10px 0;

                .van-row {
                    & + .van-row  {
                        margin-top: 10px;
                    }        
                }

                .sum {
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    vertical-align: middle;
                    color: #4862E6;
                    background-color: rgba(242,244,252,1);
                    border-radius: 3px;
                    font-size: 14px;
                    padding: 8px 0;
                }
            }
        }

        .code {
            padding: 20px 0 32px;

            .chole-code {
                width: 39.7%;
                display: block;
                margin: 0 auto;
            }

            p {
                font-size: 14px;
                color: #666;
                text-align: center;
                padding-top: 16px;
            }
        }

        .msg-board {
            background-color: #F2F2F2;
            padding: 0 16px 30px;

            .msg-board-hd {
                height: 20px;
                line-height: 20px;
                padding: 16px 0;
                font-size: 14px;

                .t-msg {
                    float: right;
                    color: #4862E6;
                    cursor: pointer;
                }

                .t-title {
                    color: #777;
                }

            }

            .board-blk {
                margin: 0;
                padding: 16px 0;

                & + .board-blk {
                    border-top: 1px solid #ececec;
                }

                dt {
                    color: #999;
                    margin-bottom: 10px;
                    font-size: 12px;
                }

                dd {
                    margin: 0;
                    color: #555;
                    font-size: 14px;
                }
            }
        }
    }
</style>