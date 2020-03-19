<template>
    <div>
        <p class="bt-noresult">{{text}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: '暂无搜索结果'
            }
        }
    }
</script>