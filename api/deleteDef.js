const fs = require('fs')
const { pool } = require('../config/db/dbconfig')
const querySQL = require('../config/db/querySQL')

let deleteDef = {
    query:(req, res, next) => {
        let from = req.query.from;
        let result = {};
        let sql = '';
        let sqlParams = [];

        let promise = new Promise(function(resolve){

                switch(from){
        
                    case 'yhgl':
                        sql = querySQL.yhglDeleteSQL;
                        if(req.query.username!=''){
                            let name = req.query.username;
                            sqlParams = [name];
                        }
                        break;

                    case 'avatar':
                        if(req.query.filename!=''){
                            let name = req.query.filename;
                            fs.unlink('static/upload/'+name, function(err) {
                                if (err) {
                                    result = {status:503};
                                }else{
                                    result = {status:200};
                                }
                                resolve(result);
                            });
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
                            console.log('delete_err:',err.message);
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

module.exports=exports=deleteDef;