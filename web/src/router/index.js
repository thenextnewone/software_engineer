import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login/index'
import dashboard from '@/views/sys/dashboard'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name:'登录',
    component:Login,
    children:[]
  },
   {
     path:'/',
     component:Layout,
     name:'后台首页',
     children:[{
       path:'',
       name: '后台首页',
       component:dashboard
     },
     {
       path:'/',
       component:Layout,
       name:''
     }
  ]
   }
  // {
  //   path:'/information',
  //   component:Layout,
  //   name:'informations',
  //   children:[{
  //     path:'personal_information',
  //     component:() => import('@/views/informations/personal_information')
  //   },
  //   {
  //     path:'teacher_information',
  //     component:() => import('@/views/informations/teacher_information')
  //   },
  //   {
  //     path:'student_information',
  //     component:() => import('@/views/informations/student_information')
  //   }]
  // },
  // {
  //   path:'/course',
  //   component:Layout,
  //   name:'course',
  //   children:[{
  //     path:'course_information',
  //     component:() => import('@/views/informations/course_information')
  //   },
  //   {
  //     path:'teacher_course',
  //     component:() => import('@/views/informations/teacher_course')
  //   },
  //   {
  //     path:'student_course',
  //     component:() => import('@/views/informations/student_course')
  //   }]
  // }
]


export default new Router({
    mode:'history',
    scrollBehavior: () =>({ y:0 }),
    routes: constantRouterMap
})


// export const asyncRouterMap = [
//   {
//     path:'/information',
//     component:Layout,
//     name:'信息',
//     meta:{title:'信息'},
//     children:[
//       {
//         path:'personal_information',
//         name:'个人信息',
//         component:() => import('@/views/informations/personal_information'),
//         meta:{title:'个人信息'},
//         menu: 'personal_information'
//       },
//       {
//         path:'student_information',
//         name:'学生信息',
//         component:() => import('@/views/informations/student_information'),
//         meta:{title:'学生信息'},
//         menu: 'student_information'
//       },
//       {
//         path:'teacher_information',
//         name:'教师信息',
//         component:() => import('@/views/informations/teacher_information'),
//         meta:{title:'教师信息'},
//         menu: 'teacher_information'
//       }
//     ]
//   },
//   {
//     path:'/course',
//     component:Layout,
//     name:'课程信息',
//     meta:{title:'课程信息'},
//     children:[
//       {
//         path:'course_information',
//         name:'课程信息',
//         component:() => import('@/views/informations/course_information'),
//         meta:{title:'课程信息'},
//         menu: 'course_information'
//       },
//       {
//         path:'student_course',
//         name:'选课信息',
//         component:() => import('@/views/informations/student_course'),
//         meta:{title:'选课信息'},
//         menu: 'student_course'
//       },
//       {
//         path:'teacher_course',
//         name:'授课信息',
//         component:() => import('@/views/informations/teacher_course'),
//         meta:{title:'授课信息'},
//         menu: 'teacher_course'
//       }
//     ]
//   }
// ]