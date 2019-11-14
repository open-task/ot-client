<template>
    <div class="layout-vertical">
        <div class="answer-info-wrapper bt-flex-scroller">
            <div class="answer-info">
                <van-panel class="bt-card" title="后端MD5加密，如何保证KEY存放的安全性问题！求经验人士指点！">
                    <div class="bt-card-default">
                        <p class="t-gray">发布者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default bt-card-desc">
                        前端请求后端API会带cookie，我目前的做法是前端传cookie里面的一对参数，然后一个hash值，一堆参数和副武器的一个key加密MessageDigest，最后得出值与hash是否相同，就代表成功和失败。
现在关键就是这个key，这个key感觉就是关键呀，我卸载app.xml里面的，感觉好不保险哦，好担心被人偷了哈哈。请问大神们怎么办？你们都咋做呀？
                    </div>
                </van-panel>
            </div>
            <van-list
                v-model="list_loading"
                :finished="list_finished"
                finished-text="没有更多了"
                :error.sync="list_error"
                error-text="请求失败，点击重新加载"
                @load="handleListLoad"
            >
                <van-panel class="bt-card" title="最新回答">
                    <div class="bt-card-default">
                        <p class="t-gray">回答者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default">
                        如果考虑到加解密，可以考虑用非对称加密加密的秘钥生成，指出存在内存中。
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small">接受</van-button>
                        </span>
                        <div class="pull-left"><span class="t-gray">2019-09-23 14:23:20</span></div>
                    </div>
                </van-panel>
                <van-panel class="bt-card no-header">
                    <div class="bt-card-default">
                        <p class="t-gray">回答者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default">
                        如果考虑到加解密，可以考虑用非对称加密加密的秘钥生成，指出存在内存中。
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small">接受</van-button>
                        </span>
                        <div class="pull-left"><span class="t-gray">2019-09-23 14:23:20</span></div>
                    </div>
                </van-panel>
                <van-panel class="bt-card no-header">
                    <div class="bt-card-default">
                        <p class="t-gray">回答者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default">
                        如果考虑到加解密，可以考虑用非对称加密加密的秘钥生成，指出存在内存中。
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small">接受</van-button>
                        </span>
                        <div class="pull-left"><span class="t-gray">2019-09-23 14:23:20</span></div>
                    </div>
                </van-panel>
                <van-panel class="bt-card no-header">
                    <div class="bt-card-default">
                        <p class="t-gray">回答者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default">
                        如果考虑到加解密，可以考虑用非对称加密加密的秘钥生成，指出存在内存中。
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small">接受</van-button>
                        </span>
                        <div class="pull-left"><span class="t-gray">2019-09-23 14:23:20</span></div>
                    </div>
                </van-panel>
                <van-panel class="bt-card no-header">
                    <div class="bt-card-default">
                        <p class="t-gray">回答者：28384756192374839283749506837216374823</p>
                    </div>
                    <div class="bt-card-default">
                        如果考虑到加解密，可以考虑用非对称加密加密的秘钥生成，指出存在内存中。
                    </div>
                    <div class="bt-card-footer clearfix" slot="footer">
                        <span class="pull-right">
                            <van-button class="bt-btn" size="small">接受</van-button>
                        </span>
                        <div class="pull-left"><span class="t-gray">2019-09-23 14:23:20</span></div>
                    </div>
                </van-panel>
            </van-list>   
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block to="/answersubmit/1">提交我的回复</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: '',
                order_type: 0,
                order_type_options: [
                    { text: '默认排序', value: 0 },
                    { text: '时间优先', value: 1 },
                    { text: '价格优先', value: 2 },
                ],
                order_price: 0,
                order_price_options: [
                    { text: '价格不限', value: 0 },
                    { text: '5 DET及一下', value: 1 },
                    { text: '5-50 DET', value: 2 },
                    { text: '50-200 DET', value: 3 },
                    { text: '200-300 DET', value: 4 },
                    { text: '300 DET及以上', value: 5 }
                ],
                order_state: 0,
                order_state_options: [
                    { text: '全部', value: 0 },
                    { text: '待回答', value: 1 },
                    { text: '已回答', value: 2 }
                ],
                list_loading: false,
                list_finished: false,
                list_error: false
            }
        },
        methods: {
            handleSearch(e) {
                console.log(e.target.value)
            },
            handleCancel() {

            },
            handleListLoad() {
                this.loading = true;
                setTimeout(() => {
                    //this.loading = false;
                }, 1000)
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
        
    }
</style>