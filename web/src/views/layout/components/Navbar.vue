<template>
    <div class="menu-bar-container">
        <el-menu ref="navmenu" default-active="1" :unique-opened="true" @select="handleselect">
            <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
        </el-menu>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import MenuTree from "@/components/MenuTree"
export default {
    data(){
        return{
        }
    },
    components:{
        MenuTree
  },
    computed:{
        ...mapState({
            navTree: state => state.menu.navTree
        })
    },
    watch:{
        $route:'handleRoute'
    },
    created(){
        this.handleRoute(this.$route)
    },
    methods:{
        handleselect(a,b){
            console.log('handleselect')
        },
        handleRoute(route){
            if(this.$refs.navmenu != null){
                this.$refs.navmenu.activeIndex = '' + route.meta.index
                this.$refs.navmenu.initOpenedMenu()
            }
        },
        handle(menu){
            let path = menu.url
            console.log(path)
            this.$router.push("/"+path)
        }
    }
}
</script>
<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 150px;
  left: 0;
  bottom: 0;
  .el-menu {
    position:absolute;
    top: 0px;
    bottom: 0px;
    text-align: left;
    padding-left: 0;
    width: 200px;
    margin: 0px;
    // background-color: #2968a30c;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #545c64;
    cursor:pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 25px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }
//   .menu-bar-width {
//     width: 200px;
//   }
  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>
