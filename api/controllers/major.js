'use strict';

const majorService = require('../service/majorService')
const resultUtil = require('../common/resultUtil')

/**
 * 专业controller
 */
class MajorController {
    constructor() {

    }
    /**
     * 根据学校名字查询该学校所有已选专业id和专业名字
     * @param {any} req
     * @param {{ send: (arg0: { status: string; }) => void; }} res
     * @param {any} next
     */
    async findMajorBySchool(req, res, next) {
        var result;
        try{
            result = await majorService.findMajorBySchool(req);
        } catch(err) {
            result = resultUtil.ServerErrorResult();
        }
        res.send(result);
    }
}

module.exports = exports = new MajorController;