<template>
    <div class="task-create layout-vertical">
        <div class="bt-flex-scroller">
            <van-panel class="bt-card" title="自我介绍">
                <van-field
                    v-model="self_intro"
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
            <van-panel class="bt-card" title="时间标价">
                <van-field
                    v-model="price"
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
            <van-button class="bt-btn" size="large" block @click="submitTalent" :loading="isBtnLoading" loading-text="提交中">提交我的技能</van-button>
        </div>
    </div>
</template>

<script>
    import getId from '@/utils/get-uniqueId';
    export default {
        data() {
            return {
                isEdit: false,
                self_intro : '',
                price: '',
                email: '',
                skillValue: '',
                selectSkills: [],
                skills: [],
                isBtnLoading: false
                //'0xAC83AC647EE14D631d5ab237Dade127D754d9953' 
            }
        },
        mounted() {
            this.getSkills()
            .then(() => {
                this.getTalentData();
            })
        },
        methods: {
            getTalentData() {
                this.$post(`/skill/get_user_info`, {
                    address: this.$account
                }).then( res => {
                    if( res.user_info ) {
                        this.self_intro = res.user_info.self_intro;
                        this.price = res.user_info.price;
                        this.email = res.user_info.email;
                        this.isEdit = !!this.email;
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
                return this.$post("/skill/list_skills").then( res => {
                    if( res.skills && res.skills.length ) {
                        this.skills = res.skills.filter( s => !!s.name ).map( s => {
                            let _name = s.name
                            if( typeof s.name === 'object' ) {
                                _name = s.name.name;
                            }
                            return { name: _name, isSys: true }
                        } );
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

            setSkills() {
                return this.selectSkills.map(s => s.name);
            },

            submitTalent() {
                if( this.isBtnLoading ) {
                    return;
                }

                if( !this.email ) {
                    this.$toast({
                        message: '请输入您的邮箱地址'
                    });
                    return;
                }
                if( !this.selectSkills.length ) {
                    this.$toast({
                        message: '请输入您所会的技能'
                    });
                    return;
                }

                this.isBtnLoading = true;
                this.$post("/skill/update_user_info", {
                    skill: this.setSkills(),
                    address: this.$account,
                    email: this.email,
                    self_intro : this.self_intro,
                    price: this.price
                }).then( res => {
                    if( res.state ) {
                        this.$toast({
                            message: '提交成功',
                            onClose:() => {
                                this.$router.push({ path: '/talentclassify' });
                            }
                        })
                    }else {
                        this.$toast({
                            message: '提交失败，请稍后重试'
                        });
                    }
                    this.isBtnLoading = false;     
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