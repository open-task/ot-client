<template>
    <div class="submittalent">
    <offer-header></offer-header>
       
        <p class='label'>请输入你的技能,每行一项</p>
        <van-field v-model="message" type="textarea" placeholder="每行一项技能" rows="5" autosize />
       
        <van-field v-model="value" placeholder="请输入你的邮件地址" />
       <van-button  hairline type="primary" style="margin-bottom:10px;width:100%;" @click="submit_talent">提交我的技能</van-button>
        
    </div>

</template>
<script>
    import OfferHeader from '@/components/OfferHeader'
    export default {
        data(){
            return {}
        },
        components: {
            OfferHeader,
        },
    }

</script>
<style lang='scss'>
    .submittalent{
        .label{
            font-size:13px;
            margin: unset;
            margin-bottom: 10px;
        }
        .van-field{
            margin-bottom: 10px;
        }
    }
</style>
