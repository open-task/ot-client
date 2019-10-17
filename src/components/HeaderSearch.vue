<template>
    <div class="header-search">
        <input type="search" class="search" placeholder="输入信息检索" v-model='info' @keyup.enter='submit'>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                info: ''
            }
        },
        methods: {
            submit: function() {
                let self = this
                self.$emit('search', self.info)
            }
        }
    }

</script>
<style lang='scss'>
    .header-search {
        padding: 10px 10px;
/*        margin-bottom: 10px;*/
        margin-top: -10px;
        background-color: white;

        .search {
            display: inline-block;
            padding: 0px 20px;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            width: 100%;
            background-color: #F3F0F4;
            border: unset;
            border-radius: 20px;
        }
    }

</style>
