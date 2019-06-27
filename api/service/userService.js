'use strict';

const jwt = require('../common/jwt')
const c = require('../../config')
const userDao = require('../dao/userDao')
const resultUtil = require('../common/resultUtil')
const { getToken } = require('../common/getToken')
const { yhglRetrieveSQL } = require('../../config/db/querySQL')

/**
 * 用户service
 */
class UserService {
    constructor() {

    }
    /**
     * 查询所有符合条件的用户的用户名和角色
     * @param {any} req 
     */
    async findAllUser(req) {

        /**
         * 解析token
         */
        var decoded = await jwt.checkToken(getToken(req))

        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = yhglRetrieveSQL;

        if (req.query.username != '') {
            let name = '%' + req.query.username + '%';
            sql += ' and username like ?';
            sqlParams.push(name);
        }
        if (req.query.role != '') {
            let role = req.query.role;
            sql += ' and role = ?';
            sqlParams.push(role);
        }
        if (decoded.role == c.ADMIN) {
            sql += ' and role != "' + c.ADMIN + '"';
        }
        if (decoded.role == c.PROVINCIAL_EDUCATION_BUREAU) {
            sql += ' and role in ("' + c.MUNICIPAL_EDUCATION_BUREAU + '","' + c.SCHOOL + '")';
        }

        /**
         * 查询
         */
        try {
            let data = await userDao.findAllUser(sql, sqlParams);
            for (let i = 0; i < data.length; i++) {
                result.push({
                    username: data[i].username,
                    role: data[i].role
                });
            }
            return resultUtil.SuccessResult(result)
        } catch (err) {

        }
    }
}

module.exports = exports = new UserService;