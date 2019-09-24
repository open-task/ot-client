<template>
    <div class="offer-list">

        <offer-header title='任务列表'></offer-header>

        <header-search @search='search'></header-search>
        <div class="types">
            <span :class="{selected:page_type=='all'}" @click='go_page("all")'>全部</span>
            <span :class="{selected:page_type=='published'}" @click='go_page("published")'>待解决</span>
            <span :class="{selected:page_type=='unsolved'}" @click='go_page("unsolved")'>已提交</span>
            <span :class="{selected:page_type=='solved'}" @click='go_page("solved")'>已解决</span>
        </div>
        <div class="tasks">
            <offer-card style='margin-bottom:5px' v-for="offer in offer_list" :offer='offer'></offer-card>

        </div>

        <van-pagination v-model="page" v-if='offer_list' :page-count="10" mode="simple" @change='get_page' />
    </div>
</template>
<script>
    import OfferCard from "@/components/OfferCard"
    import OfferHeader from '@/components/OfferHeader'
    import HeaderSearch from '@/components/HeaderSearch'
    export default {
        components: {
            OfferCard,
            OfferHeader,
            HeaderSearch
        },
        computed: {
            page_type: function() {
                console.log(this.$router)
                return this.$route.params.type
            }
        },
        mounted() {
            let self = this
                 self.get_page()

        },
        methods: {
            search: function(c) {
                console.log(c)
            },
            go_page(type) {
                let self = this
                window.location.href = `/tasklist/${type}`

            },
            get_page() {
                let self = this
                let page = self.page
                let type = self.$route.params.type
                let f = {page:page}
                if (type) {
                    f["type"] = type
                } else {
                    f["type"] = ""
                }
                console.log(f)
                self.$http.post("/skill/list_tasks", f).then(function(re) {
                    self.offer_list = re.body.missions
                })
            }

        },
        data() {
            return {
                offer_list: [],
                page: 1,
                page_count: 200,
                finished: false,

            }
        }
    }

</script>
<style lang='scss'>
    .offer-list {
        background-color: #F2F2F2;

        .types {
            background-color: white;
            padding: 0px 20px;
            font-size: 0px;
            margin-bottom: 10px;

            span {
                color: #979797;
                display: inline-block;
                line-height: 45px;
                margin-right: 50px;
                font-size: 15px;
                border-bottom: 4px solid transparent;

                &:last-child {
                    margin-right: 0px;
                }

                &.selected {
                    color: #3c8ffb;
                    border-bottom-color: #3c8ffb;
                }
            }
        }

        .tasks {
            margin-bottom: 20px;
        }

        .van-cell__value {
            color: #36277B !important
        }

        .van-button--danger {
            background-color: #36277B;
            border-color: #36277B;
        }
    }

</style>
