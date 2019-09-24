<template>
    <div class="submittalent create-offer">
        <offer-header title='提交技能'></offer-header>

        <div class="input-group">
            <div class="title"><span>添加技能</span></div>
            
            <textarea v-model='skill' class='skill-area' name="" id="" cols="30" rows="5" disabled placeholder="请选择技能"></textarea>
            <div class="select-skill">
                <span class="skill" v-for='(skill,index) in skill_list' @click='add_skill(index)'>{{skill.name}}</span>
            </div>
            <div class="new-skill">
                <input type="text" v-model='new_skill' placeholder="输入新技能">
                <span class="btn" @click='add_new_skill'>提交</span>
            </div>
        </div>


        <van-field v-model="email" placeholder="请输入你的邮件地址" />
        <van-button hairline type="primary" style="margin-bottom:10px;width:100%;" @click="submit_talent">提交我的技能</van-button>

    </div>

</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        data() {
            return {
                account: "",
                skills: '',
                email: "",
                skill: "",
                select_skill: [],
                skill_list: [],
                new_skill:"",

            }
        },
        components: {
            OfferHeader,
        },
        mounted() {
            let self = this
            let web3api, accounts
            try {
                web3api = new Web3(web3.currentProvider);
                accounts = web3api.eth.accounts
            } catch (e) {
                alert("使用当前钱包出错,请刷新重试")
            }
            console.log(accounts)
            if (accounts.length < 1) {
                console.log("请打开MetaMask才可以进行继续的操作哦")
            }
            self.account = accounts[0]
            console.log(self.account)
            
            self.$http.post("/skill/list_skills", {}).then(function(re) {
                console.log(re)
                self.skill_list = re.body.skills
                self.get_talent()
            })

        },
        methods: {
            add_new_skill:function(){
                let self = this
                let skill = self.new_skill
                self.select_skill.push(skill)
                self.skill = self.select_skill.join(',')
                self.new_skill = ""
            },
            add_skill: function(index) {
                let self = this
                let skill = self.skill_list[index]
                self.skill_list.splice(index, 1)
            self.select_skill.push(skill.name)
                self.skill = self.select_skill.join(',')
            },
            get_talent: function() {
                let self = this
                if (self.account) {
                    console.log("add", self.account)
                    self.$http.post(`/skill/get_user_info`, {
                        address: self.account
                    }).then(function(re) {
                        console.log(re)
                        let user_info = re.body.user_info

                        let s = user_info.skill.join(",")
                        self.skill = s
                        self.select_skill = user_info.skill
                        self.email = user_info.email
                        self.skill_list = self.skill_list.filter(function(e){
                            return !(self.select_skill.indexOf(e.name)+1)
                        })
                    })
                }else{
                    alert("请激活当前钱包")
                }
            },
            submit_talent: function() {
                let self = this
                if (self.account) {
                    let user_id = self.account
                    console.log(self.skills)
                    let skills = self.select_skill
                    skills = skills.filter(function(e) {
                        return e
                    })
                    console.log(skills)
                    self.$http.post(`/skill/update_user_info`, {
                        skill: skills,
                        address: self.account,
                        email: self.email
                    }).then(function(re) {
                        console.log(re)
                        if (re.body.state) {
                            self.$router.push({
                                name: "userinfo",
                                params:{
                                    id:self.account
                                }
                            })
                        }
                    })
                }
            }
        }
    }

</script>
<style lang='scss'>
    .submittalent {
        .label {
            font-size: 13px;
            margin: unset;
            margin-bottom: 10px;
        }
        .skill-area{
            padding:10px  10px;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 16px !important;
        }
        .input-group{
            padding: 10px 15px;
        }

        .van-field {
            margin-bottom: 10px;
        }
        .new-skill{
            margin-top: 10px;
            
            input{
                border: 1px solid gray;
                border-radius: 4px;
                width:calc(100% - 100px);
                margin-right: 10px;
                height: 38px;
                padding: 0px 5px;
                box-sizing: border-box;
                font-size: 14px;
                margin-top: 1px;
            }
            .btn{
                width: 80px;
                text-align: center;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                background: #36277B;
                border-radius: 4px;
                color: white;
                font-size: 16px;
                float: right;
                cursor: pointer;
            }
        }
    }

</style>
