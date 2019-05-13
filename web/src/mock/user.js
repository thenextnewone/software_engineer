import Mock from 'mockjs'

import login from './login'
// 查找用户的菜单权限标识集合
    let permsData = {
      "code": 200,
      "msg": null,
      "data": [
        null,
        "sys:student:view",
        "sys:user:view",
        "sys:menu:delete",
        "sys:dept:edit",
        "sys:dict:edit",
        "sys:dict:delete",
        "sys:menu:add",
        "sys:user:add",
        "sys:log:view",
        "sys:dept:delete",
        "sys:role:edit",
        "sys:role:view",
        "sys:dict:view",
        "sys:user:edit",
        "sys:user:delete",
        "sys:dept:view",
        "sys:dept:add",
        "sys:role:delete",
        "sys:dict:add",
        "sys:role:add"
      ]
    }

    const role_perms = {
      admin:["sys:student:view",
      "sys:teacher:view",
      "sys:cource:manage",
      "sys:cource:view",
      "sys:student:elective",
      "sys:teacher:manage"
    ],
      teacher:[
        "sys:student:view",
        "sys:teacher:view-course",
        "sys:teacher:score-manage",
        "sys:teacher:view-timetable"
      ],
      student:[
        "sys:student:view-course",
        "sys:student:elective",
        "sys:student:view-timetable"
      ]
    }

    const users = login.users

    export default Mock.mock('http://localhost:8080/user/findPermissions','post',function(username){

    console.log(users)
      console.log(users[username.body].role)
      console.log(role_perms[users[username.body].role])
      return role_perms[users[username.body].role]
    })