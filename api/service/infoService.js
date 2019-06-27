'use strict';

const infoDao = require('../dao/infoDao')
const resultUtil = require('../common/resultUtil')
const { xxtjRetrieveSQL, admissionYearRetrieveSQL } = require('../../config/db/querySQL')

/**
 * 信息service
 */
class InfoService {
    constructor() {

    }
    /**
     * 根据学校名字查询该学校所有学生入学年份
     * @param {any} req 
     */
    async findInfo(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = xxtjRetrieveSQL;

        if (req.query.provname != '') {
            let provname = req.query.provname;
            sql += ' AND birthplace = ?'
            sqlParams.push(provname);
        }
        if (req.query.cityname != '') {
            let cityname = req.query.cityname;
            sql += ' AND cityname = ?'
            sqlParams.push(cityname);
        }
        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }
        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }
        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }
        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }
        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try {
            var data = await infoDao.findAdmissionYear(sql, sqlParams);
            for (let i = 0; i < data.length; i++) {
                result.push({
                    year: data[i].year,
                });
            }
            return resultUtil.SuccessResult(result)
        } catch (err) {

        }
    }
    /**
     * 根据学校名字查询该学校所有学生入学年份
     * @param {any} req 
     */
    async findAdmissionYear(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = admissionYearRetrieveSQL;

        if (req.query.schoolname != '') {
            let name = req.query.schoolname;
            sql += ' AND school = ?'
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try {
            var data = await infoDao.findAdmissionYear(sql, sqlParams);
            for (let i = 0; i < data.length; i++) {
                result.push({
                    year: data[i].year,
                });
            }
            return resultUtil.SuccessResult(result)
        } catch (err) {

        }
    }
}

module.exports = exports = new InfoService;