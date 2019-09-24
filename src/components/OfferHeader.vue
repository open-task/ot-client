<template>
    <div class="offer-header">
        <van-nav-bar
  :title="real_title"
  left-text="返回"
  :right-text="right_text"
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
    props:['title'],
    mounted(){
        let self = this
        
    },
    computed:{
        right_text:function(){
            let self = this
            let name = self.$route.name
            if(['tasklist'].indexOf(name)+1){
                return "创建"
            }else{
                return ''
            }
        },
        real_title:function(){
            let self = this
            return self.title?self.title:"标题"
        }
    },
    methods:{
        onClickLeft:function(){
            let self = this
            console.log(self.$route)
            if(self.$route.name=='tasklist'){
                window.location.href = "/"
                self.$router.push({name:'home'})
            }else{
            this.$router.go(-1)
                
            }
        },
        onClickRight:function(){
            let self = this
            let name = self.$route.name
            if(['tasklist','detail'].indexOf(name)+1){
            this.$router.push({name:"create"})

            }
            
        }
    }
}
</script>
<style lang='scss'>
    .offer-header{
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        margin-bottom:10px;
        .van-nav-bar{
            background: linear-gradient(to right , #4A96F7, #7352F5);
        }
        color: white;
        .van-nav-bar{
            background-color: #36277B;
        }
        .van-nav-bar__text{
            color: white;
        }
        .van-nav-bar .van-icon{
            color:white;
        }
    }
    .van-nav-bar__title{
        font-size:13px !important;
    }
</style>