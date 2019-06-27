const crypto = require('crypto');

/**
 * md5转码秘钥
 * @type {String}
 * @private
 */
var MD5_PRIVATE_KEY = '( ゜- ゜)つロ 干杯~bilibili';

/**
 * md5加密
 */
class MD5 {
    constructor() {
        
    }
    /**
     * 使用md5加密
     * @param {string} str
     */
    useMD5(str) {
        var obj = crypto.createHash('md5');
        obj.update(str + MD5_PRIVATE_KEY);
        return obj.digest('hex');
    }
}

// UnitTest
// var m = new MD5;
// m.useMD5('1');

module.exports = exports = new MD5;