<template>
    <div>
        <van-panel class="bt-card" title="问题标题">
            <van-field
                v-model="answer_title"
                type="textarea"
                placeholder="请输入问题标题"
                rows="3"
                autosize
            />
        </van-panel>
        <van-panel class="bt-card" title="问题内容描述">
            <van-field
                v-model="answer_desc"
                type="textarea"
                placeholder="请输入问题回复"
                rows="6"
                autosize
            />
        </van-panel>
        <van-field 
            style="margin-top: 10px;"
            v-model="answer_reward" 
            type="number"
            placeholder="请输入您要悬赏的数额" 
            label="赏金"
        />
        <div class="bt-footer-wrapper" style="margin-top: 30px;">
            <van-button class="bt-btn" size="large" block>创建问答</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                answer_title: '',
                answer_desc: '',
                answer_reward: ''
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>