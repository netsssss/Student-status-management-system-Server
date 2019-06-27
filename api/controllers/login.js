'use strict';

const c = require('../../config')
const loginService = require('../service/loginService')
const resultUtil = require('../common/resultUtil')

/**
 * 登录controller
 */
class LoginController {
    constructor() {

    }
    /**
     * 登录
     * @param {any} req
     * @param {{ send: { (arg0: { status: string; msg: any; }): void; (arg0: {}): void; }; }} res
     * @param {any} next
     */
    async login(req, res, next) {

        try{
            res.send(await loginService.checkLoginStatus(req));
            return;
        } catch(err) {

        }

        var result;

        try{
            result = await loginService.login(req);
        } catch(err) {
            if(err.message == c.USER_OR_PASSWORD_ERROR){
                result = resultUtil.UserOrPasswordErrorResult();
            }
            else {
                console.log('login_err:', err);
            }
        }
        
        res.send(result);
        return;
    }
}

module.exports = exports = new LoginController;

// UnitTest
// var l = new LoginController;
// var tok = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjcuMC4wLjE6ODA4OCIsInVzZXJuYW1lIjoidGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0NDY5NjQxNywiZXhwIjoxNTQ0NzAzNjE3fQ.IfoAPMdavGzd6jqdb_lR1nBKvXV76k6i8LlON42gHepis49nizqZjAZ_IWCGZcgu-5QbaL-uDFGPG47N8jYN3NciPE5nGJcrcxSvP_FQYH0ivKgrTW3_WaAF2Wr1UAgOr4alfBbyZ0-vxCMdUbK6IAMxeP5VsPkcOVXahrOS2CCx1D4brNDEn7E-L4Gk4cWjncCufVqY0HTqxejBpaU_70bCNnJ4-A4LZRcBhcv2oOrD3J3sI08EMEFyL1ikwlmhw5sNERSMK2HYa1NwI9vgOdAW9fY6H_6VC5mNB6Cz4tZ9QoRrJHdya9LG9eSwdZy9Mt53hljVE5FkYwe7U9iBAw';
// var req = {
//     query: {
//         username: 'admin',
//         password: '1',
//     },
//     headers: {
//         access_token: tok
//     }
// }
// l.login(req).then((res) => {
//     console.log(res)
// })