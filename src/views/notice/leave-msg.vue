<template>
    <div class="leave-msg">
        <div class="input-group">
            <div class="title"><span>留言</span></div>
            <van-field
                v-model="message"
                type="textarea"
                placeholder="请输入留言"
                rows="6"
                :maxlength="100"
            />
            <div class="msg-sum"><span>{{message.length}}/100</span></div>
        </div>
        <div class="btn-msg-wrap">
            <van-button class="btn-msg" type="primary" block :loading="msgLoading" @click="handleMsgSubmit">提交留言</van-button>
        </div>
    </div>
</template>

<script>
    import OfferHeader from '@/components/OfferHeader';
    export default {
        components: {
            OfferHeader,
        },
        data() {
            return {
                msgLoading: false,
                message: ''
            }
        },
        methods: {
            handleMsgSubmit() {
                if( !this.$account ) {
                    this.$toast({
                        message: '要体验完整功能，请安装metamask，或者使用imtoken2.0打开 bountinet.com'
                    });
                    return;
                }
                if( !this.message ) {
                    this.$toast({
                        message: '请输入留言'
                    });
                    return;
                }
                this.msgLoading = true;
                this.$http.post("/skill/leave_message", {
                    content: this.message,
                    address: this.$account
                }).then(res => {
                    res = res.body;
                    this.msgLoading = false;
                    if( res.state ) {
                        this.$router.push({ path: '/funding' });
                    }
                }).catch(err => {
                    this.msgLoading = false;
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .leave-msg {
        font-size: 14px;
        .title {
            font-size: 16px;
            padding: 15px 0;
        }
        .input-group{
            padding: 10px 15px;

            .msg-sum {
                padding: 8px 0;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #777;
                text-align: right;
            }
        }

        .btn-msg-wrap {
            padding: 16px;

            .btn-msg {
                background: linear-gradient(90deg,rgba(75,151,249,1),rgba(116,82,245,1));
                border-radius: 6px;
                border: none;
            }

        }
    }
</style>