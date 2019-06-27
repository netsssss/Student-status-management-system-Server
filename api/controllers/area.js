'use strict';

const c = require('../../config')
const areaService = require('../service/areaService')
const resultUtil = require('../common/resultUtil')

/**
 * 地区controller
 */
class AreaController {
    constructor() {

    }
    /**
     * 查询所有省
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findAllProvince(req, res, next) {
        var result;
        try{
            result = await areaService.findAllProvince(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
    /**
     * 查询所有市
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findAllCity(req, res, next) {
        var result;
        try{
            result = await areaService.findAllCity(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
    /**
     * 查询所有学校
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findAllSchool(req, res, next) {
        var result;
        try{
            result = await areaService.findAllSchool(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
    /**
     * 根据用户名查询归属地
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findBelongAreaByUser(req, res, next) {
        var result;
        try{
            result = await areaService.findBelongAreaByUser(req);
        } catch(err) {
            if(err.message == c.QUERY_ERROR)
                result = resultUtil.SuccessResult({rolename:''});
        }
        res.send(result);
    }
}

module.exports = exports = new AreaController;

// UnitTest
// var l = new AreaController;
// var req = {
//     query: {
//         username: 'haha'
//     },
// }
// l.findBelongAreaByUser(req).then((res) => {
//     console.log(res)
// })