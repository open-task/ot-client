<template>
    <div class="talentmap">
        <offer-header title="人才市场" ></offer-header>
        <router-link :to="{name:'submittalent'}">
            <van-button plain hairline type="primary" style="margin-bottom:10px;width:100%;" >提交我的技能</van-button>
        </router-link>
       
        
        <div class="talent-tag" :key="index" v-for="(t,index) in talent_map">{{t.name}} <span class="red">{{t.amount}}</span></div>
    </div>
</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        data() {
            return {
                talent_map: [{
                        name: "插画",
                        amount: 5
                    },
                    {
                        name: "插画",
                        amount: 5
                    },
                    {
                        name: "插画",
                        amount: 5
                    },
                    {
                        name: "插画",
                        amount: 5
                    },
                ]

            }
        },
        components: {
            OfferHeader,
        },
        mounted() {
            let self = this

        },
        methods:{
            submit_talent:function(){
                
            }
        }
    }

</script>
<style lang='scss'>
    .talentmap {
        font-size: 0px;
        .talent-tag {
            height:40px;
            line-height: 40px;
            border: 1px solid gray;
            border-radius: 4px;
            display: inline-block;
            padding: 0px 10px;
            margin-right: 5px;
            font-size: 13px;
            background-color: white;
            .red {
                color: red
            }

        }

    }

</style>
