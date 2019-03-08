<template>
    <div>
        <button @click='new_'>点我新建</button>
        <br><br>
        <input type="text" v-model='messionid'>
        <button @click='check_mession'>点我查询</button>


    </div>
</template>
<script>
    //    abi文件
    import abi_ from '@/assets/abi.js'
    import det_abi from '@/assets/detabi.js'
    //    合约地址
    let token_address = '0x51fC15CA47034bDF62F6e0fd0E37AB389832994C'

    export default {
        mounted() {
            //            test页面初始化时检查是否在环境中
            let self = this
            if (typeof web3 !== 'undefined') {
                let web3api = new Web3(web3.currentProvider);
            } else {
                console.log(false, '请安装 MetaMask 插件');
            }
        },
        data() {
            return {
                messionid: ""
            }
        },
        methods: {
            new_: function() {
                //                初始化web3
                let web3api = new Web3(web3.currentProvider);
                //                生成DEt实例
                var Task = web3api.eth.contract(abi_).at(token_address);
                let DET = web3api.eth.contract(det_abi).at("0x6ffF60A882CE1Cd793dC14261Eec0f0d6A470E21")
                let id = "" + parseInt(Math.random() * 10000)


                //                之前的算数逻辑
                var decimals = web3api.toBigNumber(18);
                var amount = web3api.toBigNumber(parseFloat(1));
                var value = amount.times(web3api.toBigNumber(10).pow(decimals));
                console.log(id)
                //                mession desc
                let data = "嘻嘻嘻测试" + id
                DET.approve(token_address, value, (err,txHash) => {
                    if(err){
                        console.log("发生错误",err)
                    }else{
                         Task.publish(id, value, data, (a, b, c, d) => {
                        console.log("a:", a, "b:", b, "c:", c, "d:", d)
                    });
                    }
                   
                })


            },
            check_mession: function() {
                let self = this
                let web3api = new Web3(web3.currentProvider);
                var Det = web3api.eth.contract(abi_).at(token_address);

                let id = self.messionid

                Det.getMission(id, (a, b, c, d) => {
                    console.log("a:", a, "b:", b, "c:", c, "d:", d)

                });

            },

        }
    }

</script>
