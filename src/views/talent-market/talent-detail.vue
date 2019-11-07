<template>
    <div class="talent-detail-wrapper">
        <van-panel class="bt-card" title="自我介绍">
            <div class="bt-card-default">
                <p>我清华大学毕业13年，300多套上线作品，设计经验千经百战，总有一款风格让你心动！不管你是初创团队，还是大型企业，我收费价格不会比市场上高，让你花很少的钱，享受到高端的设计</p>
            </div>
        </van-panel>
        <van-panel class="bt-card" title="项目技能">
            <div class="bt-card-default">
                <van-tag class="bt-tag">区块链</van-tag>
                <van-tag class="bt-tag">UI / UE</van-tag>
                <van-tag class="bt-tag">手绘</van-tag>
                <van-tag class="bt-tag">区块链</van-tag>
                <van-tag class="bt-tag">视觉设计</van-tag>
                <van-tag class="bt-tag">区块链11111111111</van-tag>
                <van-tag class="bt-tag">区块链</van-tag>
                <van-tag class="bt-tag">区块链</van-tag>
            </div>
        </van-panel>
        <van-panel class="bt-card" title="时间标价">
            <div class="bt-card-default">
                <p>我清华大学毕业13年，300多套上线作品，设计经验千经百战，总有一款风格让你心动！不管你是初创团队，还是大型企业，我收费价格不会比市场上高，让你花很少的钱，享受到高端的设计</p>
            </div>
        </van-panel>
        <van-panel class="bt-card no-header">
            <div class="bt-card-default">
                <van-row>
                    <van-col span="12">发布任务<span class="t-warning">3</span>个</van-col>
                    <van-col span="12">解决任务<span class="t-primary">1</span>个</van-col>
                </van-row>
                <van-row>
                    <van-col span="12">提交回答<span class="t-warning">4</span>个</van-col>
                    <van-col span="12">解决回答<span class="t-primary">3</span>个</van-col>
                </van-row>
            </div>
        </van-panel>
        <van-cell style="margin-top: 10px;" title="邮箱地址" value="test@163.com" />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .talent-detail-wrapper {
        .bt-tag {
            margin-bottom: 5px;
            margin-right: 5px;
        }
        .van-row {
            .t-warning,
            .t-primary {
                margin: 0 2px;
            }

            & + .van-row {
                margin-top: 10px;
            }
        }
    }
</style>