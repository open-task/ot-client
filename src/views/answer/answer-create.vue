<template>
    <div class="layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="问题标题">
                <van-field
                    v-model="title"
                    type="textarea"
                    placeholder="请输入问题标题"
                    rows="3"
                    autosize
                />
            </van-panel>
            <van-panel class="bt-card" title="问题内容描述">
                <van-field
                    v-model="desc"
                    type="textarea"
                    placeholder="请输入问题内容描述"
                    rows="6"
                    autosize
                />
            </van-panel>
            <van-field 
                style="margin-top: 10px;"
                v-model="charge" 
                type="number"
                placeholder="请输入您要悬赏的数额" 
                label="赏金"
                clearable
                class="det-field"
                label-width="48px"
            >
                <span class="t-warning" slot="right-icon">DET</span>
            </van-field>
        </div>
        
        <div class="bt-footer-wrapper" style="margin-top: 30px;">
            <van-button class="bt-btn" size="large" block @click="submitAnswer">创建问答</van-button>
        </div>
    </div>
</template>

<script>
    import getId from '@/utils/get-uniqueId';
    export default {
        data() {
            return {
                title: "",
                desc: "",
                charge: ""
            }
        },

        methods: {
            submitAnswer() {
                if( !this.title ) {
                    this.$toast({
                        message: '请输入问题标题',
                        position: 'middle'
                    });
                    return;
                }
                if( !this.desc ) {
                    this.$toast({
                        message: '请输入问题回复',
                        position: 'middle'
                    });
                    return;
                }
                if( !this.charge ) {
                    this.$toast({
                        message: '请输入问题悬赏的数额',
                        position: 'middle'
                    });
                    return;
                }

                let charge = this.$web3api.toWei(this.charge);
                let id = getId();

                this.$post("/question/new_question", {
                    address: this.$web3api.eth.accounts[0],
                    title: this.title,
                    content: this.desc,
                    reward: this.charge,
                    missionId: id
                }).then(res => {

                    this.$det.approve( this.$token_address, charge, (err, txHash) => {
                        if( !err ) {
                            let _data = JSON.stringify({
                                title: this.title,
                                desc: this.desc,
                                fn_type: "question"
                            })
                            this.$task.publish( id, charge, _data, (err, txHash) => {
                                if( !err ) {
                                    this.$toast({
                                        message: '创建成功',
                                        position: 'middle',
                                        onClose: () => {
                                            this.$router.push({ name: 'answerlist' });
                                        }
                                    }); 
                                }else {
                                    this.$toast({
                                        message: '创建失败，请稍后重试',
                                        position: 'middle'
                                    });  
                                }
                            })

                        }else {
                            this.$toast({
                                message: '系统有误，请稍后重试',
                                position: 'middle'
                            });  
                        }
                    })
                
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>