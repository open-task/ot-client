<template>
    <div class="offer-card">
        <van-panel :title="title" status="状态">
            <van-cell :title="content" />
            <van-cell :title="offer.reward_det+' DET'" :value="offer_amount+' Solutions'" />
            <div slot="footer">
               <router-link :to="{name:'detail',query:{task_id:offer.mission_id}}">
                <van-button size="small" type="danger" >详情</van-button>
               </router-link>
            </div>
        </van-panel>
    </div>

</template>
<script>
    export default {
        props: [
            "offer"
        ],
        data() {
            return {}
        },
        mounted(){
            let self = this
            
            console.log(self.offer)
        },
        computed: {
            offer_amount: function() {
                let self = this
                let offer = self.offer
                let amount = offer.solutions && offer.solutions.length ? offer.solutions.length : 0
                return amount
            },
            title: function() {
                let self = this
                let title = ""
                try {
                    title = JSON.parse(self.offer.data)['title']
                }
                catch {
                    title = "未命名"
                }
                return title
            },
            content: function() {
                let self = this
                let content = ""
                try {
                    content = JSON.parse(self.offer.data)['desc']
                }
                catch {
                    content = self.offer.data
                }
                return content
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
