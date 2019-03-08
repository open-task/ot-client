<template>
    <div class="offer-detail">
        <div class="offer-card">
            <van-panel :title="title" status="状态">
                <van-cell :title="content" />
                <van-cell :title="reward+'DET'" :value="solution_amount+'个方案'" />
                <div slot="footer">
                    <van-button size="small" type="danger">accept</van-button>
                </div>
            </van-panel>
            <van-panel>
                <van-cell :title="solution" v-for="(solution,key) in solutions" :key='key' />
            </van-panel>

        </div>
        <van-cell-group>
            <van-field v-model="new_solution" type='textarea' rows='6' placeholder="请在此处粘贴你要提交的内容" />
        </van-cell-group>
        <van-button type="primary" class="success-btn" @click="add_solution">提交内容</van-button>
    </div>
</template>
<script>
    import abi_ from '@/assets/abi.js'
    let token_address = '0x51fC15CA47034bDF62F6e0fd0E37AB389832994C'

    export default {
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
                new_solution: ""
            }
        },
        methods: {
            add_solution: function() {
                let self = this
                var Task = self.web3api.eth.contract(abi_).at(token_address)
                let task_id = self.task_id
                let solution_id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                let data = JSON.stringify({
                    content: self.new_solution
                })
                Task.solve(solution_id, task_id, data, function(err, txHash) {
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
        mounted() {
            let self = this
            let task_id = self.$route.query.task_id
            self.task_id = task_id
            let web3api = new Web3(web3.currentProvider);
            self.web3api = web3api

            self.$http.post("/v1/", {
                "jsonrpc": "2.0",
                "method": "GetMissionInfo",
                "params": [task_id],
                "id": "11"
            }).then(function(re) {
                let res = re.body.result
                console.log(re)

                self.id = res.mission
                self.reward = web3api.fromWei(res.reward)
                let data_info = {}
                self.solutions = res.solutions
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
