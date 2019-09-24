<template>
    <div class="create-offer">
        <offer-header title='创建任务'></offer-header>

        <div class="input-group">
            <div class="title"><span>项目名称</span></div>
            <textarea v-model="title" name="" id="" cols="30" rows="3" placeholder="请输入项目名称" maxlength="30"></textarea>
        </div>
        <div class="input-group">
            <div class="title"><span>项目描述</span></div>
            <textarea maxlength="200" v-model="desc" name="" id="" cols="30" rows="10" placeholder="请输入项目具体描述,需要什么样的服务,工期大约多少,最多120字" ></textarea>
        </div>
        <div class="input-group">
            <div class="title"><span>项目技能</span></div>
            <div class="area">
                <span class="area-tag" v-for='(skill,index) in select_skill'>{{skill}}&nbsp;<span class="x" @click='remove_skill(index)'>x</span></span>
            </div>
            <div class="select-skill">
                <span class="skill" v-for='(skill,index) in skill_list' @click='add_skill(index)'>{{skill}}</span>
            </div>
             <div class="new-skill">
                <input type="text" v-model='new_skill' placeholder="输入新技能">
                <span class="btn" @click='add_new_skill'>提交</span>
            </div>
        </div>

        <van-cell-group>
            <van-field v-model="charge" type='number' placeholder="请输入报酬">
            </van-field>
            <span class='det'>
                DET
            </span>
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
                skill: "",
                select_skill: [],
                skill_list: [],
                new_skill:""
            }
        },
        methods: {
            add_new_skill:function(){
                let self = this
                let skill = self.new_skill
                self.select_skill.push(skill)
                self.new_skill = ""
            },
            remove_skill: function(index) {
                let self = this
                let skill = self.select_skill[index]
                self.select_skill.splice(index, 1)
                self.skill_list.push(skill)
                console.log(self.skill_list)
            },
            add_skill: function(index) {
                let self = this
                let skill = self.skill_list[index]
                self.skill_list.splice(index, 1)
                self.select_skill.push(skill)
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
                        console.log('请解锁 MetaMask 后刷新')
                        alert('请解锁 MetaMask 后刷新');
                    } else {
                        var value = self.$web3api.toWei(charge)
                        let DET = self.$det
                        let id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                        //生成不重复id
                        let data = JSON.stringify({
                            "title": self.title,
                            "desc": self.desc,
                            'skills': self.select_skill
                        })
                        
                        DET.approve(self.$token_address, value, (err, txHash) => {
                            console.log('approve')
                            if (err) {
                                console.log("发生错误", err)
                            } else {
                                console.log("approve成功")
                                console.log("即将publish", id, value, data)
                                self.$task.publish(id, value, data, (err, txHash) => {
                                    console.log('publish')

                                    if (err) {
                                        console.log('发生错误', err)
                                    } else {
                                        self.$http.post("/skill/add_task",{skill:self.select_skill,id:id})
//                                        将技能添加到技能列表
                                        self.$dialog.alert({
                                            title: '项目提交成功',
                                            message: '<div class="zhe">项目哈希:' + txHash + "<br><br>项目id:" + id + "<br><br>等待写入区块</div>"
                                        }).then(() => {
                                            self.$router.push({
                                                "name": "tasklist",
                                                'params': {
                                                    'type': 'published'
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
            self.$http.post("/skill/list_skills", {}).then(function(re) {
                for (var index in re.body.skills) {
                    self.skill_list.push(re.body.skills[index].name)
                }
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
        .input-group {
            padding: 0px 15px;
            background-color: white;
            margin-bottom: 10px;
            border-radius: 10px;

            .area {
                background: #F0F2F5;
                min-height: 40px;
                border-radius: 4px;
                padding: 10px;

                .area-tag {
                    background-color: #FFFFFF;
                    border-radius: 4px 13px 13px 4px;
                    margin-right: 10px;
                    padding: 0px 5px;
                    color: #979797;
                    font-size: 12px;
                    line-height: 25px;
                    display: inline-block;
                    margin-bottom: 10px;

                    .x {
                        margin: 0px 5px;
                        color: black
                    }
                }
            }

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
                font-size: 16px;
                line-height: 25px;
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
        width: 100%;
        margin: 10px auto;
        display: block;
        border-radius: 4px;
        padding: unset;
    }

    .van-cell-group {
        position: relative;

        .det {
            position: absolute;
            bottom: 16px;
            right: 14px;
            color: #9CA4B5;
            font-size: 12px;
        }
    }

    .zhe {
        word-break: break-all;
    }

</style>
