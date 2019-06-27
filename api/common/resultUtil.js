'use strict';

const c = require('../../config')

/**
 * 结果拼接工具
 */
class ResultUtil {
    constructor() {
        
    }
    /**
     * 成功的返回
     * @param {any} msg 
     */
    SuccessResult(msg) {
        var result = {
            status: c.SUCCESS,
            msg: msg
        }
        return result;
    }
    /**
     * 用户名或密码错误的返回
     */
    UserOrPasswordErrorResult() {
        var result = {
            status: c.USER_OR_PASSWORD_ERROR
        }
        return result;
    }
    /**
     * token验证失败的返回
     */
    TokenCheckErrorResult() {
        var result = {
            status: c.TOKEN_CHECK_ERROR
        }
        return result;
    }
    /**
     * SQL验证错误的返回
     */
    SQLErrorResult() {
        var result = {
            status: c.SQL_ERROR
        }
        return result;
    }
    /**
     * 服务器错误的返回
     */
    ServerErrorResult() {
        var result = {
            status: c.SERVER_ERROR
        }
        return result;
    }
}

module.exports = exports = new ResultUtil;