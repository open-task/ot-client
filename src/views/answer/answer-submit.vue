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
            <van-button class="bt-btn" size="large" block>提 交</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "",
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>