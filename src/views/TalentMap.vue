<template>
    <div class="talentmap">
        <offer-header title="人才市场"></offer-header>
        <router-link :to="{name:'submittalent'}">
            <van-button plain hairline type="primary" style="margin-bottom:10px;width:100%;">提交我的技能</van-button>
        </router-link>

    <router-link :to="{name:'talentmarket',params:{skill:t.name}}" v-for="(t,index) in skill_map">
        <div  class="talent-tag" :key="index" >{{t.name}} <span class="red">{{t.count}}</span></div>
    </router-link>
        
    </div>
</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        data() {
            return {
                skill_map: []

            }
        },
        components: {
            OfferHeader,
        },
        mounted() {
            let self = this
            self.$http.post("/skill/list_skills",{}).then(function(re) {
                let skills = re.body.skills
                self.skill_map = skills
                console.log(re)
            })

        },
        methods: {
            submit_talent: function() {

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
            color:black;

            .red {
                color: red
            }

        }

    }

</style>
