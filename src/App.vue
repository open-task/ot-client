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
    @import './assets/noramlize.css';
    
    @import './assets/addon.scss';
    
    html{
        background: #FEFEFE;
box-sizing: border-box;
        min-width: 375px;
    }
    p{
        margin:unset;
    }
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #FFFFFF;
        text-decoration: none;
    }
</style>
