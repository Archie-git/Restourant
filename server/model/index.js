let mysql=require('mysql');
let md5=require('md5');
let dbConfig=require('../config/dbConfig');

let pool=mysql.createPool(dbConfig.mysql);

exports.querySQL = (sql) => {
    return new Promise((resolve,reject) => {
        pool.query(sql,(err,ret) => {
            if(err){
                reject(err)
            }else{
                resolve(ret)
            }
        })
    })
};