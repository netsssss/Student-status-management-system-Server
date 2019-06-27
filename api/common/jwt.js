'use strict';

const jwt = require('jsonwebtoken')
const fs = require('fs')
const c = require('../../config')

// 获取签发 JWT 时需要用的密钥
const privateKey = fs.readFileSync('./config/key/private.key');
// 获取验证 JWT 时需要用的公钥
const publicKey = fs.readFileSync('./config/key/public.key');

/**
 * jwt加密
 */
class Jwt {
    constructor() {

    }
    /**
     * 签发token
     * @param {any} payload 
     * @returns {String}
     */
    createToken(payload) {
        const tokenRS256 = jwt.sign(payload,privateKey,{ algorithm: 'RS256', expiresIn: 60 * 60 * 2 });
        console.log('Created a new token');
        return tokenRS256;
    }
    /**
     * 检查token
     * @param {String} token 
     * @returns {Promise}
     */
    async checkToken(token) {
        var decoded = jwt.verify(token, publicKey, (error, decoded) => {
            if(error){
                console.log('Check token error:',error.message);
                throw new Error(c.TOKEN_CHECK_ERROR);
            }else{
                // console.log('Token status is normal');
                return decoded;
            }
        })
        return decoded;
    }
}

module.exports = exports = new Jwt;

// UnitTest
// let payload = {
//     "iss":"127.0.0.1:8088",
//     "username":"test",
//     "role":"admin"
// }

// var tok = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjcuMC4wLjE6ODA4OCIsInVzZXJuYW1lIjoibm9fdXNlciIsInJvbGUiOiJub19yb2xlIiwiaWF0IjoxNTQ0NjgzODQ1LCJleHAiOjE1NDQ2OTEwNDV9.MFDt7NFgDcW25_GUVKW8-nf_YkAFsmij6zWqPF5anf-tN-jz5Tyt_yKyunGhR2Dy6ax4baXVmqnDaCkWGs3vqKQXaXARhkgLL1aP-fHL0R4apwK059xoAAtYDz6JdIMcW4-irPgK_ZuMoWMCVq4Fce9xrvX2aqy0rgQcdAtQDVjLggeMg7XApo9eWF-aOpuXIzvjtH6OAPCmlE5Imvs565tE-pvNMBBpeP-OcGYhAmTijBx0RVcA1PGjrPpF1tkrbxySiJspLMqT45rkYatzx2uGkBV1kO3FwIl5HHHSky3gq25vB9YKo_ECyZaefanpC3P9FoQHl_9dz4OarBIi2A';

// var j = new Jwt;
// var r = j.createToken(payload)
// console.log(r)

// check.checkToken(tok, function(ok){
//     console.log(ok);
// });