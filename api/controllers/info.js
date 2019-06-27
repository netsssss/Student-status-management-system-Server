'use strict';

const infoService = require('../service/infoService')
const resultUtil = require('../common/resultUtil')

/**
 * 信息controller
 */
class InfoController {
    constructor() {

    }
    /**
     * 查询所有学生信息
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findInfo(req, res, next) {
        var result;
        try{
            result = await infoService.findInfo(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
    /**
     * 根据学校名字查询该学校所有学生入学年份
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findAdmissionYear(req, res, next) {
        var result;
        try{
            result = await infoService.findAdmissionYear(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
}

module.exports = exports = new InfoController;