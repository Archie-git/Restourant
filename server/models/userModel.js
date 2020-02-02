let mysql=require('mysql');
let md5=require('md5');
let dbConfig=require('../config/dbConfig');

let pool=mysql.createPool(dbConfig.mysql);

exports.querySQL=function(sql){
    return new Promise(function(resolve,reject){
        pool.query(sql,function(err,ret){
            if(err){
                reject(err)
            }else{
                resolve(ret)
            }
        })
    })
};