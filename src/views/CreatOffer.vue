<template>
    <div class="create-offer">
                <offer-header></offer-header>

        <div class="input-group">
            <div class="title"><span>项目名称</span></div>
            <textarea v-model="title" name="" id="" cols="30" rows="3" placeholder="请输入项目名称"></textarea>
        </div>
        <div class="input-group">
            <div class="title"><span>项目描述</span></div>
            <textarea v-model="desc" name="" id="" cols="30" rows="10" placeholder="请输入项目具体描述,需要什么样的服务,工期大约多少"></textarea>
        </div>
        <div class="input-group">
            <div class="title"><span>项目技能</span></div>
            <textarea v-model='skill' name="" id="" cols="30" rows="5" disabled></textarea>
            <div class="select-skill">
                <span class="skill" v-for='(skill,index) in skill_list' @click='add_skill(index)'>{{skill.name}}</span>
            </div>
        </div>

        <van-cell-group>
            <van-field v-model="charge" type='number' placeholder="请输入报酬">
            </van-field>
        </van-cell-group>
        <van-button type="primary" class="success-btn" @click="send">发布任务</van-button>
    </div>

</template>


<script>
    import OfferHeader from '@/components/OfferHeader'

    export default {
        components: {
            OfferHeader
        },
        data() {
            return {
                title: "",
                desc: "",
                charge: "",
                skill:"",
                select_skill:[],
                skill_list: []
            }
        },
        methods: {
            add_skill: function(index) {
                let self = this
                let skill = self.skill_list[index]
                self.skill_list.splice(index,1)
                self.select_skill.push(skill.name)
                self.skill = self.select_skill.join(',')
            },
            send: async function() {
                let self = this
                let charge = self.charge
                let web3api = self.$web3api
                
                await ethereum.enable()
                var accounts = web3api.eth.accounts;
                console.log(accounts)

                if (self.title && self.desc && self.charge) {
                    if (typeof accounts === 'undefined' || accounts.length === 0) {
                        alert('请解锁 MetaMask 后刷新');
                    } else {
                        var value = self.$web3api.toWei(charge)
                        let DET = self.$det
                        let id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                        //生成不重复id
                        let data = JSON.stringify({
                            "title": self.title,
                            "desc": self.desc,
                            'skills':self.select_skill
                        })
                        DET.approve(self.$token_address, value, (err, txHash) => {
                            console.log('approve')
                            if (err) {
                                console.log("发生错误", err)
                            } else {
                                console.log("approve成功")
                                console.log("即将publish",id, value, data)
                                self.$task.publish(id, value, data, (err, txHash) => {
                                    console.log('publish')

                                    if (err) {
                                        console.log('发生错误', err)
                                    } else {
                                        self.$dialog.alert({
                                            title: '项目创建成功',
                                            message: '项目哈希:' + txHash + "<br><br>项目id:" + id
                                        }).then(() => {
                                            self.$router.push({
                                                "name": "detail",
                                                'query': {
                                                    'task_id': id
                                                }
                                            })
                                        });
                                    }
                                });
                            }

                        })
                    }
                } else {
                    self.$dialog.alert({
                        title: '请填写内容',
                        message: '内容都不可为空'
                    })
                }






            }
        },
        mounted() {
            let self = this
            if (typeof web3 !== 'undefined') {

            } else {
                console.log(false, '请安装 MetaMask 插件');
            }
            self.$http.post("/skill/list_skills",{}).then(function(re){
                self.skill_list = re.body.skills
            })
        }
    }

</script>
<style lang='scss'>
    .create-offer {
        background-color: #F2F2F2;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px 0px;

        .input-group {
            padding: 0px 15px;
            background-color: white;
            margin-bottom: 10px;
            border-radius: 10px;

            .select-skill {
                padding: 5px 0px;
                overflow-x: scroll;
                white-space: nowrap;

                .skill {
                    background-color: #F2F2F2;
                    border-radius: 2px;
                    margin-right: 10px;
                    padding: 0px 5px;
                    color: #979797;
                    font-size: 12px;
                    line-height: 25px;
                    display: inline-block;
                }
            }

            textarea {
                width: 100%;
                border: unset;
                margin-top: 10px;
                font-size: 12px;
            }

            .title {
                border-bottom: 1px solid #F2F2F2;

                &:before {
                    content: "";
                    display: inline-block;
                    width: 2px;
                    background-color: #FAA201;
                    height: 15px;
                    margin-right: 10px;
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                    line-height: 40px;
                    color: #333333;
                    font-size: 15px;
                    font-weight: bold;
                }


            }
        }
    }

    .success-btn {
/*        position: fixed !important;*/
/*        bottom: 0px;*/
        width:100%;
        margin: 10px auto;
        display: block;
        border-radius: 4px;
        padding: unset;
    }

</style>
