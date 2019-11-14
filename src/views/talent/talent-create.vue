<template>
    <div class="task-create layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="自我介绍">
                <van-field
                    v-model="title"
                    type="textarea"
                    placeholder="请输入自我介绍"
                    rows="3"
                    autosize
                    maxlength="100"
                />
            </van-panel>
            <van-panel class="bt-card" title="项目技能">
                <div class="skill-wrapper">
                    <p v-if="!selectSkills.length" class="skill-placeholder t-gray">请选择所用技能（多选、选填）</p>
                    <div class="skills-show" v-if="selectSkills.length">
                        <van-tag closeable class="bt-tag" v-for="(s, i) in selectSkills" :key="s.name" @click="removeSkill(i)">{{s.name}}</van-tag>
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
            <van-panel class="bt-card" title="时间标价">
                <van-field
                    v-model="desc"
                    type="textarea"
                    placeholder="请输入例如：周一 上午9:00-11:00 每小时100DET"
                    rows="6"
                    autosize
                />
            </van-panel>
            <van-field 
                style="margin-top: 10px;"
                v-model="email" 
                placeholder="请输入您的邮箱地址" 
                label="邮箱地址"
                clearable
            />
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block @click="submitTalent">提交我的技能</van-button>
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
                email: '',
                skillValue: '',
                selectSkills: [],
                skills: [],
                account: this.$web3api.eth.accounts[0]
                //'0xAC83AC647EE14D631d5ab237Dade127D754d9953' 
            }
        },
        mounted() {
            this.getSkills();
        },
        methods: {
            getTalentData() {
                this.$post(`/skill/get_user_info`, {
                    address: this.account
                }).then( res => {
                    if( res.user_info ) {
                        this.email = res.user_info.email;
                        this.selectSkills = res.user_info.skill.map(s => {
                            let isSys = false;
                            this.skills.forEach((ss, i) => {
                                if( ss.name === s ) {
                                    isSys = true;
                                    this.skills.splice(i, 1);
                                }
                            })
                            return {
                                name: s,
                                isSys
                            }
                        })
                    }

                } )
            },
            getSkills() {
                this.$post("/skill/list_skills").then( res => {
                    if( res.skills && res.skills.length ) {
                        this.skills = res.skills.filter( s => !!s.name ).map( s => ({ name: s.name, isSys: true }) );
                        this.getTalentData();
                    }
                })
            },
            checkHasSkill(s) {
                if( this.selectSkills.indexOf(s) > -1 ) {
                    this.$toast({
                        message: '已添加过该技能',
                        position: 'bottom'
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

            setSkills() {
                return this.selectSkills.map(s => s.name);
            },

            submitTalent() {
                if( !this.email ) {
                    this.$toast({
                        message: '请输入您的邮箱地址',
                        position: 'bottom'
                    });
                    return;
                }
                if( !this.selectSkills.length ) {
                    this.$toast({
                        message: '请输入您所会的技能',
                        position: 'bottom'
                    });
                    return;
                }

                this.$post(`/skill/update_user_info`, {
                    skill: this.setSkills(),
                    address: this.account,
                    email: this.email
                }).then( res => {
                    this.$toast({
                        message: '创建成功',
                        position: 'bottom'
                    }).then(() => {

                    })
                })
            }

        },
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
        .skill-field {
            padding: 10px 0;
        }
        .skills-sys {
            height: 64px;
            overflow: auto;
        }
    }
</style>