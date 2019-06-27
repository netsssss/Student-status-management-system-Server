'use strict';

const jwt = require('../common/jwt')
const md5 = require('../common/md5')
const c = require('../../config')
const loginDao = require('../dao/loginDao')
const resultUtil = require('../common/resultUtil')
const { loginSQL } = require('../../config/db/querySQL')
const { getToken } = require('../common/getToken')

/**
 * 登录service
 */
class LoginService {
    constructor() {

    }
    
    /**
     * 检查登录状态
     * @param {any} req 
     */
    async checkLoginStatus(req) {
        try{
            await jwt.checkToken(getToken(req))

            return resultUtil.SuccessResult({
                token: getToken(req)
            });
        } catch(err) {
            throw new Error(c.TOKEN_CHECK_ERROR);
        }
    }

    /**
     * 登陆
     * @param {any} req
     */
    async login(req) {
    
        var payload = {
            "iss": c.HOST,
            "username": "",
            "role": ""
        }
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = loginSQL;
        sqlParams = [];

        if(req.query.username!=''){
            var name = req.query.username;
            sqlParams.push(name);
        }
        if(req.query.password!=''){
            var password = md5.useMD5(req.query.password);
            sqlParams.push(password);
        }

        /**
         * 查询
         */
        try{
            var data = await loginDao.login(sql, sqlParams);
            payload.username = data.username;
            payload.role = data.role;
            console.log('login_success');
            return resultUtil.SuccessResult({
                token: jwt.createToken(payload)
            })
        } catch(err) {
            throw new Error(c.USER_OR_PASSWORD_ERROR);
        }
    }
}

module.exports = exports = new LoginService;

// UnitTest
// req.headers.access_token
// var tok = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjcuMC4wLjE6ODA4OCIsInVzZXJuYW1lIjoidGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0NDY5NjQxNywiZXhwIjoxNTQ0NzAzNjE3fQ.IfoAPMdavGzd6jqdb_lR1nBKvXV76k6i8LlON42gHepis49nizqZjAZ_IWCGZcgu-5QbaL-uDFGPG47N8jYN3NciPE5nGJcrcxSvP_FQYH0ivKgrTW3_WaAF2Wr1UAgOr4alfBbyZ0-vxCMdUbK6IAMxeP5VsPkcOVXahrOS2CCx1D4brNDEn7E-L4Gk4cWjncCufVqY0HTqxejBpaU_70bCNnJ4-A4LZRcBhcv2oOrD3J3sI08EMEFyL1ikwlmhw5sNERSMK2HYa1NwI9vgOdAW9fY6H_6VC5mNB6Cz4tZ9QoRrJHdya9LG9eSwdZy9Mt53hljVE5FkYwe7U9iBAw';
// var req = {
//     query: {
//         username: 'test',
//         password: '123456',
//     },
//     headers: {
//         access_token: tok
//     }
// }
// checkLoginStatus(req);
// login(req);