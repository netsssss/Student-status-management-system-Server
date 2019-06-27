'use strict';

const jwt = require('../api/common/jwt')
const resultUtil = require('../api/common/resultUtil')
const { getToken } = require('../api/common/getToken')

/**
 * 身份验证过滤器
 */
class Filter {
    constructor() {

    }

    /**
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {() => void} next
     */
    async filter(req, res, next) {
        try{
            await jwt.checkToken(getToken(req));
            next();
        } catch(err) {
            res.send(resultUtil.TokenCheckErrorResult());
        }
    }
}

module.exports = exports = new Filter;