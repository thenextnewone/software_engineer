<template>
    <div class="container">
        <navbar class="navbar-container"></navbar>
        <headbar class="headbar-container"></headbar>
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import {Navbar,Headbar, AppMain} from '@/views/layout/components'
export default {
    name:'Layout',
    components:{
        Headbar,
        AppMain,
        Navbar
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "src/styles/mixin.scss";
 .navbar-container{
    // width: 25%!important;
    width: 200px;
    position: absolute;
    top: 0;
    bottom: 0px;
    left: 0;
 }
 .headbar-container{
     position: fixed;
     left:0;
     top: 0;
     right: 0px;
     height: 150px;
     background-color: palegoldenrod;
 }
 .main-container{
    position: absolute;
    top:150px;
    left: 200px;
    right:5px;
    bottom:5px;
    margin-left: 5px;
    margin-top: 5px;
 }
  .container {
   position: relative;
   height: 100%;
   width: 100%;
  }
</style>