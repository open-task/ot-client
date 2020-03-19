<template>
    <div class="task-create layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="项目名称">
                <van-field
                    v-model="title"
                    type="textarea"
                    placeholder="请输入项目名称"
                    rows="3"
                    autosize
                    maxlength="30"
                />
            </van-panel>
            <van-panel class="bt-card" title="项目描述">
                <van-field
                    v-model="desc"
                    type="textarea"
                    placeholder="请输入项目具体描述，需要什么样的服务，工期大约多少？"
                    rows="6"
                    autosize
                    maxlength="1000"
                />
            </van-panel>
            <van-panel class="bt-card" title="项目技能">
                <div class="skill-wrapper">
                    <p v-if="!selectSkills.length" class="skill-placeholder t-gray">请选择所用技能（多选、选填）</p>
                    <div class="skills-show" v-if="selectSkills.length">
                        <van-tag closeable class="bt-tag" v-for="(s, i) in selectSkills" :key="s.name" @close="removeSkill(i)">{{s.name}}</van-tag>
                    </div>
                </div>
                <template slot="footer">
                    <div class="skills-sys">
                        <van-tag class="bt-tag-default" v-for="(s, i) in skills" :key="s.name" @click="addSkill(i)">{{s.name}}</van-tag>
                    </div>
                    <van-field
                        v-model="skillValue"
                        clearable
                        placeholder="请输入新技能"
                        maxlength="30"
                        class="skill-field"
                    >
                        <van-button class="bt-btn" slot="button" size="small" @click="submitSkill">提交</van-button>
                    </van-field>
                </template>
                
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
                maxlength="20"
            >   
                <span class="t-warning" slot="right-icon">DET</span>
            </van-field>
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block @click="submitTask" :loading="isBtnLoading" loading-text="提交中">创建任务</van-button>
        </div>
    </div>
</template>

<script>
    import getId from '@/utils/get-uniqueId';
    export default {
        data() {
            return {
                title: '',
                desc: '',
                charge: '',
                skillValue: '',
                selectSkills: [],
                skills: [],
                isBtnLoading: false
            }
        },
        mounted() {
            this.getSkills();
            
        },
        methods: {
            getSkills() {
                this.$post("/skill/list_skills").then( res => {
                    if( res.skills && res.skills.length ) {
                        this.skills = res.skills.filter( s => !!s.name && typeof s.name === 'string' ).map( s => ({ name: s.name, isSys: true }) );
                    }
                })
            },
            checkHasSkill(s) {
                if( this.selectSkills.indexOf(s) > -1 ) {
                    this.$toast({
                        message: '已添加过该技能'
                    });
                    return true;
                }
                return false;
            },
            addSkill(index) {
                let s = this.skills.splice(index, 1)[0];
                if( !this.checkHasSkill(s) ) {
                    this.selectSkills.push(s)
                }
            },

            submitSkill() {
                if( !this.checkHasSkill(this.skillValue) ) {
                    this.selectSkills.push({
                        name: this.skillValue,
                        isSys: false
                    });
                    this.skillValue = '';
                }
            },

            removeSkill(index) {
                let s = this.selectSkills.splice(index, 1)[0];
                if( s.isSys ) {
                    this.skills.push(s);
                }   
            },

            getSumbitSkills() {
                return this.selectSkills.map(s => s.name);
            },

            submitTask() {
                if( this.isBtnLoading ) {
                    return;
                }
                if( !this.title ) {
                    this.$toast({
                        message: '请输入项目名称'
                    });
                    return;
                }
                if( !this.desc ) {
                    this.$toast({
                        message: '请输入项目描述'
                    });
                    return;
                }
                if( !this.charge ) {
                    this.$toast({
                        message: '请输入项目悬赏的数额'
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
                let data = {
                    title: this.title,
                    desc: this.desc,
                    skills: this.getSumbitSkills()
                }
                this.isBtnLoading = true;
                this.$det.approve( this.$token_address, charge, (err, txHash) => {
                    if( !err ) {
                        let id = getId();
                        this.$task.publish( id, charge, JSON.stringify(data), (err, txHash) => {
                            if( !err ) {
                                this.$post("/skill/add_task", {
                                    missionId: id,
                                    skill: data.skills,
                                    title: data.title,
                                    desc: data.desc,
                                    reward: charge,
                                    author: this.$account
                                }).then(() => {
                                    this.isBtnLoading = false;
                                    this.$dialog.alert({
                                        title: '创建成功',
                                        message: `<p>项目哈希：${this.$account}</p><p>项目Id：${id}</p>`,
                                        onClosed: () => {
                                            this.$router.push({ path: '/tasklist' });
                                        }
                                    })
                                })
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
            }

        }
    }
</script>

<style lang="scss" scoped>
    .task-create {
        .skill-wrapper {
            min-height: 60px;
        }
        .skill-placeholder {
            padding: 10px 16px;
        }
        .skills-show {
            padding: 0 10px 16px;
        }
        .det-field {
            .van-field__label {
                width: 48px;
            }
        }
        .skill-field {
            padding: 10px 0;
        }
        .skills-sys {
            height: 64px;
            overflow: auto;
        }
    }
</style>