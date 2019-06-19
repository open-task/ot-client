<template>
    <div class="home">
       
        <div class="task_info">
            发布任务<span class="red">3</span>次 解决任务<span class="red">5</span>次 获得赏金<span class="red">335.43</span> DET
        </div>
        <van-cell-group class='menu'>
            <router-link :to="{name:'tasklist'}" class="a">
                <van-cell title="任务列表" icon="balance-list-o" label="当前悬赏中任务数 5 " />
            </router-link>
            <router-link :to="{name:'talentmap'}" class="a">
                <van-cell title="人才市场" icon="friends-o" />
            </router-link>
            <van-cell title="收支记录" icon="gem-o" />
            <van-cell title="设置" icon="setting-o" />
        </van-cell-group>
        <img src="/img/上下版_黑色.png" alt="" class="logo">
    </div>
</template>

<script>
    export default {
        name: 'home',
    }

</script>
<style lang='scss'>
    .home {
        .menu {
            .a {
                margin-bottom: 2px;
                display: block;
            }
        }

        .van-cell-group {
            background-color: transparent;
        }

        .task_info {
            background-color: white;
            margin-bottom: 10px;
            padding: 10px 15px;
            font-size: 13px;

            .red {
                color: red;
                margin: 0px 3px;
            }

        }
        .logo{
            height:40px;
            position: absolute;
            bottom:100px;
            left:50%;
            margin-left:-37px;
        }
    }

</style>
