import Mock from 'mockjs'

    let students = [{
        id: "20161101",
        name: "小一",
        sex: "男",
        birthdate: "1998-01-01",
        politicalStatus: "what",
        classno: "11",
        collegeId: "11",
        graduatedSchool: "xx高中",
        phoneNumber: "12345678909",
    },{
        id: "20161102",
        name: "小er",
        sex: "男",
        birthdate: "1998-01-01",
        politicalStatus: "what",
        classno: "11",
        collegeId: "11",
        graduatedSchool: "xx高中",
        phoneNumber: "12345678909",
    },{
        id: "20161103",
        name: "小san",
        sex: "男",
        birthdate: "1998-01-01",
        politicalStatus: "what",
        classno: "11",
        collegeId: "11",
        graduatedSchool: "xx高中",
        phoneNumber: "12345678909",
    },{
        id: "20161104",
        name: "小si",
        sex: "男",
        birthdate: "1998-01-01",
        politicalStatus: "what",
        classno: "11",
        collegeId: "11",
        graduatedSchool: "xx高中",
        phoneNumber: "12345678909",
    },{
        id: "20161105",
        name: "小5",
        sex: "男",
        birthdate: "1998-01-01",
        politicalStatus: "what",
        classno: "11",
        collegeId: "11",
        graduatedSchool: "xx高中",
        phoneNumber: "12345678909",
    },{
      id: "20161105",
      name: "小5",
      sex: "男",
      birthdate: "1998-01-01",
      politicalStatus: "what",
      classno: "11",
      collegeId: "11",
      graduatedSchool: "xx高中",
      phoneNumber: "12345678909",
  },{
    id: "20161105",
    name: "小5",
    sex: "男",
    birthdate: "1998-01-01",
    politicalStatus: "what",
    classno: "11",
    collegeId: "11",
    graduatedSchool: "xx高中",
    phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},{
  id: "20161105",
  name: "小5",
  sex: "男",
  birthdate: "1998-01-01",
  politicalStatus: "what",
  classno: "11",
  collegeId: "11",
  graduatedSchool: "xx高中",
  phoneNumber: "12345678909",
},]

    let data = {
      content:[],
      pageNum:0,
      pageSize:0,
      totalPages:0,
      totalSize:0,
      request:""
    }

    export default Mock.mock('http://localhost:8080/page/student-information','post',function(pageRequest){
      data.request = JSON.parse(pageRequest.body)
      data.content = []
      data.pageSize = data.request.pageSize
      data.pageNum = data.request.pageNum
      data.totalSize = students.length
      if(students.length>data.pageSize){
        data.totalPages = Math.ceil(students.length/data.pageSize)
        if(data.pageNum == data.totalPages){
          for(let i = (data.pageNum-1)*data.pageSize;i < data.totalSize;i++){
            data.content.push(students[i])
          }
        }else{
          for(let i = (data.pageNum-1)*data.pageSize;i < (data.pageNum-1)*data.pageSize + data.pageSize;i++){
            data.content.push(students[i])
          }
        }
      }else{
        data.totalPages = 1
        data.content = students
      }
      return data
    })