<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
   
export default{
    data(){
        return {}
    },
    components:{
        
    }
}
</script>
<style lang="scss">
    @import './assets/addon.scss';
    
    html{
        background: #F5F7FB;
        padding:10px;
    }
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #FFFFFF;
        text-decoration: none;
    }
</style>
