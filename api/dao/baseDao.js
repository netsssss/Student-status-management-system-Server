'use strict';

const { getConn } = require('../../config/db/dbconfig')
const { SQL_ERROR, QUERY_ERROR } = require('../../config')

/**
 * 查询基类
 */
class BaseDao {
    constructor() {

    }
    /**
     * 查询一个
     * @param {String} sql -sql语句
     * @param {String[]} sqlParams -sql参数
     * @returns {Promise}
     */
    async findOne(sql, sqlParams) {
        try{
            var conn = await getConn();
            var data = await new Promise((resolve, reject) => {
                conn.query(sql, sqlParams,
                    /**
                     * @param {{ message: any; }} err
                     * @param {{ length: number; }} data
                     */
                    (err, data) => {
                        if(err){
                            console.log('SQL:'+sql+',sqlParams:'+sqlParams)
                            console.log('SQL_ERROR:',err.message);
                            reject(SQL_ERROR);
                        } else {
                            if(data.length > 0) {
                                resolve(data[0]);
                            }else{
                                reject(QUERY_ERROR);
                            }
                        }
                    }
                );
            });
            conn.release();
            return data;
        } catch(err) {
            throw new Error(err);
        }
    }
    /**
     * 查询所有
     * @param {String} sql -sql语句
     * @param {String[]} sqlParams -sql参数
     * @returns {Promise}
     */
    async findAll(sql, sqlParams) {
        try{
            var conn = await getConn();
            var data = await new Promise((resolve, reject) => {
                conn.query(sql, sqlParams, 
                    /**
                     * @param {{ message: any; }} err
                     * @param {{ length: number; }} data
                     */
                    (err,data) => {
                        if(err){
                            console.log('SQL:'+sql+', sqlParams:'+sqlParams)
                            console.log('SQL_ERROR:',err.message);
                            reject(SQL_ERROR);
                        } else {
                            if(data.length > 0) {
                                resolve(data);
                            }else{
                                reject(QUERY_ERROR);
                            }
                        }
                    }
                );
            });
            conn.release();
            return data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = exports = BaseDao;