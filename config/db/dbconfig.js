'use strict';

const mysql = require('mysql')
const c = require('../../config')

/**
 * 连接池
 */
var pool = mysql.createPool({
    host:'127.0.0.1', //替换自己的服务器地址
    user:'root',
    password:'password', //替换自己的密码
    database:'nodedb',
    port:3306
});

/**
 * 获得一个连接
 * @returns {Promise}
 */
async function getConn() {
    var conn = await new Promise((resolve, reject) => {
        pool.getConnection(function(err,conn){
            if(err){
                console.log('pool err:',err);
                conn.release(); //释放链接
                reject(c.SERVER_ERROR);
            }
            resolve(conn);
        });
    });
    return conn;
}

module.exports = exports = {
    pool,
    getConn
}