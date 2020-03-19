<template>
    <div>
        <van-panel class="bt-card" title="解决方案" style="margin-bottom:30px;">
            <van-field
                v-model="message"
                type="textarea"
                placeholder="请输入解决方案"
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
                taskId: this.$route.params.id,
                message: '',
                isBtnLoading: false
            }
        },
        mounted() {
            window.onpopstate = (state) => {
                this.$router.push({ path: `/taskdetail/${this.taskId}`});
                !this.isBtnLoading && (window.onpopstate = null);
            }
        },
        methods: {
            handleSubmit() {
                if( this.isBtnLoading ) {
                    return;
                }
                if( !this.message ) {
                    this.$toast({
                        message: '请输入解决方案'
                    });
                    return;
                }

                const _id = getId();
                const _data = { 
                    missionId: this.taskId,
                    solutionId: _id,
                    content: this.message,
                    author: this.$account,
                    fn_type: "task",
                }
                this.isBtnLoading = true;
                this.$post('/skill/add_solution', _data)
                .then((res) => {
                    if( res.state ) {
                        this.$task.solve(_id, this.taskId, JSON.stringify(_data), (err, txHash) => {
                            if( !err ) {
                                this.$toast({
                                    message: '提交成功',
                                    onClose: () => {
                                        window.onpopstate = null;
                                        window.sessionStorage.removeItem('DATA_TASK');
                                        if( this.$router.currentRoute.name === 'tasksolution' ) {
                                            this.$router.replace({ path: `/taskdetail/${this.taskId}` });
                                        }else {
                                            this.$router.push({ path: `/taskdetail/${this.taskId}` });
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
                    }
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>