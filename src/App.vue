<template>
    <div id="app">

        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        components: {

        },
        mounted() {}
    }

</script>
<style lang="scss">
    @import './assets/noramlize.css';

    @import './assets/addon.scss';

    html {
        background: #F2F2F2;
        box-sizing: border-box;
    }

    @media screen and (min-width: 480px) {
        #app {
            // position: relative;
            max-width: 480px;
            margin: 0 auto;

            .layout-vertical, 
            .bt-tabbar-fixed, 
            .bt-home-popup, 
            .page-error, 
            .van-dropdown-item--down {
                width: 480px;
                left: 50%;
                margin-left: -240px;
            }
        }

        html {
            font-size: 60px !important;
        }
        
    }

    p {
        margin: unset;
    }

    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #FFFFFF;
        text-decoration: none;
    }

</style>
