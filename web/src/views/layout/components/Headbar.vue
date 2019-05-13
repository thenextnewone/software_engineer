<template>
  <el-menu class="headbar" mode="horizontal">
    <img :src="logo">
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avater">
        <p>{{username}}</p>
        <!-- <i class="el-icon-caret-bottom"></i> -->
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
      <div class="triangle"></div>
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import {getToken} from '@/utils/auth'

export default {
  name:"HeadBar",
  data(){
    return{
      avater:require("@/assets/user.png"),
      logo:require("@/assets/logo.jpg"),
      username:getToken()
    }
  },
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.headbar{
  height: 150px;
}
.avatar-container{
  float: right;
  margin:45px;
}
img{
  height: 150px;
  border-radius: 100px;
}
p{
  margin: 0;
  text-align: center;
}
img.user-avatar{
  height: 60px;
}
</style>

