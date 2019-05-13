import Mock from 'mockjs'


    let users = [{
        id: "1",
        bz: "学生一",
        true_name: "小一",
        user_name: "20161101",
        password: "123456",
        sex: "男",
        workingtime: "2016110445",
        political: "团员",
        collegeid: "计科",
        classno:"3",
        graduate:"高中",
        phone:"12345678909",
        nativeplace:"四川"
    },{
        id: "2",
        bz: "学生2",
        true_name: "小er",
        user_name: "20161102",
        password: "123456",
        sex: "男",
        workingtime: "2016110442",
        political: "群众",
        collegeid: "计科",
        classno:"3",
        graduate:"高中",
        phone:"12345678909",
        nativeplace:"四川"
    }]

    let data = {
        code:"success",
        data:""
    }

    export default Mock.mock('http://localhost:8080/user/information','post',function(request){
     for(let i = 0;i<users.length;i++){
         if(users[i].id == request.body){
             console.log(users[i])
             data.data = users[i]
         }
     }
     console.log(data.data)
     return data
    })