<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
    <div class="ul-title" slot="title">
      <i :class="menu.icon" ></i>
      <span slot="title">{{menu.name}}</span>
    </div>
    <MenuTree class="son" v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
      // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu.url)
      console.log("url"+path)
      console.log("path"+getIFramePath(menu.url))
      if(!path) {
        path = menu.url
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    }
  }
}
</script>

<style scoped lang="scss">
*{
  padding:0px;
}
// .el-submenu, .el-menu-item {
//   background-color: blanchedalmond;
//   line-height: 2.5em;
//   list-style: none;
//   padding:0px;
//   width: 200px;
// }
// .el-menu-item:hover{
//   background-color: aliceblue;
//   cursor: pointer;
// }
// .ul-title{
//   padding-left: 20px;
//   margin-left: -20px;
// }
// .ul-title:hover{
//   background-color: aliceblue;
// }
// .son{
//   margin-left: -40px;
// }
// span:hover{
//   cursor: pointer;
// }
</style>