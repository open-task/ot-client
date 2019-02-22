<template>
  <div id="app">
   <offer-header></offer-header>
   <br>
    <router-view/>
  </div>
</template>

<script>
    import OfferHeader from '@/components/OfferHeader'
export default{
    data(){
        return {}
    },
    components:{
        OfferHeader
    }
}
</script>
<style lang="scss">
    html{
        background: #F5F7FB;
        padding:10px;
    }
</style>
