<template>
    <div class="offer-detail">
       <offer-header title="任务详情"></offer-header>
        <div class="offer-card">
            <van-panel :title="title" >
                <van-cell :title="content" />
                <van-cell :title="reward+'DET'" :value="t_state" />
            </van-panel>
            <br>
            <div class="skills">
                <span class="skill" v-for='skill in skills' @click='go_talent(skill)'>{{skill}}</span>
            </div>
            <br>
            <div v-if="solutions">
                <van-cell title="解决方案列表:" :value="solution_amount+'个方案'"/>
                
                <van-collapse v-model="activeNames">
                   
                    <van-collapse-item :title="`方案ID: ${solution.solution_id} ${{'Accepted':'已接受','Unprocessed':'未处理','Reject':'已拒绝'}[solution.status]}`" :name="id" v-for='(solution,id) in solutions'>
                        {{solution.data.content}}
                        <br><br>
                        <van-button v-if='show_botton&&task_state!="Solved"' style="margin-right:10px;" type="primary" size="small" @click="accept_solution(solution.solution_id)">Accept</van-button>
                        <van-button v-if='show_botton&&task_state!="Solved"' type="danger" size="small" @click="reject_solution(solution.solution_id)">Reject</van-button>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
        <van-cell-group v-if='!author'>
            <van-field v-model="new_solution" type='textarea' rows='6' placeholder="请在此处粘贴你要提交的内容" />
        </van-cell-group>
        <div v-else style='text-align:center;margin-top:20px;color:#9CA4B5;font-size:12px;'>
            您是任务发起人,无法提交方案
        </div>
        <van-button v-if='!author' type="primary" class="success-btn" @click="add_solution">提交解决方案</van-button>
        
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
                skills:[],
                solution_amount: 0,
                solutions: [],
                new_solution: "",
                activeNames: [],
                show_botton: false,
                task_state:"Unsolved",
                author:false,
            }
        },
        computed:{
            t_state:function(){
                let self = this
                console.log("123",self.task_state)
                let r = {"Published":"待解决",'Unsolved':"已提交",'Solved':"已解决"}[self.task_state]
                return r
            }
        },
        methods: {
            go_talent:function(t){
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
                console.log(Task)
                Task.solve(solution_id, task_id, data, function(err, txHash) {
                    console.log(err)
                    console.log(txHash)
                    if (err) {
                        self.$dialog.alert({
                            title: "系统提示",
                            message: "该次支付已拒绝，请知晓！"
                        })
                    } else {
                        self.$dialog.alert({
                            title: '解决方案提交成功',
                            message: '<div class="zhe">项目哈希:' + txHash + "<br><br>项目id:" + task_id+"</div>"
                        }).then(() => {
                           window.location.reload();
                        });
                    }
                })

            }
        },
        async mounted() {
            let self = this
           
            await ethereum.enable()
            console.log(self.$route)
            let task_id = self.$route.params.id
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
                if(re.body.result.block==0){
                    self.$dialog.alert({
                        title:"项目还在发行中",
                        message:"请稍后刷新查看,点击确定返回任务列表"
                    }).then(function(){
                        self.$router.push({name:'tasklist'})
                    })
                }
                if (accounts.indexOf(res.publisher.toLowerCase()) + 1) {
                    self.show_botton = true
                    self.author = true
                }
                console.log(res)
                self.id = res.mission_id
                self.$http.post('/skill/get_task_info',{id:self.id}).then(function(re){
//                    self.skills =re.body.task.skills
                })
                self.reward = web3api.fromWei(res.reward_wei)
                self.task_state = res.status
                let data_info = {}
                let solutions = res.solutions
                console.log(solutions)
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
        .skills{
            padding: 0px 15px;
            .skill{
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
    .zhe{
        word-break:break-all; 
    }

</style>
