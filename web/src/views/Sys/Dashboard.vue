<template>
    <div class="dashboard-container">

        <p>欢迎来到后台管理系统</p>

    </div>
</template>
<script>
import {getToken} from '@/utils/auth.js'
export default {
    name: 'dashboard',
    data:function(){
        return {
        }
    },
    methods:{
        logOut(){
             this.$store.dispatch('LogOut').then(() => {
                location.reload()
            })
        }
    }
}
</script>
