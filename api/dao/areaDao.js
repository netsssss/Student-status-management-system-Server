'use strict';

const BaseDao = require('./baseDao')

/**
 * 地区dao
 */
class AreaDao extends BaseDao {
    constructor() {
        super();
    }
    /**
     * 查询所有省
     * @param {String} sql 
     * @param {String[]} sqlParams 
     */
    async findAllProvince(sql, sqlParams){
        return await this.findAll(sql, sqlParams);
    }
    /**
     * 查询所有市
     * @param {String} sql 
     * @param {String[]} sqlParams 
     */
    async findAllCity(sql, sqlParams){
        return await this.findAll(sql, sqlParams);
    }
    /**
     * 查询所有学校
     * @param {String} sql 
     * @param {String[]} sqlParams 
     */
    async findAllSchool(sql, sqlParams){
        return await this.findAll(sql, sqlParams);
    }
    /**
     * 根据用户名查询归属地
     * @param {String} sql 
     * @param {String[]} sqlParams 
     */
    async findBelongAreaByUser(sql, sqlParams){
        return await this.findOne(sql, sqlParams);
    }
}

module.exports = exports = new AreaDao;