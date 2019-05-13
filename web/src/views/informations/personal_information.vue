<template>
    <div>
        this is personal_imformation
    </div>
</template>
<script>
import {getUserInfo} from "@/utils/auth"
import api from '@/utils/api.js'
export default {
    name:'personal_information',
    created(){
        this.getInformation()
    },
    methods:{
        getInformation(){
            api({
                url:"/getInfo/personal",
                method:"post",
                data:JSON.parse(getUserInfo())
            }).then(data =>{
                console.log(data)
            })
        }
    }
}
</script>
