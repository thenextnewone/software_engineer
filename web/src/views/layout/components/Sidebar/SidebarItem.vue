<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item v-bind:class="el-menu-item" :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-bind:class="el-submenu-title" v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item v-bind:class="el-menu-item" :index="item.path+'/'+child.path">
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-wrapper{
  width: 100%;
  height: 100%;
}
.menu-wrapper *{
  text-decoration: none;
  list-style: none;
  line-height: 50px;
}
li.el-menu-item{
  padding-left:40px!important;
  background-color:#1f2d3d!important;
}
li.el-menu-item:hover{
  background-color: #001528!important;
}
.el-submenu-title{
  padding-left:0px!important;
}
</style>
