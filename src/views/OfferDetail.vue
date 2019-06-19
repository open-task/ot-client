<template>
    <div class="offer-detail">
       <offer-header title="任务详情"></offer-header>
        <div class="offer-card">
            <van-panel :title="title" :status="t_state">
                <van-cell :title="content" />
                <van-cell :title="reward+'DET'" :value="solution_amount+'个方案'" />
            </van-panel>
            <br>
            <div v-if="solutions">
                <van-cell title="解决方案列表:" />
                <van-collapse v-model="activeNames">
                    <van-collapse-item :title="'方案ID: '+solution.solution_id" :name="id" v-for='(solution,id) in solutions'>
                        {{solution.data.content}}
                        <br><br>
                        <van-button v-if='show_botton' style="margin-right:10px;" type="primary" size="small" @click="accept_solution(solution.solution_id)">Accept</van-button>
                        <van-button v-if='show_botton' type="danger" size="small" @click="reject_solution(solution.solution_id)">Reject</van-button>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
        <van-cell-group>
            <van-field v-model="new_solution" type='textarea' rows='6' placeholder="请在此处粘贴你要提交的内容" />
        </van-cell-group>
        <van-button type="primary" class="success-btn" @click="add_solution">提交解决方案</van-button>
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
                task_id: null,
                web3api: null,
                title: null,
                content: null,
                id: null,
                reward: 0,
                solution_amount: 0,
                solutions: [],
                new_solution: "",
                activeNames: [],
                show_botton: false,
                task_state:"Unsolved"
            }
        },
        computed:{
            t_state:function(){
                let self = this
                let r = {'Unsolved':"未解决",'Solved':"已解决"}[self.task_state]
                return r
            }
        },
        methods: {
            accept_solution: async function(solution_id) {
                let self = this
                var Task = self.$task
                await ethereum.enable()
                Task.accept(solution_id, function(err, txHash) {
                    if (!err) {
                        self.$dialog.alert({
                            title: "成功接受",
                            message: txHash
                        })
                    }
                })
            },
            reject_solution: async function(solution_id) {
                let self = this
                var Task = self.$task
                await ethereum.enable()

                Task.reject(solution_id, function(err, txHash) {
                    console.log(err)
                    if (!err) {
                        self.$dialog.alert({
                            title: "成功拒绝",
                            message: txHash
                        })
                    }
                })
            },
            add_solution: async function() {

                let self = this

                await ethereum.enable()
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
                    content: self.new_solution
                })
                Task.solve(solution_id, task_id, data, function(err, txHash) {
                    console.log(err)
                    console.log(txHash)
                    if (err) {
                        self.$dialog.alert({
                            title: "发生错误",
                            message: err
                        })
                    } else {
                        self.$dialog.alert({
                            title: '解决方案提交成功',
                            message: '项目哈希:' + txHash + "<br><br>项目id:" + task_id
                        }).then(() => {
                            self.$router.push({
                                "name": "detail",
                                'query': {
                                    'task_id': task_id
                                }
                            })
                        });
                    }
                })

            }
        },
        async mounted() {
            let self = this
            await ethereum.enable()
            let task_id = self.$route.query.task_id
            self.task_id = task_id
            let web3api = self.$web3api
            let accounts = web3api.eth.accounts

            self.web3api = web3api
            self.$http.post("/v1/", {
                "jsonrpc": "2.0",
                "method": "GetMissionInfo",
                "params": [task_id],
                "id": "11"
            }).then(function(re) {
                let res = re.body.result
                console.log(re.body)
                if (accounts.indexOf(res.publisher) + 1) {
                    self.show_botton = true
                }
                self.id = res.mission_id
                self.reward = web3api.fromWei(res.reward_wei)
                self.task_state = res.status
                let data_info = {}
                let solutions = res.solutions
                if (solutions) {
                    solutions.forEach(function(e) {
                        try {
                            e.data = JSON.parse(e.data)
                        } catch (err) {
                            e.data = {
                                content: e.data
                            }

                        }
                    })
                }

                self.solutions = solutions
                self.solution_amount = self.solutions ? self.solutions.length : 0
                try {
                    let info = JSON.parse(res.data)

                    self.title = info['title'],
                        self.content = info['desc']

                } catch {
                    self.title = "未命名",
                        self.content = res.data
                }

            })
        }
    }

</script>
<style lang='scss'>
    .offer-detail {
        
    }

</style>
