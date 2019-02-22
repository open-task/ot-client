<template>
    <div class="create-offer">
        <van-cell-group>
            <van-field v-model="title" required clearable label="项目名称" placeholder="请输入项目名称" @click-icon="$toast('question')" />

            <van-field v-model="desc" type="textarea" label="项目描述" placeholder="请输入项目具体描述,需要什么样的服务,工期大约多少" required rows='6' />
        </van-cell-group>
        <br>
        <van-cell-group>
            <van-field v-model="charge" type='number' placeholder="请输入报酬">
                <van-button slot="button" size="small" type="primary">托管报酬</van-button>
            </van-field>
        </van-cell-group>
        <van-button type="primary" class="success-btn">主要按钮</van-button>
    </div>

</template>


<script>
export default{
    data(){
        return {
            title:"",
            desc:"",
            charge:""
        }
    }
}
</script>
<style lang='scss'>
    .success-btn{
        position: fixed !important;
        bottom: 0px;
        margin: 10px 0px;
        display: block;
        width:calc(100% - 20px);
        border-radius: 4px;
        padding:unset;
    }
</style>