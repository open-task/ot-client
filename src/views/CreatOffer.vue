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
        <van-button type="primary" class="success-btn" @click="send">主要按钮</van-button>
    </div>

</template>


<script>
    import abi_ from '@/assets/abi.js'
    import det_abi from '@/assets/detabi.js'
    let token_address = '0x51fC15CA47034bDF62F6e0fd0E37AB389832994C'
    let det_address = "0x6ffF60A882CE1Cd793dC14261Eec0f0d6A470E21"
    let tokenDecimals = "18"

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
                let web3api = new Web3(web3.currentProvider);
                var accounts = web3api.eth.accounts;
                
                if (typeof accounts === 'undefined' || accounts.length === 0) {
                    console.log(false, '请解锁 MetaMask');
                } else {
                    if (typeof accounts === 'undefined' || accounts.length === 0) {
                        _showMessage(false, '请解锁 MetaMask');
                    } else {
                        var decimals = web3api.toBigNumber(18);
                        console.log('转账金额:',charge)
                        var amount = web3api.toBigNumber(parseFloat(charge));

                        var value = amount.times(web3api.toBigNumber(amount).pow(decimals));
                        var Task = web3api.eth.contract(abi_).at(token_address);
                        let DET = web3api.eth.contract(det_abi).at(det_address)
                        let id = parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000)
                        //                        生成不重复id
                        console.log(id)
                        let data = JSON.stringify({
                            "title": self.title,
                            "desc": self.desc
                        })
                        DET.approve(token_address, value, (err, txHash) => {
                            if (err) {
                                console.log("发生错误", err)
                            } else {
                                Task.publish(id, value, data, (err, txHash) => {
                                    if (err) {
                                        console.log('发生错误', err)
                                    } else {
                                        self.$dialog.alert({
                                            title: '项目创建成功',
                                            message: '项目哈希:'+txHash+"<br><br>项目id:"+id
                                        }).then(() => {
                                            self.$router.push({"name":"detail",'query':{'task_id':id}})
                                        });
                                    }
                                });
                            }

                        })
                    }

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
