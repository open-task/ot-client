<template>
    <div class="page-error">
        <img src="/img/page404.png" alt="">
        <p class="t-primary">抱歉！您访问的页面不存在，请重新加载！</p>
        <p><router-link class="t-primary" to="/">返回首页</router-link></p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .page-error {
        background-color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        img {
            display: block;
            width: 80%;
            margin: -30% auto 30px;
        }

        p {
            text-align: center;
            font-size: 14px;
            line-height: 30px;
        }
    }
</style>