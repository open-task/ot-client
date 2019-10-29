<template>
    <div class="gamecard">
        <div class="header">求购人物卡</div>
        <div class="selector">
            <div class="line">
                <label for="">游戏</label>
                <select name="" id="" v-model='info.game_name'>
                    <option value="超零三国">超零三国</option>
                    <option value="超零总裁">超零总裁</option>
                    <option value="超零三体">超零三体</option>
                </select>
<!--                <img src="../assets/img/选择.png" alt="">-->


            </div>
            <div class="line">
                <label for="">人物名</label>
                <input type="text" placeholder='请输入人物名称' v-model='info.role_name'>
            </div>
            <div class="line">
                <label for="">币种</label>
                <select name="" id="" v-model='info.coin_name'>
                    <option value="sero">sero</option>
                    <option value="积德币(sero)">积德币(sero)</option>
                    <option value="纪念币(sero)">纪念币(sero)</option>
                    <option value="DET(以太坊)">DET(以太坊)</option>
                    <option value="GAMC(以太坊)">GAMC(以太坊)</option>
                </select>
               
            </div>
            <div class="line">
                <label for="">金额</label>
                <input type="text" placeholder="请输入金额" v-model='info.amount'>
            </div>
            <div class="line">
                <label for="">联系渠道</label>
                <select name="" id="" v-model='info.contact_name'>
                    <option value="微信">微信</option>
                    <option value="QQ">QQ</option>
                    <option value="手机号">手机号</option>
                    <option value="其他">其他</option>
                </select>
<!--                <img src="../assets/img/选择.png" alt="">-->

            </div>
            <div class="line">
                <label for="">联系方式</label>
                <input type="text" v-model='info.contact'>
            </div>
            <div class="btn-group">
                <div class="btn" @click='add_card'>求购人物卡</div>
            </div>
            <div class="contact">
                <img src="../assets/img/qrcode.png" alt="">
                <div class='txt'>购买咨询请联系客服小姐姐</div>
            </div>

        </div>
        <div class="info-list">
            <div class="card" v-for='card in info_list'>
                <div class="line">
                    <div class="intro">
                        <label for="">
                            游戏名：
                        </label>
                        <div class="text">
                            {{card.game_name}}
                        </div>
                    </div>
                    <div class="intro">
                        <label for="">
                            人物名：
                        </label>
                        <div class="text">
                            {{card.role_name}}
                        </div>
                    </div>
                </div>
                <div class="line">
                    <div class="intro">
                        <label for="">
                            币种：
                        </label>
                        <div class="text">
                            {{card.coin_name}}
                        </div>
                    </div>
                    <div class="intro">
                        <label for="">
                            金额：
                        </label>
                        <div class="text">
                            {{card.amount}}
                        </div>
                    </div>
                </div>
                <div class="line">
                    <div class="intro">
                        <label for="">
                            {{card.contact_name}}：
                        </label>
                        <div class="text">
                            {{card.contact}}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                other_contact: "",
                info: {
                    game_name: "超零三国",
                    role_name: "",
                    coin_name: "sero",
                    amount: 0,
                    contact_name: "微信",
                    contact: ""

                },
                info_list: []
            }
        },
        mounted() {
            let self = this
            self.$http.post("/skill/get_game_card", {}).then(function(re) {
                self.info_list = re.body.info
                console.log(self.info_list)
            })
        },
        methods: {
            add_card: function() {
                let self = this
                let info = self.info
                if (info.game_name && info.role_name && info.coin_name && info.amount && info.contact) {

                    
                } else {
                    alert("请填写信息")
                    return
                }
                self.$http.post("/skill/add_game_card", {
                    info: info
                }).then(function() {
                    alert("提交成功")
                    window.location.reload()
                })
            }
        }
    }

</script>
<style lang="scss">
    .gamecard {
        max-width: 750px;
        background: #F2F2F2;

        .info-list {
            margin-top: 15px;

            .card {
                background-color: white;
                margin-bottom: 10px;
                padding: 15px 20px;

                .line {
                    display: flex;
                    margin-bottom: 10px;

                    .intro {
                        flex: 1;
display:flex;
                    }
                }
            }

        }

        .header {
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            color: white;
            font-weight: 500;
            background: linear-gradient(90deg, rgba(75, 151, 249, 1), rgba(116, 82, 245, 1));
        }

        .selector {
            padding: 0px 14px;
            background: #FFFFFF;
            margin-top: 10px;

            .line {
                border-bottom: 1px solid #EFF0F3;
                font-size: 14px;
                display: flex;
                color: #7156F5;
                align-items: center;

                label {
                    width: 70px;
                    color: #808080;


                }

                select {
                    flex: 1;
                    color: #7156F5;
                }

                input,
                select {
                    border: unset;
                    background: white;
                    height: 90%;
                }

                .content,
                select,
                label {
                    height: 43px;
                    line-height: 43px;

                }

                .content {
                    color: #7156F5;


                }

                img {
                    width: 10px;
                    height: 12px;
                }
            }

            .btn-group {
                display: flex;
                padding: 0px 14px;
                margin: 25px 0px;

                .btn {
                    flex: 1;
                    line-height: 45px;
                    height: 45px;
                    color: white;
                    text-align: center;
                    background: linear-gradient(90deg, rgba(75, 151, 249, 1), rgba(116, 82, 245, 1));
                    border-radius: 6px;
                    font-weight: 400;
                    font-size: 14px;
                }
            }

            .contact {
                text-align: center;
                padding-bottom: 20px;

                img {
                    margin-bottom: 10px;
                }

                .txt {
                    margin-bottom: 20px;

                }
            }
        }
    }

</style>
