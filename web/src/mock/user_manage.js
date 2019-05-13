import Mock from 'mockjs'


    let roles=[
        "admin","student","teacher"
    ]

    let users = [{
        id:"1",
        user_name: "20161101",
        password: "123456",
        true_name: "小一",
        bz: "学生一",
        role: ["学生","管理员"],
        roleId:[3,1]
    }]

    let data = {
      content:[],
      pageNum:0,
      pageSize:0,
      totalPages:0,
      totalSize:0,
      request:""
    }

    export default Mock.mock('http://localhost:8080/page/user-information','post',function(pageRequest){
      data.request = JSON.parse(pageRequest.body)
      data.content = []
      data.pageSize = data.request.pageSize
      data.pageNum = data.request.pageNum
      data.totalSize = users.length
      if(users.length>data.pageSize){
        data.totalPages = Math.ceil(users.length/data.pageSize)
        if(data.pageNum == data.totalPages){
          for(let i = (data.pageNum-1)*data.pageSize;i < data.totalSize;i++){
            data.content.push(users[i])
          }
        }else{
          for(let i = (data.pageNum-1)*data.pageSize;i < (data.pageNum-1)*data.pageSize + data.pageSize;i++){
            data.content.push(users[i])
          }
        }
      }else{
        data.totalPages = 1
        data.content = users
      }
      return data
    })