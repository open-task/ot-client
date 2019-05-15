<template>
    <div class="submittalent">
        <offer-header></offer-header>

        <p class='label'>请输入你的技能,每行一项</p>
        <van-field v-model="skills" type="textarea" placeholder="每行一项技能" rows="5" autosize />

        <!--        <van-field v-model="email" placeholder="请输入你的邮件地址" />-->
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
                email: ""
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
                console.log()
                alert("请安装后打开MetaMask才可以进行继续的操作哦")
            }

            if (accounts.length < 1) {
                alert("请打开MetaMask才可以进行继续的操作哦")
            }
            self.account = accounts[0]
            console.log(self.account)
            self.get_talent()
            
        },
        methods: {
            get_talent: function() {
                let self = this
                if (self.account) {
                    self.$http.get(`/backend/v1/user/${self.address}/skill`).then(function(re) {
                        let skills = re.body.map(function(e) {
                            return e.skill
                        })
                        let s = skills.join("/n")
                        self.skills = s
                        console.log(s)
                        console.log(re)
                    })
                }
            },
            submit_talent: function() {
                let self = this
                if (self.account) {
                    let user_id = self.account
                    console.log(self.skills)
                    let skills = self.skills.split('\n')
                    skills = skills.filter(function(e) {
                        return e
                    })
                    console.log(skills)
                    self.$http.post(`/backend/v1/user/${self.address}/skill`, {
                        skill: skills
                    }).then(function(re) {
                        console.log(re)
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
