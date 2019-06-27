const md5 = require('./common/md5')
const tokenlib = require('./common/jwt')
const { pool } = require('../config/db/dbconfig')
const querySQL = require('../config/db/querySQL')

let retrieveDef = {
    query:(req, res, next) => {
        let reqtoken = req.headers.access_token;
        let from = req.query.from;
        let result = {};
        let sql = '';
        let sqlParams = [];
        let cantlogerr = false;

        let payload = {
            "iss":"127.0.0.1:8088",
            "username":"no_user",
            "role":"no_role"
        }

        let promise = new Promise(function(resolve){
            tokenlib.checkToken(reqtoken).then(function(ok) {
                if(ok == false && from != 'login'){
                    result={status:204};
                    resolve(result);
                } 

                if(ok != false && from == 'login'){
                    result={status:200,msg:{
                        token:reqtoken,
                    }};
                    console.log('login_check_token:','return oldtoken');
                    resolve(result);
                }
                //judge
                switch(from){
                    case 'login':
                        sql = querySQL.loginSQL;
                        if(req.query.username!=''){
                            let name = req.query.username;
                            sqlParams.push(name);
                        }
                        if(req.query.password!=''){
                            let password = md5.useMD5(req.query.password);
                            sqlParams.push(password);
                        }
                        break;

                    case 'province':
                        sql = querySQL.provinceRetrieveSQL;
                        break;

                    case 'city':
                        sql = querySQL.cityRetrieveSQL;
                        if(req.query.provname!=''){
                            let name = req.query.provname;
                            sqlParams.push(name);
                        }
                        break;

                    case 'school':
                        sql = querySQL.schoolRetrieveSQL;
                        if(req.query.cityname!=''){
                            let name = req.query.cityname;
                            sqlParams.push(name);
                        }
                        break;

                    case 'roleuser':
                        if(req.query.role!='' && req.query.username!=''){
                            let role = req.query.role;
                            let name = req.query.username;
                            switch(role){
                                case '管理员':
                                    console.log('is admin,so role->user query is empty throw an err');
                                    cantlogerr = true;
                                    break;
                                case '省教育局':
                                    sql = querySQL.provinceUserRetrieveSQL;
                                    break;
                                case '市教育局':
                                    sql = querySQL.cityUserRetrieveSQL;
                                    break;
                                case '学校':
                                    sql = querySQL.schoolUserRetrieveSQL;
                                    break;
                            }
                            sqlParams.push(name);
                        }
                        break;

                    case 'majorschool':
                        sql = querySQL.majorSchoolRetrieveSQL;
                        if(req.query.schoolname!=''){
                            let name = req.query.schoolname;
                            sqlParams.push(name);
                        }
                        break;
        
                    case 'yhgl':
                        sql = querySQL.yhglRetrieveSQL;
                        if(req.query.username!=''){
                            let name = '%'+req.query.username+'%';
                            sql += ' and username like ?';
                            sqlParams.push(name);
                        }
                        if(req.query.role!=''){
                            let role = req.query.role;
                            sql += ' and role = ?';
                            sqlParams.push(role);
                        }
                        if(ok.role == '管理员'){
                            sql += ' and role != "管理员"';
                        }
                        if(ok.role == '省教育局'){
                            sql += ' and role in ("市教育局","学校")';
                        }
                        break;
                    
                    case 'yhgs':
                        sql = querySQL.yhgsRetrieveSQL;
                        if(req.query.username!=''){
                            let name = '%'+req.query.username+'%';
                            sql += ' and username like ?';
                            sqlParams.push(name);
                        }
                        if(req.query.role!=''){
                            let role = req.query.role;
                            sql += ' and role = ?';
                            sqlParams.push(role);
                        }
                        if(req.query.provname!=''){
                            let provname = req.query.provname;
                            sql += ' and belongprov = ?';
                            sqlParams.push(provname);
                        }
                        if(ok.role == '管理员'){
                            sql += ' and role != "管理员"';
                        }
                        if(ok.role == '省教育局'){
                            sql += ' and role in ("市教育局","学校")';
                        }
                        break;

                    case 'zyk':
                        sql = querySQL.zykRetrieveSQL;
                        if(req.query.majorid!=''){
                            let id = req.query.majorid+'%';
                            sql += ' and major_id like ?';
                            sqlParams.push(id);
                        }
                        if(req.query.majorname!=''){
                            let name = '%'+req.query.majorname+'%';
                            sql += ' and major_name like ?';
                            sqlParams.push(name);
                        }
                        break;
                    
                    case 'zygl':
                        sql = querySQL.zyglRetrieveSQL;
                        if(req.query.username!=''){
                            let name = req.query.username;
                            sqlParams.push(name);
                        }
                        break;

                    case 'xsxx':
                        sql = querySQL.xsxxRetrieveSQL;
                        if(req.query.rolename!='' && req.query.role!=''){
                            let rolename = req.query.rolename;
                            let role = req.query.role;
                            switch(role){
                                case '省教育局':
                                    sql += ' and school IN ( SELECT school_name FROM school WHERE area_name = ? )';
                                    break;
                                case '市教育局':
                                    sql += ' and school IN ( SELECT school_name FROM school WHERE area_name = ? )';
                                    rolename = rolename.split(',')[0];
                                    break;
                                case '学校':
                                    sql += ' and school = ?';
                                    break;
                            }
                            sqlParams.push(rolename);
                        }
                        if(req.query.id_card!=''){
                            let id_card = req.query.id_card;
                            sql += ' and id_card = ?';
                            sqlParams.push(id_card);
                        }
                        if(req.query.name!=''){
                            let name = '%' + req.query.name + '%';
                            sql += ' and name like ?';
                            sqlParams.push(name);
                        }
                        break;
                    
                    case 'xjyd':
                        sql = querySQL.xjydRetrieveSQL;
                        if(req.query.id!=''){
                            let id = req.query.id;
                            sql += ' and id = ?';
                            sqlParams.push(id);
                        }
                        if(req.query.id_card!=''){
                            let id_card = req.query.id_card;
                            sql += ' and id_card = ?';
                            sqlParams.push(id_card);
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
                            if(!cantlogerr){
                                console.log('retrieve_err:',err.message);
                            }
                            result={status:503};
                        }else{
                            //judge
                            switch(from){

                                case 'login':
                                    if(data.length>0){
                                        payload.username = data[0].username;
                                        payload.role = data[0].role;
                                        let localtoken = tokenlib.createToken(payload);
                                        result={status:200,msg:{
                                            token:localtoken,
                                        }};
                                        console.log('login_success');
                                    }else{
                                        result={status:203};
                                    }
                                    break;

                                case 'province':
                                    let provnames = [];
                                    for(let i = 0; i < data.length; i++){
                                        provnames.push({
                                            provname:data[i].province_name,
                                        });
                                    }
                                    result = {status:200,msg:provnames}
                                    break;

                                case 'city':
                                    let citynames = [];
                                    for(let i = 0; i < data.length; i++){
                                        citynames.push({
                                            cityname:data[i].city_name,
                                            value:data[i].city_name,
                                            label:data[i].city_name
                                        });
                                    }
                                    result = {status:200,msg:citynames}
                                    break;

                                case 'school':
                                    let schoolnames = [];
                                    for(let i = 0; i < data.length; i++){
                                        schoolnames.push({
                                            schoolname:data[i].school_name,
                                        });
                                    }
                                    result = {status:200,msg:schoolnames}
                                    break;

                                case 'roleuser':
                                    let roleusernames = [];
                                    for(let i = 0; i < data.length; i++){
                                        if(data[i].belongschool!=null){
                                            roleusernames.push({
                                                rolename:data[i].belongschool,
                                        });
                                        }else if(data[i].belongcity!=null){
                                            roleusernames.push({
                                                rolename:data[i].belongprov+','+data[i].belongcity,
                                        });
                                        }else if(data[i].belongprov!=null){
                                            roleusernames.push({
                                                rolename:data[i].belongprov,
                                        });
                                        } 
                                    }
                                    result = {status:200,msg:roleusernames}
                                    break;

                                case 'majorschool':
                                    let majorschoolnames = [];
                                    for(let i = 0; i < data.length; i++){
                                        majorschoolnames.push({
                                            majorid:data[i].major_id,
                                            majorname:data[i].major_name
                                        });
                                    }
                                    result = {status:200,msg:majorschoolnames}
                                    break;

                                case 'yhgl':
                                    let yhgldata = [];
                                    for(let i = 0; i < data.length; i++){
                                        yhgldata.push({
                                            username:data[i].username,
                                            role:data[i].role
                                        });
                                    }
                                    result = {status:200,msg:yhgldata}
                                    break;
                                
                                case 'yhgs':
                                    let yhgsdata = [];
                                    for(let i = 0; i < data.length; i++){
                                        yhgsdata.push({
                                            username:data[i].username,
                                            role:data[i].role,
                                            provname:data[i].belongprov,
                                            cityname:data[i].belongcity,
                                            schoolname:data[i].belongschool
                                        });
                                    }
                                    result = {status:200,msg:yhgsdata}
                                    break;
                                
                                case 'zyk':
                                    let zykdata = [];
                                    for(let i = 0; i < data.length; i++){
                                        zykdata.push({
                                            majorid:data[i].major_id,
                                            majorname:data[i].major_name,
                                            disabled:false
                                        });
                                    }
                                    result = {status:200,msg:zykdata}
                                    break;

                                case 'zygl':
                                    let zygldata = [];
                                    for(let i = 0; i < data.length; i++){
                                        zygldata.push({
                                            majorid:data[i].major_id,
                                            majorname:data[i].major_name
                                        });
                                    }
                                    result = {status:200,msg:zygldata}
                                    break;

                                case 'xsxx':
                                    let xsxxdata = [];
                                    for(let i = 0; i < data.length; i++){
                                        xsxxdata.push({
                                            name:data[i].name,
                                            sex:data[i].sex,
                                            imageUrl:data[i].imageUrl,
                                            id_card:data[i].id_card,
                                            birth:data[i].birth,
                                            school:data[i].school,
                                            major:data[i].major,
                                            birthplace:data[i].birthplace,
                                            birthplace_detail:data[i].birthplace_detail,
                                            regist:data[i].regist,
                                            unusual_action:data[i].unusual_action,
                                        });
                                    }
                                    result = {status:200,msg:xsxxdata}
                                    break;

                                case 'xjyd':
                                    let xjyddata = [];
                                    for(let i = 0; i < data.length; i++){
                                        xjyddata.push({
                                            ua_id:data[i].id,
                                            ua_id_card:data[i].id_card,
                                            ua_type:data[i].ua_type,
                                            ua_date:data[i].ua_date,
                                            ua_state:data[i].ua_state,
                                            ua_describe:data[i].ua_describe,
                                            ua_oldmajor:data[i].old_major,
                                            ua_newmajor:data[i].new_major
                                        });
                                    }
                                    result = {status:200,msg:xjyddata}
                                    break;

                                default:
                                    console.log('query_from_err');
                                    result = {status:500};
                                    break;
                            }
                        }
                        conn.release();//释放链接
                        resolve(result);
                    });
                });

            });
        });
        
        promise.then((value) => {
            res.send(value);
            return;
        });
    }
}

module.exports=exports=retrieveDef;