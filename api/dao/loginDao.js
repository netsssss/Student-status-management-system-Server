'use strict';

const c = require('../../config')
const BaseDao = require('./baseDao')

/**
 * 登录dao
 */
class LoginDao extends BaseDao {

    constructor() {
        super();
    }
    /**
     * 登录
     * @param {String} sql -sql语句
     * @param {String[]} sqlParams -sql参数
     */
    async login(sql, sqlParams) {

        try{
            return await this.findOne(sql, sqlParams);
        } catch(err) {
            if(err.message == c.QUERY_ERROR)
                throw new Error(c.USER_OR_PASSWORD_ERROR);
        }
    }
}

module.exports = exports = new LoginDao;