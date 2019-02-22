<template>
    <div class="offer-list">
        <offer-card v-for="offer in offer_list" :offer='offer'></offer-card>
    </div>
</template>
<script>
    import OfferCard from "@/components/OfferCard"
    export default {
        components:{
            OfferCard
        },
        mounted(){
            let self = this
            self.$http.post("/v1/",{"jsonrpc":"2.0","method":"GetAllPublished","params":[0, 5],"id":"11"}).then(function(re){
                console.log(re.body.result)
                self.offer_list = re.body.result
            })
        },
        data() {
            return {
                offer_list:[]
            }
        }
    }

</script>
