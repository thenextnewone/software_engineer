import menu from "../store/modules/menu";
import Mock from 'mockjs'
/* 
 * 菜单管理模块
 */
const navTreeData = {
  "code": 200,
  "msg": null,
  "data": [
    // {
    //   "id": 1,
    //   "createBy": null,
    //   "createTime": null,
    //   "lastUpdateBy": null,
    //   "lastUpdateTime": null,
    //   "parentId": 0,
    //   "name": "后台首页",
    //   "url": "/sys/dashboard",
    //   "perms": null,
    //   "type": 0,
    //   "icon": "el-icon-setting",
    //   "orderNum": 0,
    //   "delFlag": 0,
    //   "parentName": null,
    //   "level": 0,
    //   "children": []
    // },
    {
      "id": 15,
      "parentId": 0,
      "name": "内容管理",
      "url": "",
      "perms": null,
      "type": 0,
      "icon": "el-icon-setting",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
      "children": [{
        "id": 1,
        "parentId": 15,
        "name": "个人信息",
        "url": "/sys/personal-information",
        "perms": null,
        "type": 0,
        "icon": "el-icon-setting",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      }, {
        "id": 2,
        "parentId": 15,
        "name": "用户管理",
        "url": "/sys/user",
        "perms": "sys:student:view",
        "type": 0,
        "icon": "el-icon-info",
        "orderNum": 1,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      },  {
        "id": 4,
        "parentId": 15,
        "name": "选课信息",
        "url": "sys/course-information",
        "perms": "sys:cource:manage",
        "type": 1,
        "icon": "el-icon-document",
        "orderNum": 3,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      }, {
        "id": 5,
        "parentId": 15,
        "name": "课程信息",
        "url": "/sys/course-information",
        "perms": "sys:cource:view",
        "type": 1,
        "icon": "el-icon-star-on",
        "orderNum": 5,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      }, {
        "id": 6,
        "parentId": 15,
        "name": "学生选课信息",
        "url": "/sys/student-elective-information",
        "perms": "sys:student:elective",
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 6,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      },{
        "id": 7,
        "parentId": 15,
        "name": "教师授课信息",
        "url": "/sys/teacher-course-information",
        "perms": "sys:teacher:manage",
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 6,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
      },{
      "id": 9,
        "parentId": 15,
        "name": "我的授课",
        "url": "/sys/teacher's-course",
        "perms": "sys:teacher:view-course",
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 6,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
    },
    {
      "id": 10,
        "parentId": 15,
        "name": "成绩管理",
        "url": "/sys/score-manage",
        "perms": "sys:teacher:score-manage",
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 6,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": []
    }]
    },
    {
      "id": 16,
        "parentId": 0,
        "name": "系统管理",
        "url": "",
        "perms": "",
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 6,
        "delFlag": 0,
        "parentName": null,
        "level": 0,
        "children": [
          {
            "id": 17,
              "parentId": 0,
              "name": "权限管理",
              "url": "/sys/perms-manage",
              "perms": "",
              "type": 0,
              "icon": "el-icon-picture-outline",
              "orderNum": 6,
              "delFlag": 0,
              "parentName": null,
              "level": 0,
              "children": []
          },
          {
            "id": 18,
              "parentId": 0,
              "name": "日志查看",
              "url": "/sys/log-view",
              "perms": "",
              "type": 0,
              "icon": "el-icon-picture-outline",
              "orderNum": 6,
              "delFlag": 0,
              "parentName": null,
              "level": 0,
              "children": []
          }
        ]
    },{
      "id":19,
      "parentId":0,
      "name":"修改密码",
      "url":"/sys/modify-password",
      "perms":"",
      "type":0,
      "icon":"el-icon-setting",
      "children":[]
    }
]
}
// 获取导航菜单树
// export function findNavTree() {
    
//     return {
//       url: 'http://localhost:8080/menu/findNavTree',
//       type: 'get',
//       data: navTreeData
//     }
//   }

export default Mock.mock('http://localhost:8080/menu/findNavTree','get',navTreeData)