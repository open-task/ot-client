<template>
    <div class="myinfo create-offer">
        <offer-header title='我的信息'></offer-header>

        <div class="input-group">
            <div class="title"><span>我的技能</span></div>

            <div class="skills">
                <span class="skill" v-for='(skill,index) in skill_list'>{{skill}}</span>
            </div>


        </div>
        <div class="input-group">
            <div class="title"><span>我的邮箱</span></div>

            <div class="content">
                <p>{{email}}</p>
            </div>


        </div>
        <div class="input-group">
            <div class="title"><span>我的地址</span></div>

            <div class="content">
                {{account}}
            </div>


        </div>


        <van-button hairline type="primary" style="margin-bottom:10px;width:100%;" @click="go_submit_telent">修改我的信息</van-button>

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
                new_skill: "",

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


        },
        methods: {
            go_submit_telent: function() {
                let self = this
                self.$router.push({
                    name: 'submittalent'
                })
            },
            get_talent: function() {
                let self = this
                let address = self.$route.params.id
                    self.$http.post(`/skill/get_user_info`, {
                        address: address
                    }).then(function(re) {
                        let user_info = re.body.user_info
                        self.email = user_info.email

                        self.skill_list = user_info.skill
                    })
                
            },

        }
    }

</script>
<style lang='scss'>
    .myinfo {
        .skills {
            padding: 10px 0px;

            .skill {
                display: inline-block;
                height: 30px;
                padding: 0px 10px;
                background-color: #3F0D7D;
                color: white;
                margin-right: 10px;
                line-height: 30px;
                text-align: center;
                border-radius: 4px;

                margin-bottom: 10px;
            }

        }

        .content {
            padding: 10px 0px;
            white-space: normal;
            width: 100%;

            word-wrap: break-word;
            line-height: 20px;
        }
    }

</style>
