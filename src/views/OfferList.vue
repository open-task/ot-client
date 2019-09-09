<template>
    <div class="offer-list">
      
       <offer-header title='任务列表'></offer-header>
       
       <header-search @search='search'></header-search>
       <div class="types">
           <span>全部</span>
           <span class='selected'>待解决</span>
           <span>已提交</span>
           <span>已解决</span>
       </div>
       <div class="tasks">
        <offer-card v-for="offer in offer_list" :offer='offer'></offer-card>
           
       </div>
       
        <van-pagination v-model="page" v-if='offer_list' :page-count="10" mode="simple" @change='get_page'/>
    </div>
</template>
<script>
    import OfferCard from "@/components/OfferCard"
     import OfferHeader from '@/components/OfferHeader'
     import HeaderSearch from '@/components/HeaderSearch'
    export default {
        components: {
            OfferCard,OfferHeader,HeaderSearch
        },
        mounted() {
            let self = this
            self.get_page()
        },
        methods: {
            search:function(c){
                console.log(c)
            },
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
<style lang='scss'>
    .offer-list{
        background-color: #F2F2F2;
        .types{
            background-color: white;
            padding:0px 20px;
            font-size: 0px;
            margin-bottom: 10px;
            span{
                color: #979797;
                display: inline-block;
                line-height: 45px;
                margin-right: 50px;
                font-size: 15px;
                border-bottom: 4px solid transparent;
                &:last-child{
                    margin-right: 0px;
                }
                &.selected{
                    color: #3c8ffb;
                    border-bottom-color: #3c8ffb;
                }
            }
        }
        .tasks{
            margin-bottom: 20px;
        }
        .van-cell__value{
            color: #36277B !important
        }
        .van-button--danger{
            background-color: #36277B;
            border-color: #36277B;
        }
    }
</style>
