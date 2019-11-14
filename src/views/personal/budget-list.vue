<template>
    <div class="my-budget">
        <van-cell-group>
            <van-cell class="personal-cell">
                <div>
                    <span class="t-warning">总收入</span>
                    <span class="budget-sum"><i class="t-warning">6000</i> DET</span>
                </div>
                <template slot="title">
                    <img class="personal-link-icon" src="/img/budget-icon.png" alt="">
                    <span>收入详情</span>
                </template>
            </van-cell>
        </van-cell-group>
        <div class="task-list">
            <van-cell is-link>
                <template slot="title">
                    <van-row type="flex" justify="end">
                        <van-col span="18">
                            <h3>OpenTask工程师</h3>
                            <p class="t-gray">2019-08-14 20:00:00 <span class="t-warning">收入</span></p>
                        </van-col>
                        <van-col span="6">
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">DET</span>
                                <span class="pull-right t-warning">1.99</span> 
                            </div>
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">提交</span>
                                <span class="pull-right t-warning">3</span> 
                            </div>
                        </van-col>
                    </van-row>
                </template>
            </van-cell>
            <van-cell is-link>
                <template slot="title">
                    <van-row type="flex" justify="end">
                        <van-col span="18">
                            <h3>OpenTask工程师</h3>
                            <p class="t-gray">2019-08-14 20:00:00 <span class="t-warning">收入</span></p>
                        </van-col>
                        <van-col span="6">
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">DET</span>
                                <span class="pull-right t-warning">1.99</span> 
                            </div>
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">提交</span>
                                <span class="pull-right t-warning">3</span> 
                            </div>
                        </van-col>
                    </van-row>
                </template>
            </van-cell>
            <van-cell is-link>
                <template slot="title">
                    <van-row type="flex" justify="end">
                        <van-col span="18">
                            <h3>OpenTask工程师</h3>
                            <p class="t-gray">2019-08-14 20:00:00 <span class="t-warning">收入</span></p>
                        </van-col>
                        <van-col span="6">
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">DET</span>
                                <span class="pull-right t-warning">1.99</span> 
                            </div>
                            <div class="clearfix">
                                <span class="task-field pull-right t-gray">提交</span>
                                <span class="pull-right t-warning">3</span> 
                            </div>
                        </van-col>
                    </van-row>
                </template>
            </van-cell>
        </div>

    </div>
</template>

<script>
    export default {
        
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
        margin-right: .36rem;
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