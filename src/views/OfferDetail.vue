<template>
    <div class="offer-detail">
        <offer-header title="任务详情"></offer-header>
        <div class="offer-card">
            <van-panel :title="offer.title">
                <van-cell :title="offer.desc" />
                <van-cell :title="reward+'DET'" :value="task_state" />
            </van-panel>
            <br>
            <div class="skills">
                <span class="skill" v-for='skill in offer.skill' @click='go_talent(skill)'>{{skill}}</span>
            </div>
            <br>
            <div v-if="solutions">
                <van-cell title="解决方案列表:" :value="solutions.length+'个方案'" />

                <van-collapse v-model="activeNames">

                    <van-collapse-item :title="`方案ID: ${solution.solutionId} ${solution_state(solution.solution_state)}`" :name="id" v-for='(solution,id) in solutions'>
                        {{solution.content}}
                        <br><br>
                        <div v-if='show_botton'>
                            {{solution}}
                            <van-button v-if='solution.solution_state=="published"' style="margin-right:10px;" type="primary" size="small" @click="accept_solution(solution.solutionId)">Accept</van-button>
                            <van-button v-if='solution.solution_state=="published"' type="danger" size="small" @click="reject_solution(solution.solutionId)">Reject</van-button>
                        </div>

                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
        <van-cell-group v-if='task_type=="unsolved"'>
            <van-field v-model="new_solution" type='textarea' rows='6' placeholder="请在此处粘贴你要提交的内容" />
        </van-cell-group>
        <div v-if='task_type=="author"' style='text-align:center;margin-top:20px;color:#9CA4B5;font-size:12px;'>
            您是任务发起人,无法提交方案
        </div>
        <div v-if='task_type=="solved"' style='text-align:center;margin-top:20px;color:#9CA4B5;font-size:12px;'>
            当前任务已解决,无法提交方案
        </div>
        <van-button v-if='offer.tast_state=="published"' type="primary" class="success-btn" @click="add_solution">提交解决方案</van-button>
    </div>
