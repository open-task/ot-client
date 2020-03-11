<template>
    <div class="my-budget">
        <van-cell-group>
            <van-cell class="personal-cell">
                <div>
                    <span :class="tClass">{{ isIncome ? '总收入' : '总支出' }}</span>
                    <span class="budget-sum"><i :class="tClass">{{total}}</i> DET</span>
                </div>
                <template slot="title">
                    <img class="personal-link-icon" src="/img/budget-icon.png" alt="">
                    <span>{{ isIncome ? '收入' : '支出' }}详情</span>
                </template>
            </van-cell>
        </van-cell-group>
        <div class="task-list" v-show="budgetList && budgetList.length">
            <task-cell v-for="task in budgetList" :key="task.missionId" :task="task" />
        </div>
        <bt-noresult v-show="!budgetList || !budgetList.length" text="暂无收支记录"/>
    </div>
</template>

<script>
    import TaskCell from '@/components/TaskCell';
    import BtNoresult from '@/components/BtNoresult';
    import getTaskData from '@/utils/get-taskdata';
    export default {
        components: {
            BtNoresult,
            TaskCell
        },
        data() {
            return {
                budgetType: this.$route.params.type,
                total: this.$route.params.total,
                budgetList: []
            }
        },

        computed: {
            isIncome() {
                return this.budgetType == 'income'
            },

            tClass() {
                return {
                    't-warning': this.isIncome, 
                    't-primary': !this.isIncome
                }
            }

        },

        mounted() {
          this.getBudgeList();
        },

        methods: {
            getBudgeList() {
                this.$post('/skill/get_user_order', {
                    address: this.account
                }).then( ({ state, income = [], paid = [] }) => {
                    if( state ) {
                        this.budgetList = (this.budgetType == 'income' ? income : paid).map( d => getTaskData(d) );
                    }
                } )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-budget {
        .budget-sum {
            margin-left: 10px;

            i {
                font-style: normal;
            }
        }
    }
    
    .personal-link-icon {
        width: .36rem;
        height: auto;
        margin-right: .2rem;
        vertical-align: middle;
        margin-top: -2px;
    }

    .bt-pannel {
        border-radius: 10px;
        background-color: #fff;
        padding: .24rem .3rem;
        font-size: 14px;

        & + .bt-pannel {
            margin-top: 10px;
        }

        .bt-pannel-hd {
            padding-bottom: .24rem;
            position: relative;

            .right-arrow {
                position: absolute;
                right: 0;
                top: 0;
                color: #999;
            }

            h3 {
                margin: 0;
                font-size: 14px;
                color: #333;
                height: .3rem;
                line-height: .3rem;
                border-left: 2px solid #FFA200;
                padding-left: .14rem;
            }

            &:after {
                display: block;
                content: " ";
                position: absolute;
                left: .14rem;
                right: .14rem;
                bottom: 0;
                border-bottom: 1px solid #ebedf0;
                transform: scaleY(.5);
            }
        }

        .bt-pannel-bd {
            padding: 0 .14rem;
        }
    }
</style>