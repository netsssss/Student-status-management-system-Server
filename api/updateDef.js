const { pool } = require('../config/db/dbconfig')
const querySQL = require('../config/db/querySQL')

let updateDef = {
    query:(req, res, next) => {
        let from = req.body['from'];
        let result = {};
        let sql = '';
        let sqlParams = [];

        let promise = new Promise(function(resolve){

                switch(from){
        
                    case 'yhgl':
                        sql = querySQL.yhglUpdateSQL;
                        if(req.body['provname'] == '' && req.body['cityname'] == '' && req.body['schoolname'] == '')
                            break;
                        if(req.body['username']!='' && req.body['role']!=''){
                            let name = req.body['username'];
                            let role = req.body['role'];
                            let prov = req.body['provname'];
                            let city = req.body['cityname'];
                            let school = req.body['schoolname'];
                            sqlParams = [role,prov,city,school,name];
                        }
                        break;

                    case 'xjzm':
                        sql = querySQL.xjzmUpdateSQL;
                        if(req.body['role'] != '' && req.body['id_card'] != ''){
                            let role = req.body['role'];
                            let id_card = req.body['id_card'];
                            let status = '';
                            switch(role){
                                case '管理员':
                                    status = '已注册';
                                    break;
                                case '省教育局':
                                    status = '已注册';
                                    break;
                                case '市教育局':
                                    status = '省教育局审核中';
                                    break;
                                case '学校':
                                    status = '市教育局审核中';
                                    break;
                                default:
                                    status = '未注册';
                                    break;
                            }
                            sqlParams = [status,id_card]; 
                        }
                        break;

                    case 'xjyd':
                        if(req.body['role']!='' && req.body['id'] && req.body['ua_id_card']!='' && req.body['ua_type']!='' && req.body['ua_oldmajor']!=''){
                            let role = req.body['role'];
                            let id = req.body['id'];
                            let ua_id_card = req.body['ua_id_card'];
                            let ua_type = req.body['ua_type'];
                            let ua_oldmajor = req.body['ua_oldmajor'];
                            let ua_newmajor = '';
                            if(req.body['ua_newmajor']!=''){
                                ua_newmajor = req.body['ua_newmajor'];
                            }
                            if(role == '市教育局'){
                                sql = querySQL.xjydCityUpdateSQL;
                                let state = '省教育局审核中';
                                sqlParams = [state, id];
                            }
                            if(role == '管理员' || role == '省教育局'){
                                sql = querySQL.xjydProvinceUpdateSQL;
                                let state = '已通过';
                                let date = new Date();
                                let year = date.getFullYear();
                                let month = date.getMonth()+1;
                                let day = date.getDate();
                                let ua_date = year + '-' + month + '-' + day;
                                let ua_major = (ua_newmajor == ''||ua_newmajor == null) ? ua_oldmajor : ua_newmajor;
                                let unusual_action_status = (ua_type == '休学')?'不在籍':'在籍';
                                sqlParams = [state,ua_date,ua_major,unusual_action_status,id,ua_id_card];
                            }
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
                            console.log('update_err:',err.message);
                            result={status:503};
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

module.exports=exports=updateDef;