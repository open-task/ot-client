<template>
    <div class="auction">
        <van-nav-bar title="币名拍卖" :left-text="left_name" left-arrow @click-left="go_back" class='header' />
        <div class="line">
            <label for="">币名:</label>
            <select name="" id="" v-model='coin_now' @change='get_coin'>
                <option value="" disabled selected>请选择要交易的币种</option>
                <option :value="name.name" v-for='name in coin_list'>{{name.name}}</option>
            </select>
        </div>
        <div v-if='coin_now'>
            <div class="line">
                <label for="">当前价:</label>
                <div class="content">{{coin_info.max}} SERO</div>
            </div>
            <div class="line">
                <label for="">起拍提价:</label>
                <div class="content">100 SERO</div>
                <input type="number" v-model='times' style='width:100px;'>
                &nbsp;倍
            </div>
            <div class="line">
                <label for="">实际出价:</label>
                <div class="contnt">{{real_price}} SERO</div>
            </div>
            <div class="line">
                <label for="">联系方式:</label>
                <select name="" id="" v-model='contact_type'>
                    <option :value="name" v-for="name in contact_list">{{name}}</option>
                </select>
            </div>
            <div class="line">
                <label for=""></label>
                <input type="text" v-model='contact' placeholder="请输入联系方式">
            </div>
            <div class="btn" @click='upload_bid'>拍币名</div>
            <div class="contact_us">
                <img src="../assets/img/qrcode.png" alt="">
                <div class="txt">购买咨询,请联系客服小姐姐</div>
            </div>
            <div class="auction_list">
                <div class="card" v-for='bid in bid_list'>
                    <div class="card-line">
                        <div class="slice">
                            <div class="name">币名</div>
                            <div class="txt">{{bid.name}}</div>
                        </div>
                        <div class="slice">
                            <div class="name">起拍价</div>
                            <div class="txt">{{bid.basic}}SERO</div>
                        </div>
                    </div>
                    <div class="card-line">
                        <div class="slice">
                            <div class="name">提价</div>
                            <div class="txt">{{bid.rise}}SERO</div>
                        </div>
                        <div class="slice">
                            <div class="name">出价</div>
                            <div class="txt">{{bid.charge}}SERO</div>
                        </div>
                    </div>
                    <div class="card-line">
                        <div class="slice">
                            <div class="name">{{bid.contact_type}}</div>
                            <div class="txt">{{bid.contact}}</div>
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
                times: 1,
                contact_list: ['微信', '手机号', 'qq', '其他'],
                coin_list: [],
                coin_now: "",
                coin_info: {},
                bid_list: [],
                contact_type: "微信",
                contact: "",
            }
        },
        computed: {
            real_price: function() {
                let self = this
                return self.coin_info.max + self.times * 100
            },
            left_name: function() {
                if (window.history.length > 1) {
                    return "返回"
                } else {
                    return "首页"
                }
            }

        },
        methods: {
            go_back: function() {
                this.$router.push('/')
                // if (window.history.length > 1) {
                //     this.$router.back()
                // } else {
                //     this.$router.push('/')
                // }

            },
            get_coin: function() {
                let self = this
                let coin = self.coin_now
                console.log(coin)
                self.$http.post("/skill/get_coin_info", {
                    name: coin
                }).then(function(re) {
                    self.coin_info = re.body.coin_info
                    self.bid_list = re.body.bid_list
                })

            },
            get_coin_list: function() {
                let self = this
                self.$http.post("/skill/get_coin_name_list", {}).then(function(re) {
                    self.coin_list = re.body.coin
                    self.coin_now = self.coin_list[0].name
                    self.get_coin()
                })
            },
            upload_bid: function() {
                let self = this
                if (!self.contact) {
                    alert('请输入你的联系方式')
                    return false
                }
                if (self.times <= 0) {
                    alert('最小出价倍数为1')
                    return false
                }
                let info = {
                    name: self.coin_now,
                    charge: self.real_price,
                    contact_type: self.contact_type,
                    contact: self.contact,
                    rise: self.times * 100
                }
                self.$http.post("/skill/pai", info).then(function(re) {
                    alert('出价成功')
                    window.location.reload()
                })
            }
        },
        mounted() {
            let self = this
            self.get_coin_list()
        }
    }

</script>
<style lang='scss'>
    .auction {
        background-color: white;
        padding-top: 10px;

        .header {
            background: linear-gradient(90deg, rgba(75, 151, 249, 1), rgba(116, 82, 245, 1));
            color: white;
            margin-bottom: 20px;

            .van-icon,
            .van-nav-bar__text {
                color: white;
            }
        }

        .btn {
            flex: 1;
            line-height: 45px;
            height: 45px;
            color: white;
            text-align: center;
            background: linear-gradient(90deg, #4b97f9, #7452f5);
            border-radius: 6px;
            font-weight: 400;
            font-size: 14px;
            margin: 0px 20px;
            margin-bottom: 20px;
        }

        .contact_us {
            margin-bottom: 10px;

            img {
                width: 150px;
                height: 150px;
                display: block;
                margin: 0px auto;
                margin-bottom: 10px;
            }

            .txt {
                text-align: center;
            }
        }

        .line {
            display: flex;
            align-items: center;
            padding-right: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #EFF0F3;
            padding-bottom: 10px;

            label {
                width: 100px;
                text-align: right;
                margin-right: 10px;
            }

            select,
            input {
                flex: 1;
                border: 1px solid gray;
                border-radius: 4px;
                height: 25px;
                line-height: 25px;

            }

            input {
                box-sizing: border-box;
                padding-left: 10px;
            }

            .content {
                flex: 1
            }
        }

        .auction_list {

            .card {
                border-radius: 4px;
                border: 1px solid gray;
                padding: 10px;
                padding-bottom: 0px;
                margin: 10px;
                box-sizing: border-box;
                margin-bottom: 10px;

                .card-line {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;

                    .name {
                        margin-bottom: 5px;
                        font-size: 12px;
                    }

                    .txt {
                        color: #3F464D;
                    }
                }

                .slice {
                    flex: 1;
                    max-width: 50%;

                }
            }
        }
    }

</style>
