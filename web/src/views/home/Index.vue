<template>
  <div>
    <hr/>
    <div>
      这是首页，嘻嘻嘻。
    </div>
    <hr/>
    <h1>{{ fullName }}</h1>
    {{ firstName }}
    {{ lastName }}

  </div>
</template>

<script>

export default {
  name: 'BlogIndex',
  data:function(){
    return{
      firstName: 'Steve',
      lastName: 'Rogers',
      liClass:'thisisLiClass',
      items:[],
      newItem:' ',
      seen:true,
      posts:[]
    }
  },
  // created:function(){
  //   var vm = this
  //   this.$axios.get('/getUsers')
  //   .then(posts=>{
  //     this.posts = JSON.stringify(posts.data)
  //   })
  // },
  computed:{
   fullName: function(){
     return  this.firstName +' '+this.lastName
   }
  }
}
</script>
