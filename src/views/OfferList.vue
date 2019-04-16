<template>
    <div class="offer-list">
        <offer-card v-for="offer in offer_list" :offer='offer'></offer-card>
        <van-pagination v-model="page" v-if='offer_list' :page-count="10" mode="simple" @change='get_page' />
    </div>
</template>
<script>
    import OfferCard from "@/components/OfferCard"
    export default {
        components: {
            OfferCard
        },
        mounted() {
            let self = this
            self.get_page()
        },
        methods: {
            get_page: function() {
                let self = this
                if(self.finished){
                    return
                }
                let page_count = self.page_count
                let page_start = (self.page-1)*page_count
                console.log(self.page,page_count,page_start)
                self.$http.post("/v1/", {
                    "jsonrpc": "2.0",
                    "method": "GetAllPublished",
                    "params": [page_start, page_count],
                    "id": "11"
                }).then(function(re) {
                    console.log(re)
                    if(!re.body.result){
                        self.page-=1
                        self.$dialog({message:"已加载全部内容"})
                        self.finished = true
                    }else{
                    self.offer_list = re.body.result
                    }
                })
            }
        },
        data() {
            return {
                offer_list: [],
                page: 1,
                page_count:10,
                finished:false
                
            }
        }
    }

</script>
