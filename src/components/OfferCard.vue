<template>
    <div class="offer-card">
        <van-panel :title="offer.Mission" status="状态">
            <van-cell title="爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大" />
            
            <van-cell :title="offer.Reward+' DET'" :value="offer_amount+' offer'" />
            <div slot="footer">
                <van-button size="small" type="danger">accept</van-button>
            </div>
        </van-panel>
    </div>

</template>
<script>
    export default {
        props:[
            "offer"
        ],
        data() {
            return {}
        },
        computed:{
            offer_amount:function(){
                let self = this
                let offer = self.offer
                let amount = offer.Solutions&&offer.Solutions.length?offer.Solutions.length:0
                return amount
            }
        }
    }

</script>
<style>
    .offer-card {
        margin-bottom: 20px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

</style>
