import Mock from 'mockjs'
import login from './login'
import * as menu from './menu'
import * as user from './user'
import * as page from './page'
import * as user_manage from './user_manage'
import * as user_information from './user_information'

let openMock = false
fnCreate(login,openMock)
fnCreate(menu,openMock)
fnCreate(user,openMock)
fnCreate(page,openMock)
fnCreate(user_manage,openMock)
fnCreate(user_information,openMock)

function fnCreate (mod, isOpen = true) {
  
    if (isOpen) {
      for (var key in mod) {
        ((res) => {
          if (res.isOpen !== false) {
            let url = baseUrl
            if(!url.endsWith("/")) {
              url = url + "/"
            }
            url = url + res.url
            Mock.mock(new RegExp(url), res.type, (opts) => {
              opts['data'] = opts.body ? JSON.parse(opts.body) : null
              delete opts.body
              console.log('\n')
              console.log('%cmock拦截, 请求: ', 'color:blue', opts)
              console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
              return res.data
            })
          }
        })(mod[key]() || {})
      }
    }
  }