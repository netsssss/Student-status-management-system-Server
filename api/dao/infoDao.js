'use strict';

const BaseDao = require('./baseDao')

/**
 * 信息dao
 */
class InfoDao extends BaseDao {
    constructor() {
        super();
    }
    /**
     * 根据学校名字查询该学校所有学生入学年份
     * @param {string} sql
     * @param {string[]} sqlParams
     */
    async findAdmissionYear(sql, sqlParams) {
        return await this.findAll(sql, sqlParams);
    }
}

module.exports = exports = new InfoDao;