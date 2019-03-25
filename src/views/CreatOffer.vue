<template>
    <div class="create-offer">
        <van-cell-group>
            <van-field v-model="title" required clearable label="项目名称" placeholder="请输入项目名称" @click-icon="$toast('question')" />

            <van-field v-model="desc" type="textarea" label="项目描述" placeholder="请输入项目具体描述,需要什么样的服务,工期大约多少" required rows='6' />
        </van-cell-group>
        <br>
        <van-cell-group>
            <van-field v-model="charge" type='number' placeholder="请输入报酬">
                <!--                <van-button slot="button" size="small" type="primary">托管报酬</van-button>-->
            </van-field>
        </van-cell-group>
        <van-button type="primary" class="success-btn" @click="send">发布任务</van-button>
    </div>

</template>


<script>
    export default {
        data() {
            return {
                title: "",
                desc: "",
                charge: "",
            }
        },
        methods: {

            send: function() {
                let self = this
                let charge = self.charge
                let web3api = self.$web3api
                var accounts = web3api.eth.accounts;


                if (typeof accounts === 'undefined' || accounts.length === 0) {
                    alert('请解锁 MetaMask 后刷新');
                } else {
                    var value = self.$web3api.toWei(charge)
                    let DET = self.$det
                    let id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                    //生成不重复id
                    console.log(id)
                    let data = JSON.stringify({
                        "title": self.title,
                        "desc": self.desc
                    })
                    DET.approve(token_address, value, (err, txHash) => {
                        if (err) {
                            console.log("发生错误", err)
                        } else {
                            self.$task.publish(id, value, data, (err, txHash) => {
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





            }
        },
        mounted() {
            let self = this
            if (typeof web3 !== 'undefined') {

            } else {
                console.log(false, '请安装 MetaMask 插件');
            }
        }
    }

</script>
<style lang='scss'>
    .success-btn {
        position: fixed !important;
        bottom: 0px;
        margin: 10px 0px;
        display: block;
        width: calc(100% - 20px);
        border-radius: 4px;
        padding: unset;
    }

</style>
