'use strict';

const BaseDao = require('./baseDao')

/**
 * 地区dao
 */
class MajorDao extends BaseDao {
    constructor() {
        super();
    }
    /**
     * 根据学校名字查询该学校所有已选专业id和专业名字
     * @param {string} sql
     * @param {string[]} sqlParams
     */
    async findMajorBySchool(sql, sqlParams) {
        return await this.findAll(sql, sqlParams);
    }
}

module.exports = exports = new MajorDao;