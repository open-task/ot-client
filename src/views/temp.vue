<template>
    <div class="temp">
        <input type="text" v-model='question.title'><br>
        <textarea name="" id="" cols="30" rows="10" v-model='question.content'></textarea>
        <input type="text" v-model='question.reward'><br>
        <button @click='publish_question'>点击发布问题</button>
        <br>
        <div>---------------------------------</div>
        <br>
        <input type="text" placeholder="请输入对应question的id" v-model='a.q_id'>&nbsp;&nbsp;&nbsp;
        <input type="text" v-model='a.content' placeholder='输入回答内容'>

        <button @click='publish_answer'>点击回复问题</button>
        <br>
        <div>-------------获取问题详情--------------------</div>
        <br>
        <input type="text" placeholder="请输入对应question的id" v-model='q_detail.q_id'>
        <button @click='get_question_detail'>点击获取</button>
        <div v-if='JSON.stringify(q_detail.q_info)!="{}"'>
            Author:{{q_detail.q_info.address}} <br>
            标题:{{q_detail.q_info.title}} <br>
            内容:{{q_detail.q_info.content}}
        </div>
        <ul>
            <li v-for='a in q_detail.a_list'>
                作者:{{a.author}} <br>
                内容:{{a.content}} <br>
                状态:{{a.answer_state}}
                <br><button @click='accept_answer(a.id)'>接受回答</button><button @click='reject_answer(a.id)'>拒绝回答</button></li>
        </ul>
        <br>
        <div>-------------获取问题列表--------------------</div>
        <br>
        <button @click='get_questions'>获取问题列表</button>点完看console
    </div>
</template>
<script>
    export default {
        data() {
            return {
                question: {
                    title: "测试问答标题",
                    content: "测试问题的内容",
                    reward: 1
                },
                q_detail: {
                    q_id: '',
                    q_info: {},
                    a_list: []
                },
                a: {
                    q_id: "",
                    content: "",
                }

            }
        },
        mounted() {
            
        },
        methods: {
            reject_answer: async function(a_id) {
                //根据answerid拒绝回答
                let self = this
                await ethereum.enable()
                let id = String(a_id)
                self.$task.reject(id, function(err, txHash) {
                    if (!err) {
                        console.log("成功发送rejcet请求")
                    } else {
                        console.log("reject失败", err)
                    }
                })
            },
            accept_answer: async function(a_id) {
                //根据answerid接受回答
                let self = this
                await ethereum.enable()
                let id = String(a_id)
                self.$task.accept(id, function(err, txHash) {
                    if (!err) {
                        console.log("成功发送accept请求")
                    } else {
                        console.log("accept错误", err)
                    }
                })
            },
            get_question_detail: function() {
                //获取单个question的详情,question_state为问题状态,published是未处理,success是已接受(此时会额外返回answeid,为接受的回答),address是发布者的地址,reward为det数量
                //其中answers是所有的回答,answer_state是回答的状态published是未处理,accept是已接受,reject是拒绝的
                let self = this
                let q_id = self.q_detail.q_id
                self.$http.post('/question/get_question', {
                    question_id: q_id
                }).then(function(re) {
                    console.log('获取详情', re)
                    self.q_detail.q_info = re.body.question
                    self.q_detail.a_list = re.body.question.answers
                })
            },
            get_questions: function() {
                //获取问题列表
                let self = this
                self.$http.post('/question/get_question_list', {}).then(function(re) {
                    console.log('问题列表', re.data)
                    
                })

            },
            
            publish_answer: async function() {
                //提交回答
                let self = this
                let author = self.$web3api.eth.accounts[0]
                let question_id = String(self.a.q_id)
                let info = {
                    missionId: question_id,
                    content: self.a.content,
                    author: author
                }
                //以上为提交服务器的参数
                self.$http.post('/question/answer', info).then(function(re) {
                    let answer_id = String(re.body.answer_id)
                    //此处返回id为服务器生成的answerid
                    let data = JSON.stringify({
                        fn_type: 'question',
                        solutionId: answer_id,
                        missionId: question_id,
                    })
                    //以上为提交合约的参数
                    self.$task.solve(answer_id, question_id, data, function(err, txHash) {
                        if (err) {
                            self.$dialog.alert({
                                title: "系统提示",
                                message: "该次支付已拒绝，请知晓！"
                            })
                        } else {
                            alert("成功")
                        }
                    })

                })

            },
            publish_question: async function() {
                //提交问题
                let self = this
                let address = self.$web3api.eth.accounts[0]
                let mission_id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                let q = self.question
                var value = self.$web3api.toWei(q.reward)
                let data = JSON.stringify({
                    "title": q.title,
                    "desc": q.content,
                    "fn_type": 'question'
                })
                let info = {
                    address: address,
                    title: q.title,
                    content: q.content,
                    reward: q.reward,
                    missionId: mission_id,
                }
                self.$http.post("/question/new_question", info).then(function(re) {
                    self.$det.approve(self.$token_address, value, (err, txHash) => {
                        if (err) {
                            console.log("发生错误", err)
                        } else {
                            self.$task.publish(mission_id, value, data, (err, txHash) => {
                                if (err) {
                                    console.log('发生错误', err)
                                } else {


                                    //将技能添加到技能列表
                                }
                            });
                        }

                    })
                })


            }
        }
    }

</script>
