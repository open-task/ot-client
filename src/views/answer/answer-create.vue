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
            <van-button class="bt-btn" size="large" block @click="submitAnswer" :loading="isBtnLoading" loading-text="提交中">创建问答</van-button>
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
                charge: "",
                isBtnLoading: false
            }
        },

        methods: {
            submitAnswer() {
                if( this.isBtnLoading ) {
                    return;
                }
                if( !this.title ) {
                    this.$toast({
                        message: '请输入问题标题'
                    });
                    return;
                }
                if( !this.desc ) {
                    this.$toast({
                        message: '请输入问题回复'
                    });
                    return;
                }
                if( !this.charge ) {
                    this.$toast({
                        message: '请输入问题悬赏的数额'
                    });
                    return;
                }else {
                    this.charge = Math.round( parseFloat(this.charge) * 100 ) /100;
                    if( this.charge <= 0 ) {
                        this.$toast({
                            message: '悬赏的数额必须大于0'
                        });
                        return;
                    }
                }

                let charge = this.$web3api.toWei(this.charge);
                let id = getId();

                this.isBtnLoading = true;
                this.$post("/skill/new_question", {
                    address: this.$account,
                    title: this.title,
                    content: this.desc,
                    reward: charge,
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
                                    this.isBtnLoading = false;
                                    this.$toast({
                                        message: '创建成功',
                                        onClose:() => {
                                            this.$router.push({ path: '/answerlist' });
                                        }
                                    }); 
                                }else {
                                    this.isBtnLoading = false;
                                    this.$toast({
                                        message: '创建失败，请稍后重试'
                                    });  
                                }
                            })

                        }else {
                            this.isBtnLoading = false;
                            this.$toast({
                                message: '系统有误，请稍后重试'
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