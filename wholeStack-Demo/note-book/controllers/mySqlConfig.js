let mysql = require('mysql')
let config = require('./defaultConfig')

// 连接线程池
let pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
})

// 统一连接数据库的方法
let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if(err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if(err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release() // 释放连接
                    })
                }
            })
        })
    }
}

// 读取account表的内容
let getAccount = function () {
    let _sql = `select * from account;`
    return allServices.query(_sql)
}

// 用户登录
let userLogin = function(username, password) {
    let _sql = `select * from account where username="${username}" and password="${password}" ;`
    return allServices.query(_sql)
}

// 查找用户
let findUser = function(username) {
    let _sql = `select * from account where username="${username}"`
    return allServices.query(_sql)
}

// 用户注册
let insertUser = function(value) {
    let _sql = `insert into account set username=?,password=?;`
    return allServices.query(_sql, value)
}

// 导出方法
module.exports = {
    getAccount,
    userLogin,
    findUser,
    insertUser
}