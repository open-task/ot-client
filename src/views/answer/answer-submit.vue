<template>
    <div>
        <van-panel class="bt-card" title="问题回复" style="margin-bottom:30px;">
            <van-field
                v-model="message"
                type="textarea"
                placeholder="请输入问题回复"
                rows="6"
                autosize
                maxlength="300"
            />
        </van-panel>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block @click="handleSubmit">提 交</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                missionId: this.$route.params.id,
                message: "",
            }
        },
        methods: {
            handleSubmit() {
                if( !this.message ) {
                    this.$toast({
                        message: '请输入问题回复',
                        position: 'middle'
                    });
                    return;
                }

                this.$post("/question/answer", {
                    missionId: this.missionId,
                    content: this.message,
                    author: this.$web3api.eth.accounts[0],
                }).then(res => {
                    if( res.answer_id ) {
                        const _data = JSON.stringify({ 
                            fn_type: "question",
                            solutionId: res.answer_id,
                            missionId: this.missionId 
                        })
                        
                        this.$task.solve(res.answer_id, this.missionId, _data, (err, txHash) => {
                            if( !err ) {
                                this.$toast({
                                    message: '提交成功',
                                    position: 'middle',
                                    onClose: () => {
                                        window.sessionStorage.removeItem('DATA_ANSWER')
                                        this.$router.push({ name: 'answerdetail', params: { id: this.missionId } });
                                    }
                                })
                            }else {
                                this.$toast({
                                    message: '系统有误，请稍后重试',
                                    position: 'middle'
                                });
                            }
                        })
                    }else {
                        this.$toast({
                            message: '提交失败，请稍后重试',
                            position: 'middle'
                        });
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>