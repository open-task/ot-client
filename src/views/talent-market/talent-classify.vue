<template>
    <div class="layout-vertical">
        <div class="talent-list list-scroller">
            <van-cell-group>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
                <van-cell size="large" icon="location-o" is-link>
                    <div slot="title">
                        <h3>区块链</h3>
                    </div>
                    <div slot="label">
                        <p><span class="t-warning">20</span>个任务</p>
                    </div>
                    <div>
                        <span class="t-primary">110</span>人提交
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
        <div class="bt-footer-wrapper">
            <van-button class="bt-btn" size="large" block>提交我的技能</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        
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