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
            <van-button class="bt-btn" size="large" block @click="handleSubmit">提 交</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                message: ''
            }
        },
        methods: {
            handleSubmit() {
                if( !this.message ) {
                    this.$toast({
                        message: '请输入解决方案',
                        position: 'bottom'
                    });
                    return;
                }

                this.$task.solve(solution_id, task_id, data, (err, txHash) => {
                    if( !err ) {
                        this.$toast({
                            message: '提交成功',
                            position: 'bottom'
                        }).then(() => {
                            this.$router.push({ path: '/taskdetail', params: { id: this.id } })
                        })
                    }else {
                        this.$toast({
                            message: '系统有误，请稍后重试',
                            position: 'bottom'
                        });
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>