</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        components: {
            OfferHeader,
        },
        data() {
            return {
                offer: {},
                task_id: null,
                web3api: null,
                title: null,
                content: null,
                id: null,
                reward: 0,
                skills: [],
                solution_amount: 0,
                solutions: [],
                new_solution: "",
                activeNames: [],


                author: false,
            }
        },
        computed: {
            show_botton: function() {
                let self = this
                if (self.task_state == "success") {
                    return false
                }
                if (self.offer.author == self.$web3api.eth.accounts[0]) {
                    return true
                }

                return false
            },

            task_type: function() {
                let self = this
                if (self.author) {
                    return 'author'
                } else {
                    if (self.task_state == 'Solved') {
                        return 'solved'
                    } else {
                        return 'unsolved'
                    }
                }
            },
            task_state: function() {
                console.log(this.offer.task_state)
                return {
                    'success': '已完成',
                    'published': '已提交'
                } [this.offer.task_state]
            },



        },
        methods: {
            solution_state: function(state) {
                return {
                    'accept': '已接受',
                    'published': '已提交',
                    'waiting_chain': "等待确认",
                    'reject': '已拒绝'
                } [state]
            },
            go_talent: function(t) {
                window.location.href = `/talentmarket/${t}`
            },
            accept_solution: async function(solution_id) {
                let self = this
                var Task = self.$task
                await ethereum.enable()
                Task.accept(solution_id, function(err, txHash) {
                    if (!err) {
                        self.$dialog.alert({
                            title: "成功接受",
                            message: txHash
                        }).then(function() {
                            window.location.reload()
                        })
                    }
                })
            },
            reject_solution: async function(solution_id) {
                let self = this
                await ethereum.enable()

                self.$task.reject(solution_id, function(err, txHash) {
                    if (!err) {
                        self.$dialog.alert({
                            title: "成功拒绝",
                            message: txHash
                        }).then(function() {
                            window.location.reload()
                        })
                    }
                })
            },
            add_solution: async function() {

                let self = this
                if (window.ethereum) {
                    await ethereum.enable()
                } else {
                    alert("要体验完整功能，请安装metamask，或者使用imtoken2.0打开 bountinet.com");
                    return;
                }

                if (self.new_solution.replace(/^\s+|\s+$/g, '') == "") {
                    self.$dialog({
                        message: "请勿提交空的内容"
                    })
                    return
                }
                var Task = self.$task

                let task_id = self.task_id
                let solution_id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                let data = JSON.stringify({
                    content: self.new_solution,
                    fn_type:"task"
                })
                Task.solve(solution_id, task_id, data, function(err, txHash) {
                    if (err) {
                        console.log("报错", err)
                        self.$dialog.alert({
                            title: "系统提示",
                            message: "该次支付已拒绝，请知晓！"
                        })
                    } else {
                        var accounts = self.web3api.eth.accounts;
                        let info = {
                            missionId: self.task_id,
                            solutionId: solution_id,
                            content: self.new_solution,
                            author: accounts[0]
                        }
                        self.$http.post('/skill/add_solution', info).then(function() {
                            self.$dialog.alert({
                                title: '解决方案提交成功',
                                message: '<div class="zhe">项目哈希:' + txHash + "<br><br>项目id:" + task_id + "</div>"
                            }).then(() => {
                                window.location.reload();
                            });
                        })

                    }
                })

            }
        },
        mounted() {
            let self = this
            let task_id = self.$route.params.id
            self.task_id = task_id

            //await ethereum.enable();
            let web3api = self.$web3api;
            self.web3api = web3api;
            self.$http.post("/skill/get_task_info", {
                id: task_id
            }).then(function(re) {
                self.offer = re.body.task
                console.log('offer', self.offer)
                self.reward = self.web3api.fromWei(parseInt(self.offer.reward))
                self.solutions = re.body.solutions
                console.log(self.solutions)
            })
            console.log("web3api", web3api)

            //            self.$http.post("/v1/", {
            //                "jsonrpc": "2.0",
            //                "method": "GetMissionInfo",
            //                "params": [task_id],
            //                "id": "11"
            //            }).then(function(re) {
            //                let res = re.body.result
            //                if(re.body.result.block==0){
            //                    self.$dialog.alert({
            //                        title:"项目还在发行中",
            //                        message:"请稍后刷新查看,点击确定返回任务列表"
            //                    }).then(function(){
            //                        self.$router.push({name:'tasklist'})
            //                    })
            //                }
            //                
            //                self.id = res.mission_id
            //                self.$http.post('/skill/get_task_info',{id:self.id}).then(function(re){
            //                    self.skills =re.body.task.skills
            //                })
            //                //self.reward = web3api.fromWei(res.reward_wei)
            //                self.reward = res.reward_det;
            //                self.task_state = res.status
            //                let data_info = {}
            //                let solutions = res.solutions
            //                if (solutions) {
            //                    solutions.forEach(function(e) {
            //                        try {
            //                            e.data = JSON.parse(e.data)
            //                        } catch (err) {
            //                            e.data = {
            //                                content: e.data
            //                            }
            //
            //                        }
            //                    })
            //                }
            //
            //                self.solutions = solutions
            //                self.solution_amount = self.solutions ? self.solutions.length : 0
            //                try {
            //                    let info = JSON.parse(res.data)
            //
            //                    self.title = info['title'],
            //                        self.content = info['desc']
            //
            //                } catch {
            //                    self.title = "未命名",
            //                        self.content = res.data
            //                }
            //
            //
            //                let accounts = web3api.eth.accounts;
            //                let low_accounts = accounts.map(function(e){
            //                    return e.toLowerCase()
            //                })
            //                if (low_accounts.indexOf(res.publisher.toLowerCase()) + 1) {
            //                    self.author = true
            //                }
            //
            //            })



        }
    }

</script>
<style lang='scss'>
    .offer-detail {
        .skills {
            padding: 0px 15px;

            .skill {
                line-height: 25px;
                background-color: #552AB5;
                color: white;
                border-radius: 12.5px;
                margin-right: 10px;
                padding: 0px 15px;
                font-size: 14px;
                display: inline-block;
            }
        }
    }

    .zhe {
        word-break: break-all;
    }

</style>
