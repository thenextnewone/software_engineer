import Mock from 'mockjs'
const users = {
    admin:{
        password:'123456',
        role:'admin'
    },
    student:{
        password:'123456',
        role:'student'
    },
    teacher:{
        password:'123456',
        role:'teacher'
    }
}

const successData={
    "data":"success",
    "msg":"登录成功"
}

const failData = {
    "data":"fail",
    "msg":"用户名或密码错误"
}

let mockLogin = Mock.mock('http://localhost:8080/login/auth',"post",function(loginForm){
    console.log("233333")
    console.log(loginForm)
    console.log(loginForm.body)
    const user = JSON.parse(loginForm.body)
    console.log(user)
    console.log(users[user.username])
    console.log(user.password == users[user.username].password)
    if(user.password == users[user.username].password){
        console.log(successData)
        return successData
    }else{
        return failData
    }
});

export default {
    users,
    mockLogin
}