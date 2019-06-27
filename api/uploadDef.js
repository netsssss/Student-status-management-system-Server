const pathlib = require('path')
const fs = require('fs')
const { HOST } = require('../config')

let uploadDef = {
    query(req, res, next){
        let result = {};
        let resultName = '';

        let promise = new Promise(function(resolve){

            var newName = req.files[0].path+pathlib.parse(req.files[0].originalname).ext;

            fs.rename(req.files[0].path, newName, function(err){
                if(err){
                    result = {status:500};
                    resolve(result);
                } else{
                    resultName = newName.split('\\')[1]+'/'+newName.split('\\')[2];
                    result = {status:200,msg: HOST + resultName};
                    resolve(result);
                }
            });

        });
        
        promise.then((value) => {
            res.send(value);
            return;
        });
    }
}

module.exports=exports=uploadDef;



