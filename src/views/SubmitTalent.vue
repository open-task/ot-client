<template>
    <div class="submittalent create-offer">
        <offer-header></offer-header>

       <div class="input-group">
            <div class="title"><span>添加技能</span></div>
            <textarea v-model='skill' name="" id="" cols="30" rows="5" disabled placeholder="请选择技能"></textarea>
            <div class="select-skill">
                <span class="skill" v-for='(skill,index) in skill_list' @click='add_skill(index)'>{{skill.name}}</span>
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
                skill:"",
                select_skill:[],
                skill_list: []
                
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
                alert("请安装后打开MetaMask才可以进行继续的操作哦")
            }
            console.log(accounts)
            if (accounts.length < 1) {
                console.log("请打开MetaMask才可以进行继续的操作哦")
            }
            self.account = accounts[0]
            console.log(self.account)
            self.get_talent()
            self.$http.post("/skill/list_skills",{}).then(function(re){
                self.skill_list = re.body.skills
            })
            
        },
        methods: {
            add_skill: function(index) {
                let self = this
                let skill = self.skill_list[index]
                self.skill_list.splice(index,1)
                self.select_skill.push(skill.name)
                self.skill = self.select_skill.join(',')
            },
            get_talent: function() {
                let self = this
                if (self.account) {
                   console.log("add",self.account) 
                    self.$http.post(`/skill/get_user_info`,{address:self.account}).then(function(re) {
                        console.log(re)
                        let user_info = re.body.user_info
                        
                        let s = user_info.skill.join("\n")
                        self.skills = s
                        self.email = user_info.email
                        console.log(re)
                    })
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
                        address:self.account,
                        email:self.email
                    }).then(function(re) {
                        console.log(re)
                        if(re.body.state){
                            self.$router.push({name:"talentmap"})
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

        .van-field {
            margin-bottom: 10px;
        }
    }

</style>
