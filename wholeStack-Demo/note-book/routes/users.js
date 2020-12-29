const router = require('koa-router')()
const UserService = require('../controllers/mySqlConfig')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/all', async (ctx, next) => {
  await UserService.getAccount().then(res => {
    ctx.body = res
  })
})

// 登录注册
router.post('/userRegister', async (ctx, next) => {
  let _username = ctx.request.body.username
  let _userpwd = ctx.request.body.userpwd
  if(!_username || !_userpwd) {
    ctx.body = {
      code: '80001',
      mess: '用户名或者密码不能为空',
    }
    return
  }
  let user = {
    username: _username,
    password: _userpwd
  }
  await UserService.findUser(user.username).then(async(res) => {
    if(res.length) {
      try {
        throw Error('用户名已存在')
      } catch (e) {
        console.log(e)
      }
      ctx.body = {
        code: '80003',
        data: 'err',
        mess: '用户名已存在'
      }
    } else {
      await UserService.insertUser([user.username, user.password])
          .then(res => {
            // console.log(res)
            let r = ''
            if(res.affectedRows !== 0) {
              r = 'ok'
              ctx.body = {
                code: '80000',
                data: r,
                mess: '注册成功',
              }
            } else {
              r = 'error'
              ctx.body = {
                code: '80004',
                data: r,
                mess: '注册失败'
              }
            }
          })
          .catch(err => {
            ctx.body = {
              code: '80002',
              data: err
            }
          })
    }
  })
      .catch(err => {
        ctx.body = {
          code: '80002',
          data: err
        }
      })
})


module.exports = router
