let mysql=require('mysql');
let md5=require('md5');
let dbConfig=require('../config/dbConfig');

let pool=mysql.createPool(dbConfig.mysql);

//查询数据库
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

//获取更新语句（传入对象的第一个属性为对应数据库表中的主键名）;
exports.getUpdateSQL = (tableName, data) =>{
    let keys = Object.keys(data);
    let values = Object.values(data);
    let params = [];
    let primaryKey = null;
    let primaryValue = null;
    if(typeof(values[0])==="object"){
        for(let i = 0; i<keys.length; i++){
            if(i === 0){
                primaryKey = keys[0];
                primaryValue = values[0].join(',');//一次更新多条记录，默认主键类型为number
            }else{
                let value = typeof(values[i]) === "number" ? values[i] : "\""+values[i]+"\"";
                params.push(keys[i] + "=" + value)
            }
        }
        return "UPDATE "+tableName+" SET "+params.join(",")+" WHERE "+primaryKey+" IN ("+primaryValue+")";
    }else{
        for(let i = 0; i < keys.length; i++){
            if(i === 0){
                primaryKey = keys[0];
                primaryValue = typeof(values[0])==="number" ? values[0] : "\""+values[0]+"\"";
            }else{
                let value = typeof(values[i]) === "number" ? values[i] : "\""+values[i]+"\"";
                params.push(keys[i] + "=" + value)
            }
        }
        return "UPDATE "+tableName+" SET "+params.join(",")+" WHERE "+primaryKey+"="+primaryValue;
    }
};

//获取新增语句;
exports.getAddSQL = (tableName, data) => {
    let keys = Object.keys(data);
    let values = Object.values(data);
    values = values.map(item => {
        return typeof(item)==="number" ? item : "\'"+item+"\'"
    });
    return "INSERT INTO "+tableName+"("+keys.join(',')+")"+" VALUES("+values.join(",")+")";
};

//获取查询语句;
exports.getSearchSQL = (tableName, data) => {
    let keys = Object.keys(data);
    let values = Object.values(data);
    let params = [];
    for(let i=0; i<keys.length; i++){
        let value = typeof(values[i]) === "number" ? values[i] : "\""+values[i]+"\"";
        params.push(keys[i]+"="+value)
    }
    return "SELECT * FROM "+tableName+" WHERE "+params.join(' and ');
};

