'use strict';

/**
 * 总设置
 * @namespace
 */
class BaseConfig {
    constructor() {
        /**
         * HOST
         * @type {String}
         */
        this.HOST = 'http://127.0.0.1:8088/'

        //Return_Value
        /**
         * 成功
         * @type {String}
         */
        this.SUCCESS = '200'
        /**
         * 用户名或密码错误
         * @type {String}
         */
        this.USER_OR_PASSWORD_ERROR = '203'
        /**
         * token验证错误
         * @type {String}
         */
        this.TOKEN_CHECK_ERROR = '204'
        /**
         * 服务器错误
         * @type {String}
         */
        this.SERVER_ERROR = '500'
        /**
         * 数据库错误
         * @type {String}
         */
        this.SQL_ERROR = '503'
        /**
         * 查询错误
         * @type {String}
         */
        this.QUERY_ERROR = '504'

        //role
        /**
         * 管理员
         * @type {String}
         */
        this.ADMIN = '管理员'
        /**
         * 省教育局
         * @type {String}
         */
        this.PROVINCIAL_EDUCATION_BUREAU = '省教育局'
        /**
         * 市教育局
         * @type {String}
         */
        this.MUNICIPAL_EDUCATION_BUREAU = '市教育局'
        /**
         * 学校
         * @type {String}
         */
        this.SCHOOL = '学校'

    }
    
}

module.exports = exports = new BaseConfig;