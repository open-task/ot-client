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
    import getId from '@/utils/get-uniqueId';
    export default {
        data() {
            return {
                taskId: this.$route.params.id,
                message: ''
            }
        },
        mounted() {
            window.onpopstate = (state) => {
                this.$router.push({ path: `/taskdetail/${this.taskId}`});
                window.onpopstate = null;
            }
        },
        methods: {
            handleSubmit() {
                if( !this.message ) {
                    this.$toast({
                        message: '请输入解决方案',
                        position: 'middle'
                    });
                    return;
                }
                const _data = JSON.stringify({ content: this.message })
                this.$task.solve(getId(), this.taskId, _data, (err, txHash) => {
                    if( !err ) {
                        this.$toast({
                            message: '提交成功',
                            position: 'middle',
                            onClose: () => {
                                this.$router.replace({ path: `/taskdetail/${this.taskId}`});
                            }
                        })
                    }else {
                        this.$toast({
                            message: '系统有误，请稍后重试',
                            position: 'middle'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>