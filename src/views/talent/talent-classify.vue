<template>
    <div class="layout-vertical">
        <div class="search-hd">
            <form action="/">
                <van-search
                    v-model="searchText"
                    placeholder="请输入技能检索"
                    shape="round"
                    @input="handleSearch"
                    @clear="getSkills"
                />
            </form>
        </div>
        <div class="talent-list bt-flex-scroller">
            <van-cell-group v-show="skills && skills.length">
                <van-cell size="large" is-link v-for="s in skills" :key="s.id" :to="`/talentlist/${s.name}`">
                    <div slot="title">
                        <h3>{{s.name}}</h3>
                    </div>
                    <!-- <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div> -->
                    <div>
                        用户数量 <span class="t-primary">{{s.count}}</span>
                    </div>
                </van-cell>
            </van-cell-group>
            <bt-noresult v-show="!skills || !skills.length" />
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block to="/talentcreate">提交我的技能</van-button>
        </div>
    </div>
</template>

<script>
    import BtNoresult from '@/components/BtNoresult';
    export default {
        components: {
            BtNoresult
        },
        data() {
            return {
                searchText: '',
                skills: [],
                handleSearch: null
            }
        },
        mounted() {
            this.getSkills();
            this.handleSearch = this.$throttle( this.getSkills, 300 )
            
        },
        methods: {
            getSkills() {
                this.$post("/skill/list_skills", { s: this.searchText || '' }).then( res => {
                    if( res.skills && res.skills.length ) {
                        this.skills = res.skills.filter( s => !!s.name );
                    }else {
                        this.skills = [];
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .talent-list {
        .van-cell {
            align-items: center;

            .t-warning,
            .t-primary {
                margin-right: 2px;
            }
        }
        .van-cell__title {
            h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
</style>