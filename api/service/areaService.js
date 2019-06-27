'use strict';

const c = require('../../config')
const areaDao = require('../dao/areaDao')
const resultUtil = require('../common/resultUtil')
const { provinceRetrieveSQL, cityRetrieveSQL, schoolRetrieveSQL, belongAreaRetrieveSQL } = require('../../config/db/querySQL')

/**
 * 地区service
 */
class AreaService {
    constructor() {

    }
    /**
     * 查询所有省
     * @param {any} req 
     */
    async findAllProvince(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = provinceRetrieveSQL;

        /**
         * 查询
         */
        try{
            var data = await areaDao.findAllProvince(sql, sqlParams);
            for(let i = 0; i < data.length; i++){
                result.push({
                    provname:data[i].province_name,
                });
            }
            return resultUtil.SuccessResult(result)
        } catch(err) {

        }
    }

    /**
     * 查询所有市
     * @param {any} req 
     */
    async findAllCity(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = cityRetrieveSQL;

        if(req.query.provname!=''){
            var name = req.query.provname;
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try{
            var data = await areaDao.findAllCity(sql, sqlParams);
            for(let i = 0; i < data.length; i++){
                result.push({
                    cityname:data[i].city_name,
                    value:data[i].city_name,
                    label:data[i].city_name
                });
            }
            return resultUtil.SuccessResult(result)
        } catch(err) {

        }
    }

    /**
     * 查询所有学校
     * @param {any} req 
     */
    async findAllSchool(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = schoolRetrieveSQL;

        if(req.query.cityname!=''){
            var name = req.query.cityname;
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try{
            var data = await areaDao.findAllSchool(sql, sqlParams);
            for(let i = 0; i < data.length; i++){
                result.push({
                    schoolname:data[i].school_name,
                });
            }
            return resultUtil.SuccessResult(result)
        } catch(err) {

        }
    }

    /**
     * 根据用户名查询归属地
     * @param {any} req 
     */
    async findBelongAreaByUser(req) {
        /**
         * 拼接sql
         */
        let sql = '';
        let sqlParams = [];
        let result = [];
        sql = belongAreaRetrieveSQL;

        if(req.query.username!=''){
            var name = req.query.username;
            sqlParams.push(name);
        }

        /**
         * 查询
         */
        try{
            var data = await areaDao.findBelongAreaByUser(sql, sqlParams);
            switch (data.role) {
                case c.ADMIN:
                    result.push({
                        rolename:data.role,
                    });
                    break;
                case c.PROVINCIAL_EDUCATION_BUREAU:
                    result.push({
                        rolename:data.belongprov,
                    });
                    break;
                case c.MUNICIPAL_EDUCATION_BUREAU:
                    result.push({
                        rolename:data.belongcity,
                    });
                    break;
                case c.SCHOOL:
                    result.push({
                        rolename:data.belongschool,
                    });
                    break;

                default:
                    break;
            }
            
            return resultUtil.SuccessResult(result)
        } catch(err) {
            throw new Error(err.message);
        }
    }
}


module.exports = exports = new AreaService;

// UnitTest
// var a = new AreaService;
// var req = {
//     query: {
//         username: 'city3',
//     },
// }
// a.findBelongAreaByUser(req).then((res) => {
//     console.log(res);
// });