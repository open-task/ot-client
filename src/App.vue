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
        min-width: 375px;
    }

    @media screen and (min-width: 640px) {
        html {
            max-width: 640px;
            margin: 0 auto;
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
