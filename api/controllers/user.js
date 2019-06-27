'use strict';

const userService = require('../service/userService')
const resultUtil = require('../common/resultUtil')

/**
 * 用户controller
 */
class UserController {
    constructor() {

    }
    /**
     * 查询所有符合条件的用户的用户名和角色
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findAllUser(req, res, next) {
        var result;
        try{
            result = await userService.findAllUser(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
}

module.exports = exports = new UserController;