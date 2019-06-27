'use strict';

const mysql = require('mysql')
const c = require('../../config')

/**
 * 连接池
 */
var pool = mysql.createPool({
    host:'47.94.159.148',
    user:'root',
    password:'123456',
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