<template>
    <div class="talentmap">
        <offer-header title="人才市场"></offer-header>

        <van-cell-group>
            <van-field v-model="search" center clearable label="搜索技能" placeholder="请输入关键字">
                <van-button slot="button" size="small" type="primary" @click='click_search'>搜索</van-button>
            </van-field>
        </van-cell-group>

        <van-cell-group>
            <van-cell v-for="(t,index) in skill_map" :title="t.name" :value="`用户数量  ${t.count}`" :to="{name:'talentmarket',params:{skill:t.name}}" />

        </van-cell-group>
        <router-link :to="{name:'submittalent'}">
            <van-button plain hairline type="primary" style="margin-bottom:10px;width:100%;">提交我的技能</van-button>
        </router-link>

        <!--        <div  class="talent-tag" :key="index" >{{t.name}} <span class="red">{{t.count}}</span></div>-->

    </div>
</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        data() {
            return {
                skill_map: [],
                search: ""
            }
        },
        components: {
            OfferHeader,
        },
        mounted() {
            let self = this
            self.$http.post("/skill/list_skills", {
                q: self.search
            }).then(function(re) {
                let skills = re.body.skills
                self.skill_map = skills
                console.log(re)
            })

        },
        methods: {
            click_search: function() {
                let self = this
                self.$http.post("/skill/list_skills", {
                    s: self.search
                }).then(function(re) {
                    let skills = re.body.skills
                    self.skill_map = skills
                })
            }
        }
    }

</script>
<style lang='scss'>
    .talentmap {
        font-size: 0px;

        .talent-tag {
            height: 40px;
            line-height: 40px;
            border: 1px solid gray;
            border-radius: 4px;
            display: inline-block;
            padding: 0px 10px;
            margin-right: 5px;
            font-size: 13px;
            background-color: white;
            color: black;

            .red {
                color: red
            }

        }

    }

</style>
