'use strict';

const majorDao = require('../dao/majorDao')
const resultUtil = require('../common/resultUtil')
const { majorSchoolRetrieveSQL } = require('../../config/db/querySQL')

/**
 * 专业service
 */
class MajorService {
    constructor() {

    }
    /**
     * 根据学校名字查询该学校所有已选专业id和专业名字
     * @param {any} req 
     */
    async findMajorBySchool(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = majorSchoolRetrieveSQL;

        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += " AND major_id IN ( SELECT major_id FROM ms WHERE school_id IN ( SELECT school_id FROM school WHERE school_name = ? ))"
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try {
            var data = await majorDao.findMajorBySchool(sql, sqlParams);
            for (let i = 0; i < data.length; i++) {
                result.push({
                    majorid: data[i].major_id,
                    majorname: data[i].major_name
                });
            }
            return resultUtil.SuccessResult(result)
        } catch (err) {

        }
    }

}

module.exports = exports = new MajorService;