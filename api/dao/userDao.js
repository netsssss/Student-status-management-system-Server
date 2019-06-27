'use strict';

const BaseDao = require('./baseDao')

/**
 * 用户dao
 */
class UserDao extends BaseDao {
    constructor() {
        super();
    }
    /**
     * 查询所有符合条件的用户的用户名和角色
     * @param {string} sql
     * @param {string[]} sqlParams
     */
    async findAllUser(sql, sqlParams) {
        return await this.findAll(sql, sqlParams);
    }
}

module.exports = exports = new UserDao;