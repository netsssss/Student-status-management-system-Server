'use strict';

module.exports = exports = {

    /**
     * 返回token
     * @param {any} req 
     * @returns {String}
     */
    getToken: (req) => {
        return req.headers.access_token;
    }
}