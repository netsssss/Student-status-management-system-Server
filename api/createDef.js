const md5 = require('./common/md5')
const { pool } = require('../config/db/dbconfig')
const querySQL = require('../config/db/querySQL')

let createDef = {
    query:(req, res, next) => {
        let from = req.body['from'];
        let result = {};
        let sql = '';
        let sqlParams = [];

        let promise = new Promise(function(resolve){

                switch(from){
                    //judge
                    case 'yhgl':
                        sql = querySQL.yhglCreateSQL;
                        if(req.body['username']!='' && req.body['password']!='' && req.body['role']!=''){
                            let name = req.body['username'];
                            let password = md5.useMD5(req.body['password']+md5.MD5_PRIVATE_KEY);
                            let role = req.body['role'];
                            let province = req.body['provname'] || '';
                            let city = req.body['cityname'] || '';
                            let school = req.body['schoolname'] || '';
                            sqlParams = [name,password,role,province,city,school];
                        }
                        break;

                    case 'zyk':
                        sql = querySQL.zykCreateSQL;
                        if(req.body['majorid']!='' && req.body['majorname']!=''){
                            let id = req.body['majorid'];
                            let name = req.body['majorname'];
                            sqlParams = [id,name];
                        }
                        break;
                    
                    case 'zygl':
                        sql = querySQL.zyglCreateSQL;
                        if(req.body['majorid']!='' && req.body['username']!=''){
                            let id = req.body['majorid'];
                            let name = req.body['username'];
                            sqlParams = [id,name];
                        }
                        break;

                    case 'xsxx':
                        sql = querySQL.xsxxCreateSQL;
                        if(req.body['name']!='' && req.body['sex']!='' && req.body['imageUrl']!='' && req.body['id_card']!='' && req.body['birth']!='' && req.body['school']!='' && req.body['major']!='' && req.body['birthplace']!='' && req.body['birthplace_detail']!='' && req.body['regist']!='' && req.body['unusual_action']!=''){
                            let name = req.body['name'];
                            let sex = req.body['sex'];
                            let imageUrl = req.body['imageUrl'];
                            let id_card = req.body['id_card'];
                            let birth = req.body['birth'];
                            let school = req.body['school'];
                            let major = req.body['major'];
                            let birthplace = req.body['birthplace'].toString();
                            let birthplace_detail = req.body['birthplace_detail'];
                            let regist = req.body['regist'];
                            let unusual_action = req.body['unusual_action'];
                            sqlParams = [name,sex,imageUrl,id_card,birth,school,major,birthplace,birthplace_detail,regist,unusual_action];
                        }
                        break;

                    case 'xjyd':
                        sql = querySQL.xjydCreateSQL;
                        if(req.body['ua_id_card']!='' && req.body['ua_type']!='' && req.body['ua_date']!='' && req.body['ua_state']!=''){
                            let ua_id_card = req.body['ua_id_card'];
                            let ua_type = req.body['ua_type'];
                            let ua_date = req.body['ua_date'];
                            let ua_state = req.body['ua_state'];
                            let ua_describe = '';
                            if(req.body['ua_describe']){
                                ua_describe = req.body['ua_describe'];
                            }
                            let ua_oldmajor = '';
                            let ua_newmajor = '';
                            if(req.body['ua_oldmajor']!=''&&req.body['ua_newmajor']!=''){
                                ua_oldmajor = req.body['ua_oldmajor'];
                                ua_newmajor = req.body['ua_newmajor'];
                            }
                            sqlParams = [ua_id_card,ua_type,ua_date,ua_state,ua_describe,ua_oldmajor,ua_newmajor];
                        }
                        break;
        
                    default:
                        console.log('from_err');
                        result = {status:500};
                        resolve(result);
                        break;
                }
                
                pool.getConnection(function(err,conn){
                    if(err){
                        console.log('pool_err:',err);
                        result = {status:500};
                        conn.release();//释放链接
                        resolve(result);
                    }
                    conn.query(sql,sqlParams,function(err,data){
                        if(err){
                            console.log('create_err:',err.message);
                            result={status:503};
                            if(err.code == 'ER_DUP_ENTRY'){
                                result={status:205};
                            }
                            if(err.code == 'ER_PARSE_ERROR'){
                                result={status:206};
                            }
                        }else{
                            result = {status:200,msg:data.insertId};
                        }
                        conn.release();//释放链接
                        resolve(result);
                    });
                });

        });
        
        promise.then((value) => {
            res.send(value);
            return;
        });
    }
}

module.exports=exports=createDef;