<template>
    <div class="login-container">
        <el-form ref="loginForm" v-bind:class="loginForm" :model="loginForm" :rules="loginRules" class="loginForm" auto-complete="on" label-position = "left">
            <el-form-item v-bind:class="loginItem" class="loginItem"  prop="username">
                <el-input v-model="loginForm.username" autoComplete="on"/>
            </el-form-item>
            <el-form-item v-bind:class="loginItem" class="loginItem" prop="password">
                <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"/>
            </el-form-item>
            <el-form-item v-bind:class="loginItem" class="loginItem">
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {setToken} from "@/utils/auth.js"

export default {
    name:'login',
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
            loginRules:{
                username:[{required:true,trigger:'blur',message:"请输入用户名"}],
                password:[{required:true,trigger:'blur',message:"请输入密码"}]
            },
            loading:false,
            responseResult:[]
        }
    },
    methods:{
        handleLogin(){
            this.$refs.loginForm.validate(valid =>{
                if(valid){
                    this.loading = true
                    console.log("valide")
                    //  this.$store.dispatch('LoginByUsername',this.loginForm).then(data => {
                    //      this.loading = false
                    //      console.log(data)
                    //      if("success" === data.data.data){
                    //          this.$router.push({path:'/'})
                    //      }else{
                    //          this.$message.error("账号/密码错误")
                    //      }
                    //  }).catch(err=>{
                    //      this.loading = false
                    //  });
                     this.$axios.post('/login/auth',this.loginForm).then(data => {
                         this.responseResult = JSON.stringify(data.data)
                         if(data.data.data === "success"){
                             setToken(this.loginForm.username)
                             sessionStorage.setItem('user',this.loginForm.username)
                             this.$store.dispatch('setMenuRouteLoaded',false)
                             console.log("next is home")
                             this.$router.push({path:'/'})
                         }else{
                             console.log(data)
                             this.$message.error(data.data.message)
                         }
                     }).catch(err => {
                         this.loading = false
                     })
                }else{
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-container{
        display: block;
        width: 200px!important;
        height: 150px!important;
        border: 1px solid black;
        margin: 100px auto;
    }
    .loginForm{
        margin: 20px!important;
    }
    .loginItem{
        margin: 10px auto;
    }
    div.el-form-item{
        margin:10px auto;
    }
    button.el-button{
        width: 158px!important;
    }
</style>
