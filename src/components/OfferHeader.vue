<template>
    <div class="offer-header">
        <van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    methods:{
        onClickLeft:function(){},
        onClickRight:function(){}
    }
}
</script>
<style lang='scss'>
    .offer-header{
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }
</style>