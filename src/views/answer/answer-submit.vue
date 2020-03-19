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
            <van-button class="bt-btn" size="large" block @click="handleSubmit" :loading="isBtnLoading" loading-text="提交中">提 交</van-button>
        </div>
    </div>
</template>

<script>
    import getId from '@/utils/get-uniqueId';
    export default {
        data() {
            return {
                missionId: this.$route.params.id,
                message: "",
                isBtnLoading: false
            }
        },

        beforeRouteLeave(to, from, next) {
            if( this.isBtnLoading ) {
                next(false)
            }
            next();
        },

        mounted() {
            window.onpopstate = (state) => {
                console.log('onpopstateonpopstateonpopstate')
                this.$router.push({ path: `/answerdetail/${this.missionId}` });
                window.onpopstate = null;
            }
        },

        methods: {
            handleSubmit() {
                if( this.isBtnLoading ) {
                    return;
                }

                if( !this.message ) {
                    this.$toast({
                        message: '请输入问题回复'
                    });
                    return;
                }

                const _id = getId();
                const _data = { 
                    missionId: this.missionId,
                    solutionId: _id,
                    content: this.message,
                    author: this.$account,
                    fn_type: "question",
                }

                this.isBtnLoading = true;
                this.$post("/skill/answer", _data).then(res => {
                    if( res.state ) {
                        this.$task.solve(_id, this.missionId, JSON.stringify(_data), (err, txHash) => {
                            if( !err ) {
                                this.$toast({
                                    message: '提交成功',
                                    onClose: () => {
                                        window.onpopstate = null;
                                        window.sessionStorage.removeItem('DATA_ANSWER');
                                        if( this.$router.currentRoute.name === 'answersubmit' ) {
                                            this.$router.replace({ path: `/answerdetail/${this.missionId}` });
                                        }else {
                                            this.$router.push({ path: `/answerdetail/${this.missionId}` });
                                        } 
                                    }
                                })
                            }else {
                                this.$toast({
                                    message: '系统有误，请稍后重试'
                                });
                            }

                            this.isBtnLoading = false;
                        })
                    }else {
                        this.isBtnLoading = false;
                        this.$toast({
                            message: '提交失败，请稍后重试'
                        });
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>